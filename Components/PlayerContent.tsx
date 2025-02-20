"use client"

import {Song} from "@/types";
// import {useRouter} from "next/navigation";
import {twMerge} from "tailwind-merge";
import MediaItem from "@/Components/MediaItem";
import LikeButton from "@/Components/LikeButton";
import {BsPlayFill, BsPauseFill} from "react-icons/bs"
import {AiFillStepBackward, AiFillStepForward} from "react-icons/ai";
import {HiSpeakerXMark, HiSpeakerWave} from "react-icons/hi2";
import MySlider from "@/Components/MySlider";
import usePlayer from "@/hooks/usePlayer";
import {useEffect, useState} from "react";
import useSound from "use-sound";
import ProgressBar from "@/Components/ProgressBar";
interface PlayerContentProps {
    song: Song;
    songUrl: string;
}
const PlayerContent: React.FC<PlayerContentProps> = ({
    song,
    songUrl,
}) => {



    const Player =usePlayer();
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const VolumeIcon =volume=== 0 ? HiSpeakerXMark:HiSpeakerWave ;

    const Icon = isPlaying ? BsPauseFill : BsPlayFill
    const onPlayNext = () => {
        if (Player.ids.length === 0) {
            return;
        }
        const currentIndex = Player.ids.findIndex((id) => id === Player.activeId);
        const nextSong = Player.ids[currentIndex + 1];
        if (!nextSong) {
            return Player.setId(Player.ids[0]);
        }
        Player.setId(nextSong);
    }
    const onPlayPrevious = () => {
        if (Player.ids.length === 0) {
            return;
        }
        const currentIndex = Player.ids.findIndex((id) => id === Player.activeId);
        const previousSong = Player.ids[currentIndex - 1];
        if (!previousSong) {
            return Player.setId(Player.ids[-1]);
        }
        Player.setId(previousSong);
    }
    const [play,{pause,sound}] = useSound(songUrl, {
        volume: volume,
        onplay: () => {
            setIsPlaying(true);
        },
        onend: () => {
            setIsPlaying(false);
            onPlayNext();
        },
        onpause: () => setIsPlaying(false),
        format: ['mp3', 'aac', 'ogg', 'wav', 'flac'],
    });
    useEffect(() => {
        sound?.play();
        return () => {
            sound?.unload();
        }
    }, [ sound]);
    const handlePlay = () => {
        if (!isPlaying) {
            play();
        } else {
            pause();
        }
    }
    const toggleMute = () => {
        if (volume === 0) {
            setVolume(1);
        } else {
            setVolume(0);
        }
    }
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    useEffect(() => {
        if (sound) {
            const interval = setInterval(() => {
                setCurrentTime(sound.seek() || 0);
                setDuration(sound.duration() || 0);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [sound]);
    const handleSeek = (time: number) => {
        if (sound) {
            sound.seek(time);
            setCurrentTime(time);
        }
    };

    return (
        <div className={twMerge(`fixed bottom-0 z-10 flex flex-col items-center justify-center w-full bg-black h-16`)}>
            <div className={` flex items-center gap-x-4 w-full h-1/2`}>
                <ProgressBar duration={duration} currentTime={currentTime} onSeek={handleSeek}/>

            </div>

            <div className={`grid grid-cols-2 w-full md:grid-cols-3  h-full`}>
                <div className={'flex items-center w-full justify-start'}>
                    <div className={`flex items-center gap-x-4`}>
                        <MediaItem data={song}/>
                        <LikeButton songID={song.id}/>
                    </div>
                </div>
                <div className={`flex md:hidden col-auto w-full justify-end items-center `}>
                    <div onClick={ handlePlay}
                         className={`h-10 w-10 flex items-center justify-center bg-white rounded-full p-1 cursor-pointer`}>
                        <Icon size={30} className={'text-black'}></Icon>

                    </div>
                </div>
                <div className={`hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6`}>
                    <AiFillStepBackward size={30}
                                        className={'text-neutral-400 cursor-pointer hover:text-white transition'}
                                        onClick={onPlayPrevious}/>
                    <div>
                        <div onClick={handlePlay}
                             className={`h-10 w-10 flex items-center justify-center bg-white rounded-full p-1 cursor-pointer`}>
                            <Icon size={30} className={'text-black'}></Icon>
                        </div>
                    </div>
                    <AiFillStepForward size={30}
                                       className={'text-neutral-400 cursor-pointer hover:text-white transition'}
                                       onClick={onPlayNext}/>

                </div>
                <div className={`hidden md:flex w-full justify-end pr-2`}>
                    <div onClick={() => {
                    }}
                         className={`flex items-center gap-x-2 w-[120px]`}>
                        <VolumeIcon onClick={toggleMute} size={30} className={'cursor-pointer'}/>
                        <MySlider value={volume} onChange={(value) => setVolume(value)}/>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default PlayerContent