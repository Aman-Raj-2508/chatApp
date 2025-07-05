import React from 'react';

function Message({ message }) {

    const authUser = JSON.parse(localStorage.getItem("ChatApp"));

    const itsMe = message.senderId === authUser.user._id; // Check if the message is sent by the current logged in user

    const chatName = itsMe ? "chat-end" : "chat-start";
    const chatColor = itsMe ? "bg-blue-500" : "";

    const createdAt = new Date(message.createdAt);
    const formattedTime = createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });


    return (
        <div>

            {/* Chat Bubble */}
            <div className='p-4'>

                <div className={`chat ${chatName}`}>
                    <div className={`chat-bubble text-white ${chatColor}`}>
                        {/* Sender */}
                        <p>{message.message}</p>
                    </div>
                    <div className='chat-footer text-xs text-gray-400'>
                        {formattedTime}
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Message