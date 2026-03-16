import {useState} from "react";
import CandidateSummaryModule from "./CandidateSummaryModule.jsx";

export default function JobApplicationModule() {
    const [jobApplicationData, setJobApplicationData] = useState({
        company:'',
        position:'',
        application_link:'',
        salary_min:'',
        salary_max:'',
        location:'',
        listing_date:'',
        position_type:'',
        location_type:'',
        responsibilities:'',
        requirements:'',
        benefits:'',
        cover_letter:false,
        personal_notes:'',
        role_rating:1,
        fit_rating:1,
        }
    );



    const handleChange = (e) => {
        setJobApplicationData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const handleSubmit =async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("nova_token");
        console.log(token);

        const res = await fetch("/api/job-applications", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("nova_token")}`
            },
            body: JSON.stringify(jobApplicationData),
        });

        const data = await res.json();
        if(!res.ok) return {ok:false, message:data.error}
    }

    return(
        <div className="flex w-full h-full bg-novaNavy justify-between rounded-3xl">
            <CandidateSummaryModule />
            <div className=" h-full w-3/4 rounded-3xl bg-novaNavy py-8 pr-8 pl-4">
                <form onSubmit={handleSubmit}
                      className="flex flex-row bg-novaNavyShadow gap-2.5 p-6 rounded-3xl w-full h-full">
                    <div className="flex flex-col w-full gap-2.5">
                    <div className="flex flex-row full bg-novaNavy p-4 rounded-xl mb-4 font-bold text-xl text-white justify-between">
                        <div>{jobApplicationData.position}</div>
                        <div>{jobApplicationData.company}</div>
                    </div>
                    <div className="flex-row flex gap-4">
                        <div className="w-full flex flex-col gap-4">
                            <div>
                                <label className="text-white">Company</label>
                                <input
                                    name="company"
                                    value={jobApplicationData.company}
                                    type="text"
                                    placeholder="Company Name"
                                    onChange={handleChange}
                                    className="input-base w-full rounded-lg shadow"
                                />
                            </div>
                            <div>
                                <label className="text-white">Position</label>
                                <input
                                    name="position"
                                    value={jobApplicationData.position}
                                    type="text"
                                    placeholder="Position"
                                    onChange={handleChange}
                                    className="input-base w-full  rounded-lg shadow"
                                />
                            </div>
                            <div>
                                <label className="text-white">Position Type</label>
                                <select
                                    name="position_type"
                                    value={jobApplicationData.position_type}
                                    onChange={handleChange}
                                    className="input-base w-full rounded-lg shadow"
                                >
                                    <option value="">Select Position Type</option>
                                    <option value="intern">Intern/Apprenticeship</option>
                                    <option value="contract">Contract</option>
                                    <option value="part_time">Part-Time</option>
                                    <option value="full_time">Full-Time</option>

                                </select>
                            </div>
                            <div>
                                <label className="text-white">Link to Application or Job Description</label>
                                <input
                                    name="application_link"
                                    value={jobApplicationData.application_link}
                                    type="text"
                                    placeholder="Link to Application"
                                    onChange={handleChange}
                                    className="input-base w-full rounded-lg shadow"
                                />
                            </div>
                            <div>
                                <label className="text-white">Salary Range - Minimum</label>
                                <input
                                    name="salary_min"
                                    value={jobApplicationData.salary_min}
                                    type="number"
                                    placeholder="Salary Range - Minimum"
                                    onChange={handleChange}
                                    className="input-base w-full rounded-lg shadow"
                                />
                            </div>
                            <div>
                                <label className="text-white">Salary Range - Maximum</label>
                                <input
                                    name="salary_max"
                                    value={jobApplicationData.salary_max}
                                    type="number"
                                    placeholder="Salary Range - Maximum"
                                    onChange={handleChange}
                                    className="input-base w-full rounded-lg shadow"
                                />
                            </div>
                            <div>
                                <label className="text-white">Job Location</label>
                                <input
                                    name="location"
                                    value={jobApplicationData.location}
                                    type="text"
                                    placeholder="Job Location"
                                    onChange={handleChange}
                                    className="input-base w-full rounded-lg shadow"
                                />
                            </div>
                            <div>
                                <label className="text-white">Location Type</label>
                                <select
                                    name="location_type"
                                    value={jobApplicationData.location_type}
                                    onChange={handleChange}
                                    className="input-base w-full rounded-lg shadow"
                                >
                                    <option value="">Select Location Type</option>
                                    <option value="remote">Remote</option>
                                    <option value="in_office">In-Office</option>
                                    <option value="hybrid">Hybrid</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-white">Listing Date</label>
                                <input
                                    name="listing_date"
                                    value={jobApplicationData.listing_date}
                                    type="date"
                                    placeholder="Job Location"
                                    onChange={handleChange}
                                    className="input-base w-full rounded-lg shadow"
                                />
                            </div>
                            <div>
                                <label className="text-white">Cover Letter Used?</label>
                                <input
                                    name="cover_letter"
                                    value={jobApplicationData.cover_letter}
                                    type="checkbox"
                                    placeholder="Cover Letter Used?"
                                    onChange={(e) => {
                                        setJobApplicationData(prevState => ({
                                            ...prevState,
                                            cover_letter: e.target.checked
                                        }));
                                    }}
                                    className="input-base rounded-lg "
                                />
                            </div>

                        </div>
                        <div className="w-full flex-col flex gap-4">
                            <div>
                                <label className="text-white">Responsibilities</label>
                                <textarea
                                    name="responsibilities"
                                    value={jobApplicationData.responsibilities}
                                    placeholder="Responsibilities"
                                    onChange={handleChange}
                                    className="input-base w-full rounded-lg shadow"
                                />
                            </div>
                            <div>
                                <label className="text-white">Requirements</label>
                                <textarea
                                    name="requirements"
                                    value={jobApplicationData.requirements}
                                    placeholder="Requirements"
                                    onChange={handleChange}
                                    className="input-base w-full rounded-lg shadow"
                                />
                            </div>
                            <div>
                                <label className="text-white">Benefits</label>
                                <textarea
                                    name="benefits"
                                    value={jobApplicationData.benefits}
                                    placeholder="Benefits"
                                    onChange={handleChange}
                                    className="input-base w-full rounded-lg shadow"
                                />
                            </div>
                            <div>
                                <label className="text-white">Personal Notes</label>
                                <input
                                    name="personal_notes"
                                    value={jobApplicationData.personal_notes}
                                    type="textarea"
                                    placeholder="Personal Notes"
                                    onChange={handleChange}
                                    className="input-base w-full rounded-lg shadow"
                                />
                            </div>
                            <div>
                                <label className="text-white">Role Rating</label>
                                <select
                                    name="role_rating"
                                    value={jobApplicationData.role_rating}
                                    onChange={handleChange}
                                    className="input-base w-full rounded-lg shadow"
                                >
                                    <option value="">Rate the Role</option>
                                    <option value="1"> 1 - Completely Underpaid</option>
                                    <option value="2"> 2 - Slightly Underpaid</option>
                                    <option value="3"> 3 - Market Average</option>
                                    <option value="4"> 4 - Better than Average Pay</option>
                                    <option value="5"> 5 - Great Pay</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-white">Fit Rating</label>
                                <select
                                    name="fit_rating"
                                    value={jobApplicationData.fit_rating}
                                    onChange={handleChange}
                                    className="input-base w-full rounded-lg shadow"
                                >
                                    <option value="">Rate your fit</option>
                                    <option value="1"> 1 - Can perform very little tasks</option>
                                    <option value="2"> 2 - Can perform some tasks</option>
                                    <option value="3"> 3 - Can perform most tasks</option>
                                    <option value="4"> 4 - Can perform all tasks</option>
                                    <option value="5"> 5 - Can easily perform all tasks</option>
                                </select>
                            </div>
                            <button
                                className=" mt-6 bg-novaAurora rounded-3xl py-2 w-full font-semibold text-novaNavy">Track
                                Application
                            </button>
                        </div>
                    </div>
                    </div>
                </form>
            </div>
        </div>
    );
}