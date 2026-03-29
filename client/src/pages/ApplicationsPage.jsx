
import JobApplicationModule from "../components/JobApplicationModule.jsx";
import {useState} from "react";

export default function ApplicationsPage() {
    const [view,setView] = useState(null);
    const [applications,setApplications] = useState([]);

    const fetchApplications = async () => {
        const res = await fetch ("/api/job-applications", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("nova_token")}`,
            }
        });
        const data = await res.json();
        if (res.ok) setApplications(data.applications)
    }

    return(
        <div className="h-full w-full flex flex-row items-end justify-center items-center ">
            <JobApplicationModule/>
        </div>
    )
}