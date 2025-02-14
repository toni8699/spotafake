
import useAuthModal from "@/hooks/useAuthModal";
import usePlayer from "./usePlayer";
import {useUser} from "./useUser";


import {Song } from "@/types";

const useOnPlay=(song:Song[]) => {
    const player = usePlayer();
    const authModal = useAuthModal();
    const {user} = useUser();
    const onPlay = (id: string) => {
        if (!user) {
            return authModal.onOpen();
        }
        player.setId(id);
        player.setIds (song.map((song) => song.id));
    }
    return onPlay
}

    export default useOnPlay

