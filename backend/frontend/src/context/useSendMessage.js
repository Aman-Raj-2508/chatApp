import React, { use, useEffect, useState } from 'react';
import useConversation from '../zustand/useConversation.js';
import axios from 'axios';

function useSendMessage() {

  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const sendMessage = async (message) => {

    setLoading(true);



    try {
      const res = await axios.post(`api/v1/send/${selectedConversation._id}`, { message }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!res.status === 200) {
        throw new Error('Failed to fetch messages');
      }

      // const data = await res.data;
      setMessages([...messages, res.data.newMessage]);
    }
    catch (error) {
      console.error('Error in send  messages:', error);
    }

    setLoading(false);
  }



  return (
    { loading, sendMessage }
  )
}

export default useSendMessage