import React, { useState } from "react";

function ResetPasswordSideBar() {
    const [sideBarOpts, setSideBarOpts] = useState([
        {
            title: "Enter Your Email or Phone",
            sub: "We will send you a code",
            reached: true,
            completed: false
        },

        {
            title: "Enter the confirmation code",
            sub: "Confirm that's you",
            reached: false,
            completed: false
        },

        {
            title: "Create new password",
            sub: "Create a new strong password",
            reached: false,
            completed: false
        },

        {
            title: "Good to go!",
            sub: "New password is set, feel free now.",
            reached: false,
            completed: false
        }
    ]
    )

    return (
        <div className="hidden h-full md:flex w-1/3 flex-col p-4 bg-yellow-200 m-2 rounded-3">
            <span className="flex flex-row text-xl">
                <i class="fa-brands fa-joomla text-2xl mt-[0.2rem] mr-2" />
                <p> Company Name </p>
            </span>

            <div className="mt-5 flex flex-col align-start">
                {
                    sideBarOpts && sideBarOpts.map((item, index) => {
                        return (
                            <div className="flex flex-row text-sm py-2">
                                {
                                    !item.completed ? 
                                    <i class="fa-solid fa-hourglass-start mt-1 mr-2 text-lg"></i> 
                                    :
                                    <i class="fa-regular fa-circle-check mt-1 mr-2 text-lg"></i>
                                }
                                <span className="flex flex-col justify-start text-left">
                                    <p className={item.reached ? 'text-lg mb-2 leading-tight font-bold' : 'text-lg mb-2 leading-tight'}>{item.title}</p>
                                    <p>{item.sub}</p>
                                </span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ResetPasswordSideBar;