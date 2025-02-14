import React from 'react';
import { Progress } from "@radix-ui/react-progress";

interface ProgressBarProps {
    currentTime: number;
    duration: number;
    onSeek: (time: number) => void;
}

const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ currentTime, duration, onSeek }) => {
    const progress = (currentTime / duration) * 100;

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const { left, width } = e.currentTarget.getBoundingClientRect();
        const clickPosition = e.clientX - left;
        const newTime = (clickPosition / width) * duration;
        onSeek(newTime);
    };

    return (
        <div className="w-full cursor-pointer flex-row flex justify-between px-4 items-center">
            <span className="text-white mr-2">{formatTime(currentTime)}</span>
            <div className="w-full bg-gray-300 h-1 rounded" onClick={handleClick}>
                <div
                    className="bg-blue-500 h-1 rounded"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <span className="text-white p-4">{formatTime(duration)}</span>
        </div>
    );
};

export default ProgressBar;