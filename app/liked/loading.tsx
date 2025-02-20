"use client"


import Box from "@/Components/Box";
import {BounceLoader} from "react-spinners";

const Loading = () => {
    return (
        <Box className={`h-full flex items-center justify-center`}>
            <BounceLoader color ={'#2196F3'} size = {40}/>
            <div className={`text-neutral-400`}>
                Loading...
            </div>
        </Box>
    );
};
export default Loading