import { useState } from "react";
import Sidebar from "../components/CandidateDashboard/Sidebar";
import Header from "../components/CandidateDashboard/Header";

const CandidateDashboard = () => {
    

    return(
        <div className="w-full flex flex-row box-border">
            <Sidebar/>
            <Header/>
        </div>
    )
}

export default CandidateDashboard