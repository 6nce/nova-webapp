import {useState} from "react";

export default function ApplicationsPage() {
    const [applications, setApplications] = useState([
        {company: "Google", role:"Software Engineer"},
        {company: "Apple", role:"Software Engineer"}
    ])

    return (
        <div>
            <h2>Applications ({applications.length})</h2>
            <ul>
                {applications.map(application => (
                    <li key={application.company}>
                        <h3>{application.company}</h3>
                        <span>{application.role}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}