"use client";
import {useEffect} from "react";

import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {useRouter} from "next/navigation";
import {useSessionContext} from "@supabase/auth-helpers-react";
import {Auth} from "@supabase/auth-ui-react";
import {ThemeSupa} from "@supabase/auth-ui-shared";

import useAuthModal from "@/hooks/useAuthModal";
import Modal from "@/Components/Modal";

const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const {session} =useSessionContext()
    const {onClose,isOpen} = useAuthModal();
    const onChange = (open: boolean) => {
        if(!open){
            onClose();
        }
    }
    useEffect(() => {
        if (session){
            router.refresh();
            onClose();
        }
    }, [ session, router, onClose]);
    return (
       <Modal
       title ='Welcome Back'
       description='Login to your account'
       isOpen = {isOpen} onChange={onChange}>
           <Auth theme='dark'
           supabaseClient={supabaseClient}
                 providers={[
                   'google',
                   'github',
                   'facebook',]}
                 magicLink
           appearance={{
               theme:ThemeSupa,
               variables: {
                   default:{
                       colors:{
                           brand:'#404040',
                           brandAccent:'#2196F3',
                       }
                   }
               }
           }}
           />
       </Modal>
    )
}
export default AuthModal