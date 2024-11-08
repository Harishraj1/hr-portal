import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader, baseURL } from '../components/utils';
import axios from "axios";
import happy_plp_img from '../assert/happy_plp_img.png'

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [verifyLoading, setVerifyLoading] = useState(false);
    const [alert, setAlert] = useState("");
    const [showOtpField, setShowOtpField] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [timer, setTimer] = useState(30);
    const [showRegenerateOtp, setShowRegenerateOtp] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);

    // Form states
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState("");

    // Input focus states
    const [emailFocused, setEmailFocused] = useState(false);
    const [phoneFocused, setPhoneFocused] = useState(false);

    // Validation states
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPhoneValid, setIsPhoneValid] = useState(false);

    useEffect(() => {
        let interval;
        if (showOtpField && timer > 0) {
            interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setShowRegenerateOtp(true);
        }
        return () => clearInterval(interval);
    }, [showOtpField, timer]);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@(gmail\.com|snsgroups\.com|snsct\.org)$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phone);
    };

    const checkPasswordStrength = (password) => {
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
        const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

        if (strongRegex.test(password)) {
            return { strength: "Strong", color: "text-green-500" };
        } else if (mediumRegex.test(password)) {
            return { strength: "Moderate", color: "text-yellow-500" };
        } else if (password.length > 0) {
            return { strength: "Weak", color: "text-red-500" };
        }
        return { strength: "", color: "" };
    };

    const handleRequestOtp = async () => {
        setVerifyLoading(true);
        setAlert("");

        try {
            const response = await axios.post(`${baseURL}/accounts/verify/`, {
                email,
                username,
                phone
            });
            setShowOtpField(true);
            setTimer(30);
            setShowRegenerateOtp(false);
        } catch (error) {
            setAlert(error.response?.data?.message || "Failed to send OTP");
        } finally {
            setVerifyLoading(false);
        };
    }
    const handleVerifyOtp = async () => {
        setVerifyLoading(true);
        try {
            const response = await axios.post(`${baseURL}/accounts/verify-otp/`, {
                email,
                otp
            });
            if (response.data.message === 'OTP verified successfully.') {
                setOtpVerified(true);
                console.log(response.data.message);
            } else {
                setOtpVerified(false);
                console.log(response.data.message);
            }
        } catch (error) {
            setOtpVerified(false);
            console.error("Error verifying OTP", error);
        } finally {
            setVerifyLoading(false);
        }
    };


    const handleRegister = async (e) => {
        e.preventDefault();
        if (!isEmailValid || !isPhoneValid || !otpVerified || password !== confirmPassword) {
            setAlert("Please fill all fields correctly and verify OTP");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${baseURL}/accounts/signup/`, {
                username,
                email,
                phone,
                password,
                otp
            });

            // Store tokens
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);

            // Redirect to dashboard
            navigate('/');
        } catch (error) {
            setAlert(error.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <>
            {loading && <Loader />}
            <section className="login-section w-[90%] border-2 h-[80%] mx-auto my-10 border rounded-2xl">
                <div className="container-fluid h-100">
                    <div className="row h-100 d-flex justify-content-center align-items-center relative">
                        <div className="col-lg-7 d-flex flex-column align-items-center justify-content-center py-12 h-[100%]">
                            <p className="mb-3 display-4 fw-bold">Hello, Friend!</p>
                            <p className="text-lg leading-6 p-2">Enter your details and start your <br />journey with us</p>
                            {/* <div className="col-lg-4 d-flex justify-content-between flex-wrap mb-3">
                            <a href="" className="h3"><i className="border-2 border-black rounded-full p-2 fa-brands fa-github text-black"></i></a>
                            <a href="" className="h3"><i className="border-2 border-black rounded-full p-2  fa-brands fa-linkedin text-black"></i></a>
                            <a href="" className="h3"><i className="border-2 border-black rounded-full p-2  fa-brands fa-google text-black"></i></a>
                        </div> */}
                            {alert && <div className="alert alert-danger mb-3">{alert}</div>}

                            <form className="col-lg-8 text-center d-flex flex-column justify-content-center z-10" onSubmit={handleRegister}>
                                <div className="bg-[#FFFAE5] mb-3 border rounded-xl">
                                    <a href="" className="text-2xl text-black pr-2"><i className="fa-solid fa-user"></i></a>
                                    <input
                                        type="text"
                                        className="bg-transparent w-[85%] py-2.5 text-xl outline-none"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="bg-[#FFFAE5] mb-3 border rounded-xl flex-grow">
                                        <a href="" className="text-2xl text-black pr-2"><i className="fa-solid fa-envelope"></i></a>
                                        <input
                                            type="email"
                                            className={`bg-transparent w-[85%] py-2.5 text-xl outline-none ${email && (isEmailValid ? 'border-green-500' : 'border-red-500')}`}
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                setIsEmailValid(validateEmail(e.target.value));
                                            }}
                                            onFocus={() => setEmailFocused(true)}
                                            onBlur={() => setEmailFocused(false)}
                                            required
                                        />
                                    </div>
                                    {isEmailValid && !showOtpField && (
                                        <button type="button" className="btn-yellow" onClick={handleRequestOtp} disabled={verifyLoading}>
                                            {verifyLoading ? (
                                                <i className="fas fa-spinner fa-spin"></i>
                                            ) : (
                                                "Request OTP"
                                            )}
                                        </button>
                                    )}
                                </div>

                                {emailFocused && email && (
                                    <div className={`text-sm mb-3 ${isEmailValid ? 'text-green-500' : 'text-red-500'}`}>
                                        {isEmailValid ? 'Valid email format' : 'Please enter a valid Gmail address (@gmail.com)'}
                                    </div>
                                )}

                                <div className="bg-[#FFFAE5] mb-3 border rounded-xl">
                                    <a href="" className="text-2xl text-black pr-2"><i className="fa-solid fa-phone"></i></a>
                                    <span className="text-gray-500">+91</span>
                                    <input
                                        type="tel"
                                        className={`bg-transparent w-[75%] py-2.5 text-xl outline-none ${phone && (isPhoneValid ? 'border-green-500' : 'border-red-500')}`}
                                        placeholder="Phone Number"
                                        value={phone}
                                        onChange={(e) => {
                                            setPhone(e.target.value);
                                            setIsPhoneValid(validatePhone(e.target.value));
                                        }}
                                        onFocus={() => setPhoneFocused(true)}
                                        onBlur={() => setPhoneFocused(false)}
                                        required
                                    />
                                </div>

                                {phoneFocused && phone && (
                                    <div className={`text-sm mb-3 ${isPhoneValid ? 'text-green-500' : 'text-red-500'}`}>
                                        {isPhoneValid ? 'Valid phone number' : 'Please enter 10 digits'}
                                    </div>
                                )}

                                {showOtpField && (
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2">
                                            <div className="bg-[#FFFAE5] mb-3 border rounded-xl flex-grow">
                                                <input
                                                    type="text"
                                                    className="bg-transparent w-[85%] py-2.5 text-xl outline-none"
                                                    placeholder="Enter OTP"
                                                    value={otp}
                                                    onChange={(e) => setOtp(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <button type="button" className="btn-yellow" onClick={handleVerifyOtp} disabled={verifyLoading}>
                                                {verifyLoading ? (
                                                    <i className="fas fa-spinner fa-spin"></i>
                                                ) : (
                                                    "Verify"
                                                )}
                                            </button>
                                        </div>
                                        {otpVerified !== null && (
                                            <div className={`text-sm ${otpVerified ? 'text-green-500' : 'text-red-500'}`}>
                                                {otpVerified ? '✓ OTP Verified' : '✗ Invalid OTP'}
                                            </div>
                                        )}
                                        <div className="text-sm text-gray-500">
                                            Time remaining: {timer}s
                                        </div>
                                        {showRegenerateOtp && (
                                            <button type="button" className="btn-yellow" onClick={handleRequestOtp} disabled={verifyLoading}>
                                                {verifyLoading ? (
                                                    <i className="fas fa-spinner fa-spin"></i>
                                                ) : (
                                                    "Regenerate OTP"
                                                )}
                                            </button>
                                        )}
                                    </div>
                                )}

                                <div className="bg-[#FFFAE5] mb-3 border rounded-xl relative">
                                    <a href="" className="text-2xl text-black pr-2"><i className="fa-solid fa-lock"></i></a>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="bg-transparent w-[75%] py-2.5 text-xl outline-none"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <i
                                        className={`fa-solid ${showPassword ? 'fa-eye' : 'fa-eye-slash'} absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer`}
                                        onClick={() => setShowPassword(!showPassword)}
                                    ></i>
                                </div>

                                {password && (
                                    <div className={`text-sm mb-3 ${checkPasswordStrength(password).color}`}>
                                        Password Strength: {checkPasswordStrength(password).strength}
                                        <br />
                                        <small>Use 8+ characters with a mix of letters, numbers & symbols</small>
                                    </div>
                                )}

                                <div className="bg-[#FFFAE5] mb-1 border rounded-xl relative">
                                    <a href="" className="text-2xl text-black pr-2"><i className="fa-solid fa-lock"></i></a>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        className="bg-transparent w-[75%] py-2.5 text-xl outline-none"
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                    <i
                                        className={`fa-solid ${showConfirmPassword ? 'fa-eye' : 'fa-eye-slash'} absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer`}
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    ></i>
                                </div>

                                {confirmPassword && (
                                    <div className={`text-sm mb-3 ${password === confirmPassword ? 'text-green-500' : 'text-red-500'}`}>
                                        {password === confirmPassword ? 'Passwords match' : 'Passwords do not match'}
                                    </div>
                                )}

                                <button type="submit" className="btn-yellow">Register</button>
                            </form>

                            <img src={happy_plp_img} alt="women_img" className="absolute w-[25%] bottom-0 left-0" />
                        </div>

                        <div className="col-lg-5 bg-[#FDC500] border rounded-2xl h-[100%] d-flex flex-column justify-content-center align-items-center text-center p-4">
                            <p className="mb-3 display-5 fw-bold">Log in</p>
                            <p className="text-lg leading-6 p-2">Enter your credentials to<br />catch up on your works</p>
                            <button className="btn-navy" onClick={handleLogin}>LOGIN</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Register;

