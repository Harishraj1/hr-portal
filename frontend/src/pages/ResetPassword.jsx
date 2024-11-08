import { useState } from "react";
import EnterMailSection from "../components/ResetPageComponents/EnterMailSection";
import EnterOtpSection from "../components/ResetPageComponents/EnterOTPsection";
import ResetPasswordSideBar from "../components/ResetPageComponents/SideBar";
import EnterResetPassword from "../components/ResetPageComponents/EnterResetPassword";
import { Loader } from "../components/utils";

function ResetPassword() {
    const [pageIndex, setPageIndex] = useState(0)
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const components = {
        0: <EnterMailSection pageIndexSetter={setPageIndex}  email={email} emailSetter={setEmail} loadingSetter={setLoading}/>,
        1: <EnterOtpSection email={email} pageIndexSetter={setPageIndex} loadingSetter={setLoading} />,
        2: <EnterResetPassword email={email} pageIndexSetter={setPageIndex} loadingSetter={setLoading}/>
    }

    return (
        <div className="h-full flex flex-row box-border">
            { loading ? <Loader /> : <></>}
            <ResetPasswordSideBar />
            {
                pageIndex === 0 ? 
                <EnterMailSection pageIndexSetter={setPageIndex}  email={email} emailSetter={setEmail} loadingSetter={setLoading}/>
                : pageIndex === 1 ?
                <EnterOtpSection email={email} pageIndexSetter={setPageIndex} loadingSetter={setLoading} />
                : 
                <EnterResetPassword email={email} pageIndexSetter={setPageIndex} loadingSetter={setLoading}/>
            }
        </div>
    )
}

export default ResetPassword;