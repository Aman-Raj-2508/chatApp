import React from 'react'
import { useSocketContext } from './SocketContext'
import useConversation from '../zustand/useConversation';
import { useEffect } from 'react';
import sound from '../assets/massage_tone.mp3';

function useGetSocketMessage() {


    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();



    useEffect(() => {
        if (socket) {
            socket.on('newMessage', (newMessage) => {

                const notification = new Audio(sound);
                notification.play();

                setMessages([...messages, newMessage]);
            });
            return () => {
                socket.off('newMessage'); // Clean up the event listener on unmount
            };
        }
    }, [socket, messages, setMessages]);
}

export default useGetSocketMessage;