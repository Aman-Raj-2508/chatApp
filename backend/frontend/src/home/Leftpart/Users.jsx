import React from 'react'
import User from './User'
import '../../index.css' // Ensure you have the correct path to your CSS file
import useGetAllUsers from '../../context/useGetAllUsers' // Custom hook to get all users;

function Users() {

    const [allUsers, loading] = useGetAllUsers(); // Custom hook to get all users
    // console.log("All Users:", allUsers); // Log all users to the console


    return (
        <div>

            <h1 className='px-8 py-2 text-white font-semibold bg-slate-800 rounded-md'>
                Messages
            </h1>

            {/* User component */}

            <div className=' py-2 overflow-y-auto  custom-scroll' style={{ maxHeight: "calc(82vh - 10vh)" }}>

                {allUsers.map((user) => (
                    <User key={user._id} user={user} /> // Pass each user object to the User component
                ))}
            </div>

        </div>
    )
}

export default Users