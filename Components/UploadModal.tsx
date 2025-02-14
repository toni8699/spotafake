"use client"

import {useRouter} from "next/navigation";
import Modal from "./Modal";
import useUploadModal from "@/hooks/useUploadModal";
import {useCallback, useState} from "react";
import {useUser} from "@/hooks/useUser";
import {toast} from "react-hot-toast";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import { SubmitHandler, useForm} from "react-hook-form";
import {FieldValues} from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import uniqid from "uniqid";





const UploadModal = () => {
    const [IsLoading, setIsLoading] = useState(false);
    const uploadModal = useUploadModal();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const {user} = useUser();
    const { register, handleSubmit,reset} = useForm<FieldValues>({
        defaultValues: {
            author: '',
            title: '',
            song: null,
            image: null
        }
    })
    const onChange = useCallback((open: boolean) => {
        if (!open) {
            uploadModal.onClose();
        }
    }, [uploadModal]);

    const handleUpload: SubmitHandler<FieldValues> = async (values) => {
        try {

            setIsLoading(true);
            const imageFile = values.image?.[0]
            const songFile = values.song?.[0]

            if (!imageFile || !songFile || !user) {
                toast.error('missing fields');
                return;
            }
            const uniqueID  = uniqid();
            //Upload
            const {
                data: songData,
                error: songError,
            } =await supabaseClient
                .storage.from('songs').upload(`song-${values.title}-${uniqueID}`, songFile, {
                    cacheControl: '3600',
                    upsert: false,
                });

            if (songError) {
                setIsLoading(false);
                console.log(songError);
                return toast.error(songError.message);
            }
            const {
                data: imageData,
                error: imageError,
            } =await supabaseClient
                .storage.from('images').upload(`img-${values.title}-${uniqueID}`, imageFile, {
                    cacheControl: '3600',
                    upsert: false,
                });
            if (imageError) {
                setIsLoading(false);
                console.log(imageError);
                return toast.error(imageError.message);
            }
            const {
                error: error,} =await supabaseClient
                .from('Songs')
                .insert({
                    title: values.title,
                    author: values.author,
                    user_id: user.id,
                    song_path: songData.path,
                    image_path: imageData.path
                });
            if (error) {
                setIsLoading(false);
                console.log(error);
                return toast.error('Something went wrong here');
            }
            router.refresh();
            setIsLoading(false);
            toast.success('Song added');
            uploadModal.onClose();
            reset();

        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <Modal
            title="Add a piece of music"
            description="Upload an mp3 file."
            isOpen={uploadModal.isOpen}
            onChange={onChange} >
            <form className={'flex flex-col gap-y-4'} onSubmit={handleSubmit(handleUpload)}>
                <Input id='title' disabled={IsLoading} {...register('title', {required: true})}
                       placeholder='Enter title'/>
                <Input id='author' disabled={IsLoading} {...register('author', {required: true})}
                       placeholder='Enter Author'/>
                <div>
                    <div className={' pb-1 font-medium'}>
                        Select a file
                    </div>
                    <Input type='file' id='song' disabled={IsLoading} {...register('song', {required: true})}
                           accept='.mp3,.wav,.flac'/>
                    <div className={' pb-1 font-medium'}>
                         Choose a cover
                    </div>
                    <Input type='file' id='image' disabled={IsLoading} {...register('image', {required: true})}
                          accept='image/*' />
                </div>
                <Button disabled={IsLoading} type='submit'>
                    Upload
                </Button>

            </form>
        </Modal>
    );
}
export default UploadModal
