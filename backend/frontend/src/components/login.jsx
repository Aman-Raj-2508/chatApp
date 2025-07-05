import React from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/Authprovider.jsx"; // useAuth hook ko import kiya gaya hai jo context se user data ko access karega.
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'; // toast notification ke liye import kiya gaya hai

function Login() {
    const [authUser, setAuthUser] = useAuth();

    // form validation hook se form ko handle karne ke liye useForm hook ka use kiya gaya hai.
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    // onSubmit function jo form submit hone par call hoga.
    const onSubmit = async (data) => {
        const userInfo =
        {
            email: data.email,
            password: data.password,
        };
        // console.log("User Info:", userInfo);

        await axios.post("/api/v1/login", userInfo).then((response) => {
            console.log("Response:", response.data);
            if (response.data) {
                // alert("Login successfull.");
                toast.success("Login successful."); // toast notification ke through success message dikhaya ja raha hai

            }
            // Agar user create ho jaygea tb hum uske data ko local strorage me save karayenge taki aage use kr sake.
            localStorage.setItem("ChatApp", JSON.stringify(response.data));
            //usAuth hook se user data ko set karte hain
            setAuthUser(response.data);

        }).catch((error) => {
            if (error.response) {
                toast.error("Error: " + error.response.data.message);
            }
        });
    }

    return (
        <>
            <div className="flex h-screen items-center justify-center">
                {/* Form starts here */}
                <form onSubmit={handleSubmit(onSubmit)}
                    className="border border-white px-6 py-2 rounded-md space-y-3 w-96">

                    <h1 className='text-2xl text-center'>
                        Chat<span className='text-green-500 font-semibold'> App</span>
                    </h1>

                    <h2 className='text-xl font-bold '>
                        Login
                    </h2>
                    <br />

                    {/* Email */}
                    <label className="input validator">
                        <input
                            type="email"
                            placeholder="mail@site.com"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email format"
                                }
                            })}
                        />
                    </label>
                    {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

                    {/* Password */}
                    <label className="input validator">
                        <input
                            type="password"
                            placeholder="Password"
                            {...register("password", {
                                // required: "Password is required",
                                // pattern: {
                                //     value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                                //     message: "Must include uppercase, lowercase, number and be 8+ chars"
                                // }
                            })} />
                    </label>
                    {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}

                    {/* Text & Button */}
                    <div className='flex justify-between'>
                        <p>New User? <Link to="/signup" className='text-blue-500 underline cursor-pointer ml-1'>Signup</Link></p>
                        <input
                            className='text-white bg-green-500 px-2 py-1 rounded-lg cursor-pointer'
                            type="submit"
                            value="Login"
                        />
                    </div>

                </form>
            </div>
        </>
    );
}

export default Login;
