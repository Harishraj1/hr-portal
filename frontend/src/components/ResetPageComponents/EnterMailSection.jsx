import React, { useEffect, useState } from "react";
import axios from 'axios';

import { baseURL } from "../utils";

function EnterMailSection({email, emailSetter, pageIndexSetter, loadingSetter}) {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("")
        setSuccess("")

        if (email.length < 6) {
            setError('Email must be at least 6 characters long.');
            return;
        }

        loadingSetter(true)
        
        axios.post(`${baseURL}/accounts/password-reset-code/`, {
            email: email
        })
        .then(res => {
            loadingSetter(false)
            setSuccess(res.data.message);
            console.log("from here")
            const timeout = setTimeout(() => {
                pageIndexSetter(2); // Navigate to the OTP section
                clearTimeout(timeout); // Clear the timeout
            }, 2000);
        })
        .catch(error => {
            loadingSetter(false)
            setError(error.response?.data?.message || 'An error occurred')
        })
    }

    return (
        <div className="z-1 w-full h-full flex flex-col align-center justify-center">
            <i className="fa-solid fa-lock p-2 bg-gray-400 text-yellow-300 rounded-3 w-fit align-self-center" />

            <h3 className="mt-2"> Reset Password </h3>
            {
                error != "" 
                ? 
                    <div class="alert alert-danger mt-1" role="alert">
                        {error}
                    </div>
                :
                    <></>
            }
            {
                success != ""
                ?  
                    <div class="alert alert-success mt-1" role="alert">
                        {success}
                    </div>
                :
                    <></>
            }
            <p className="w-3/4 align-self-center mt-3 text-sm md:text-lg"> Forgot your password? Please enter your email. We will send you a confirmation code to reset your password! </p>

            <form className="flex flex-col">
                <input type="email" placeholder="Email" value={email} onChange={(e) => emailSetter(e.target.value)} className="w-2/3 align-self-center border-1 border-black p-2 rounded-2 mt-4 focus:outline-black text-center text-sm md:text-lg" required/>
                <button type="submit" onClick={handleSubmit} className="btn btn-outline-primary mt-4 w-fit px-5 align-self-center"> Get code </button>
            </form>
        </div>
    )
}

export default EnterMailSection;