import React from 'react';
import useConversation from '../../zustand/useConversation.js';
import { useSocketContext } from '../../context/SocketContext.jsx';


function User({ user }) {

    const { selectedConversation, setselectedConversation } = useConversation();

    const isSelected = selectedConversation?._id === user._id;

    const { socket, onlineUsers } = useSocketContext();

    const isOnline = onlineUsers.includes(user._id);



    return (
        <div className={`hover:bg-slate-600 duration-300
        ${isSelected ? 'bg-slate-700' : ''} rounded-md`} onClick={() => setselectedConversation(user)}>

            {/* Avatar Online and Offline */}
            <div className='flex space-x-4 px-8 py-3 hover:bg-slate-700 transition-all duration-300 ease-in-out cursor-pointer items-center'>

                {/* Avatar online */}
                <div className={`avatar ${isOnline ? "avatar-online" : ""}`}>
                    <div className="w-12 rounded-full">
                        <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
                    </div>
                </div>

                {/* User details */}
                <div className='flex flex-col text-white'>
                    <h1 className='text-xs text-gray-300 font-bold'>{user.fullname}</h1>
                    <span className='text-xs text-gray-400'>{user.email}</span>
                </div>

            </div>

        </div>
    )
}

export default User;