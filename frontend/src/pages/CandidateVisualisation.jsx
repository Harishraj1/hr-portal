import React from "react";
import candidate from '../test/candidate.json'
import '../styles/candidateVisualisation.css';
import { CandidateVisualisationHeader } from "../components/CandidatePageComponents/CandidateVisualisationHeader";
import CandidateVisualisationBody from "../components/CandidatePageComponents/CandidateVisualisationBody";


function CandidateVisualisation() {
    return (
        <div className="flex flex-col">
            <CandidateVisualisationHeader name={candidate.personalInformation.fullName} jobDesig={candidate.employmentObjectives.desiredJobTitle} degree={candidate.education.educationalBackground[0].degree} major={candidate.education.educationalBackground[0].major} linkedIn={candidate.personalInformation.contactInformation.linkedinProfileURL} email={candidate.personalInformation.contactInformation.emailAddress} github={candidate.personalInformation.contactInformation.gitHubUrl}/>
            <CandidateVisualisationBody />
        </div>
    )
}

export default CandidateVisualisation;