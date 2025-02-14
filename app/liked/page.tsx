import Header from "@/Components/Header";
import getLikedSongs from "@/actions/getLikedSongs";
import Image from "next/image";
import LikedContent from "./Components/LikedContent";


export const revalidate = 0
const Liked =  async () => {

    const songs = await getLikedSongs();
    console.log( "songs",songs);
    return (
       <div className={'bg-neutral-900' +
           'rounded-lg w-full h-full overflow-hidden overflow-y-auto'}>
            <Header>
                <div className={'mt-20'}>
                    <div className={'flex flex-col items-center md:flex-row gap-x-5 px-5 '}>
                        <div className={'relative h-32 w-32 lg:h-44 lg:w-44'}>
                            <Image
                                fill
                                className={'object-cover rounded-md'}
                                src={'/images/liked.jpeg'}
                                alt={'Playlist'}
                            />
                        </div>
                        <div className={'flex flex-col gap-y-2 mt-4 md:mt-0'}>
                            <p className={'hidden md:block font semibold text-sm text-white'}>
                                Playlist
                            </p>
                            <h1 className={'text-white text-4xl sm:text-5xl lg:text-7xl font-bold'}>
                                Liked Songs
                            </h1>
                        </div>

                    </div>

                </div>
            </Header>
           <LikedContent song ={songs}/>
       </div>
    )
}

export default Liked