"use client";
import {Database} from "@/types_db";
import {useState} from "react";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {SessionContextProvider} from "@supabase/auth-helpers-react";

interface SupabaseProviderProps {
    children: React.ReactNode;
    supabase: Database;
}
const SupabaseProvider: React.FC<SupabaseProviderProps> = ({
    children,
    supabase,
}) => {
    const [superbaseClient] = useState(()=>
        createClientComponentClient<Database>()
    )

    return (
        <SessionContextProvider supabaseClient={superbaseClient}>
            {children}
        </SessionContextProvider>
    )
};
export default SupabaseProvider;