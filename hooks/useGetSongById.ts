import {useMemo, useState} from "react";
import {Song} from "@/types";

import {useEffect} from "react";
import {useSessionContext, useSupabaseClient} from "@supabase/auth-helpers-react";

const useGetSongById = (id?: string) => {
    const [isLoading, setIsLoading] = useState(false)
    const [song, setSong] = useState<Song | undefined>(undefined);
    const {supabaseClient} = useSessionContext();
    useEffect(() => {
        if (!id) {
            return;
        }
        setIsLoading(true);
        const fetchData = async () => {
            const {data, error} = await supabaseClient
                .from('Songs')
                .select('*')
                .eq('id', id)
                .single();
            if (!error && data) {
                setSong(data as Song);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [id, supabaseClient]);
    return useMemo(()=>({
        isLoading,
        song
    }),[song,isLoading])
}

export default useGetSongById
