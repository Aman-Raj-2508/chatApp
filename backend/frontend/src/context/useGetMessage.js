import React, { use, useEffect, useState } from 'react';
import useConversation from '../zustand/useConversation.js';
import axios from 'axios';

function useGetMessage() {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {

        const getMessages = async () => {

            setLoading(true);

            if (selectedConversation && selectedConversation._id) {

                try {
                    const res = await axios.get(`api/v1/get/${selectedConversation._id}`, { //selected coversation ka id hi receiver hai kyun ki jisko select kr rhe hn usi ko toh message krna hai
                        // headers: {
                        //     'Authorization': `Bearer ${localStorage.getItem('token')}`
                        // }
                    });

                    if (!res.status === 200) {
                        throw new Error('Failed to fetch messages');
                    }

                    // const data = await res.data;
                    setMessages(res.data);
                }
                catch (error) {
                    console.error('Error fetching messages:', error);
                }

                setLoading(false);

            }
        }
        // Call the function to get messages
        getMessages();
    }, [selectedConversation, setMessages]);






    return { loading, messages };
}

export default useGetMessage