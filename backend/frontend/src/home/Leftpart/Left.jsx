import React from 'react'
import Search from './Search';
import Users from './Users';
import Logout from './Logout';

function Left() {
    return (
        <div className='w-full bg-black  text-white'>
            <Search />
            <div className='flex flex-col overflow-y-auto ' style={{ minHeight: "calc(84vh - 10vh)" }}>
                <Users />
            </div>
            <Logout />
        </div>
    )
}

export default Left;