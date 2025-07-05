import React, { useState } from 'react';
import { RiLogoutCircleLine, RiWindowsFill } from "react-icons/ri";
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';


function Logout() {

    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        // Make a request to the backend to log out the user
        try {
            await axios.post('/api/v1/logout', {}, { withCredentials: true });

            localStorage.removeItem('ChatApp'); // Remove user data from local storage

            Cookies.remove('jwt'); // Removing Cookies from frontend.
            setLoading(false);
            toast.success("Logout successful.");
            // Optionally, you can redirect the user to the login page or home page
            window.location.href = '/login'; // Redirect to login page
        } catch (error) {
            console.error("Logout error:", error);
        }

    }


    return (
        <div
            className='bg-gray-800 px-4 py-2 flex items-center gap-4 rounded-lg shadow-md hover:bg-gray-700 transition duration-300 ease-in-out cursor-pointer'
            onClick={handleLogout}
        >
            <RiLogoutCircleLine className='text-2xl text-red-400 hover:text-red-300 transition duration-300 ease-in-out ' />
            <p className='text-lg font-semibold text-gray-200 hover:text-white transition duration-300 ease-in-out'>
                Logout
            </p>
        </div>

    );
}

export default Logout;
