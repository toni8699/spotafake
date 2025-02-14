import { Song } from "@/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import {  cookies } from "next/headers"

const getLikedSongs = async () :Promise<Song[]> =>{
    const supabase = createServerComponentClient({
        cookies:cookies
    });
    const {
        data:{
            session
        },
        } = await supabase.auth.getSession();

    const {data,error} = await supabase.from('Liked Songs').select('*,Songs(*)')
        .eq('user_id',session?.user.id)
        .order('created_at',{ascending:false});
    if (error) {
        console.log('we ran into an erro ', error);
        return []
    }
    if (!data) {
        return []
    }

    return data.map(({Songs}) => Songs as Song)
}
export default getLikedSongs