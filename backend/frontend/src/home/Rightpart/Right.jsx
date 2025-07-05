import React, { use, useEffect } from 'react'
import ChatUser from './ChatUser';
import Messages from './Messages';
import Typesend from './Typesend';
import useConversation from '../../zustand/useConversation.js';
import { useAuth } from '../../context/Authprovider.jsx';
import { CiMenuFries } from 'react-icons/ci';

function Right() {

    const { selectedConversation, setselectedConversation } = useConversation();

    useEffect(() => {
        setselectedConversation(null); // ✅ Run on mount
    }, [setselectedConversation]);


    return (

        <div className=' bg-slate-900 w-full text-gray-300 '>
            <div>

                {!selectedConversation ? (<NoChatSeleted />) : (<>


                    <ChatUser />

                    {/* For scrolling messages */}
                    <div className='flex flex-col overflow-y-auto ' style={{ maxHeight: "calc(92vh - 8vh)" }}>
                        <Messages />
                    </div>

                    <Typesend />

                </>)}

            </div>

        </div>
    );
}

export default Right;


const NoChatSeleted = () => {
    const [authUser] = useAuth();
    console.log(authUser);
    return (
        <>
            <div className="relative">
                <label
                    htmlFor="my-drawer-2"
                    className="btn btn-ghost drawer-button lg:hidden absolute left-5"
                >
                    <CiMenuFries className="text-white text-xl" />
                </label>
                <div className="flex h-screen items-center justify-center">
                    <h1 className="text-center">
                        Welcome{" "}
                        <span className="font-semibold text-xl">
                            {authUser.user.fullname}
                        </span>
                        <br />
                        No chat selected, please start conversation by selecting anyone to
                        your contacts
                    </h1>
                </div>
            </div>
        </>
    );
};