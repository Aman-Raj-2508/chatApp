import React, { useState } from 'react';
import { FiSearch } from "react-icons/fi";
import useGetAllUsers from '../../context/useGetAllUsers';
import useConversation from '../../zustand/useConversation';
import { toast } from 'react-toastify';

function Search() {

    const [search, setSearch] = useState('');

    const [allUsers] = useGetAllUsers();

    const { setselectedConversation } = useConversation();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!search) {
            return;
        }
        const user = allUsers.find((user) => user.fullname.toLowerCase() === search.toLowerCase());
        if (user) {
            setselectedConversation(user);
            setSearch('');
        } else {
            toast.error('User not found');
            setSearch('');
        }

    };

    return (
        <div className='h-[10vh]'>
            <div className="px-6 py-4">
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center gap-3">
                        {/* Input container */}
                        <label className="flex items-center w-full rounded-xl bg-slate-800 px-4 py-1 border border-slate-600 focus-within:ring-2 focus-within:ring-blue-500 shadow-md transition-all duration-300">
                            <input
                                type="text"
                                placeholder="Search"
                                className="ml-3 bg-transparent text-white placeholder-gray-400 w-full outline-none"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </label>
                        <button className='flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-full duration-300' >
                            <FiSearch className='text-4xl p-2 hover:bg-gray-600 rounded-full duration-300' />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Search;





