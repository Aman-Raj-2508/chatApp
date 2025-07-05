import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';

function useGetAllUsers() {
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            setLoading(true);
            try {
                const token = Cookies.get('jwt'); // Get JWT token from cookies
                const response = await axios.get('api/v1/allusers', {
                    withCredentials: true,  // Include credentials for CORS
                    headers: { // syntax hai
                        Authorization: `Bearer ${token}`
                    }
                });

                setAllUsers(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error in useGetAllUsers:', error);
            }
        };
        getUsers();
    }, []);

    return [allUsers, loading]; // hm allUsers aur loading ko return kar rahe hain kyun ki hme in dono ki zarurat hai aage ke liye.
}

export default useGetAllUsers