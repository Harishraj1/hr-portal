import React, { useState } from "react";
import { Loader, baseURL } from '../components/utils';
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import women_img from '../assert/women_img.png'
import EnterMailSection from "../components/ResetPageComponents/EnterMailSection";
import EnterOtpSection from "../components/ResetPageComponents/EnterOTPsection";
import EnterResetPassword from "../components/ResetPageComponents/EnterResetPassword";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState("");
    const [step, setStep] = useState(0)
    const navigate = useNavigate();

    const validateForm = () => {
        if (email.length < 6) {
            return 'Email must be at least 6 characters long.';
        }
        if (password.length < 8) {
            return 'Password must be at least 8 characters long.';
        }
        return '';
    };

    const handleRequestError = (error) => {
        setAlert(error.response?.data?.message || 'An error occurred');
        setIsLoading(false);
    };

    const login = () => {
        setAlert("");
        axios.post(`${baseURL}/accounts/login/`, {
            email: email,
            password: password,
        })
        .then(res => {
            localStorage.setItem('access_token', res.data.access);
            localStorage.setItem('refresh_token', res.data.refresh);
            setIsLoading(false);
            window.location.href = '/';
        })
        .catch(handleRequestError);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const validationError = validateForm();

        if (validationError) {
            setAlert(validationError);
            setIsLoading(false);
            return;
        }

        login();
    };

    const handleSignUp = () => {
        navigate('/register');
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <>
        {loading && <Loader />}
        <section className="login-section w-[70%] border-2 h-[80%] mx-auto my-10 border rounded-2xl" id="login">
            <div className="container-fluid h-100">
                <div className="row h-100 d-flex justify-content-center align-items-center relative">
                    <div className="col-lg-5 bg-[#FDC500] border rounded-2xl h-[100%] d-flex flex-column justify-content-center align-items-center text-center p-4">
                        <p className="mb-3 display-5 fw-bold">Hello, Friend!</p>
                        <p className="text-lg leading-6 p-2">Enter your details and start your <br />journey with us</p>
                        <button className="btn-navy" onClick={handleSignUp}>SIGN UP</button>
                    </div>
                    {/* right container */}
                    <div className="col-lg-7 d-flex flex-column align-items-center justify-content-center p-4">
                        {
                            step === 0 ? 
                            <>
                                <p className="mb-3 display-3 fw-bold">Log in</p>
                                {/* <div className="col-lg-4 d-flex justify-content-between flex-wrap mb-3">
                                    <a href="" className="h3"><i className="border-2 border-black rounded-full p-2 fa-brands fa-github text-black"></i></a>
                                    <a href="" className="h3"><i className="border-2 border-black rounded-full p-2  fa-brands fa-linkedin text-black"></i></a>
                                    <a href="" className="h3"><i className="border-2 border-black rounded-full p-2  fa-brands fa-google text-black"></i></a>
                                </div> */}
                                <p className="text-[#00296B] font-normal mb-5">or use your email for registration</p>
                                {alert && <div className="alert alert-danger mb-3">{alert}</div>}
                                <form className="col-lg-8 text-center d-flex flex-column justify-content-center z-10" onSubmit={handleSubmit}>
                                    <div className="bg-[#FFFAE5] mb-3 border rounded-xl">
                                        <a href="" className="text-2xl text-black pr-2"><i className="fa-solid fa-envelope"></i></a>
                                        <input 
                                            type="email" 
                                            className="bg-transparent w-[85%]  py-2.5 text-xl outline-none"
                                            id="exampleInputEmail1" 
                                            aria-describedby="emailHelp" 
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="bg-[#FFFAE5] mb-3 border rounded-xl">
                                        <a href="" className="text-2xl text-black pr-2"><i class="fa-solid fa-lock"></i></a>
                                        <input 
                                            type="password" 
                                            className="bg-transparent w-[85%]  py-2.5  text-xl outline-none" 
                                            id="exampleInputPassword1" 
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <a onClick={() => setStep(1)} className="fw-light mb-3 text-decoration-none text-navy cursor-pointer">Forgot your password?</a>
                                    </div>
                                    <button type="submit" className="btn-yellow" disabled={loading}>
                                        {loading ? 'Signing in...' : 'SIGN IN'}
                                    </button>
                                </form>
                            </> :
                            step === 1 ? 
                                <EnterMailSection email={email} pageIndexSetter={setStep} emailSetter={setEmail} loadingSetter={setIsLoading}/>
                            :
                            step === 2 ? 
                                <EnterOtpSection email={email} pageIndexSetter={setStep} loadingSetter={setIsLoading}/>
                            :
                            step === 3 ?
                                <EnterResetPassword email={email} loadingSetter={setIsLoading} pageIndexSetter={setStep}/>
                            :
                                <></>
                        }
                        <img src={women_img} alt="women_img" className="absolute w-[25%] bottom-0 right-0" />
                    </div>
                </div>
            </div>
        </section>
        </>
    );
}

export default Login;
