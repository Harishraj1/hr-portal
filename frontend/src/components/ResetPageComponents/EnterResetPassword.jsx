import React, { useState } from "react";
import axios from 'axios';

import { baseURL } from "../utils";

function EnterResetPassword({ email, loadingSetter, pageIndexSetter }) {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("")
        setSuccess("")

        if (password !== confirmPassword) {
            setError("Passwords do not match");
        }

        const hasUppercase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const minLength = password.length >= 8;

        if (!hasUppercase) {
            setError("Password must contain at least one uppercase letter");
            return;
        }
        if (!hasNumber) {
            setError("Password must contain at least one number");
            return;
        }
        if (!hasSpecialChar) {
            setError("Password must contain at least one special character");
            return;
        }
        if (!minLength) {
            setError("Password must be at least 8 characters long");
            return;
        }

        loadingSetter(true)

        axios.post(`${baseURL}/accounts/password-reset/`, {
            email: email,
            password: password
        })
        .then(res => {
            loadingSetter(false)
            setSuccess(res.data.message);
            const timeout = setTimeout(() => {
                pageIndexSetter(0); 
                clearTimeout(timeout); 
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
            <p className="w-3/4 align-self-center mt-3 text-sm md:text-lg"> Set a new password. Make sure the password is strong. </p>

            <form className="flex flex-col">
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-2/3 align-self-center border-1 border-black p-2 rounded-2 mt-4 focus:outline-black text-center text-sm md:text-lg" required />
                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-2/3 align-self-center border-1 border-black p-2 rounded-2 mt-4 focus:outline-black text-center text-sm md:text-lg" required />
                <button type="submit" onClick={handleSubmit} className="btn btn-outline-primary mt-4 w-fit px-5 align-self-center"> Reset Password </button>
            </form>
        </div>
    )
}

export default EnterResetPassword;