import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import useSendMessage from '../../context/useSendMessage.js';


function Typesend() {

    const [message, setMessage] = useState("");
    const { loading, sendMessage } = useSendMessage();


    const handleSubmit = async (e) => {
        e.preventDefault(); //taki browser refresh na ho
        if (message.trim() === "") return; // Prevent sending empty messages
        await sendMessage(message); // Call the sendMessage function from the context
        setMessage(""); // Clear the input field after sending      
    }

    return (
        <form onSubmit={handleSubmit}>

            <div className='flex space-x-1 h-[8vh] bg-gray-800 justify-center'>

                <div className='w-[70%] mx-1'>

                    {/* Type and Send Message */}
                    <input type="text" placeholder="Type here"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="border border-gray-700 outline-none w-full px-4 py-3 mt-1 rounded-xl bg-black" />

                </div>

                <button>

                    <IoSend className='text-3xl' />


                </button>

            </div>

        </form>
    )
}

export default Typesend