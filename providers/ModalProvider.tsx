"use client"
import {useEffect} from "react";
import {useState} from "react";
import AuthModal from "@/Components/AuthModal";


import Modal from "@/Components/Modal";



const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)
    useEffect (() => {
        setIsMounted(true)
    }, []);
    if (!isMounted) {
        return null
    }
    return (
        <AuthModal/>
    )
}
export default ModalProvider