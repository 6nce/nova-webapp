import {useState} from "react";

export default function AddJobHistoryModule() {
    const [currentJobView, setCurrentJobView] = useState(false);
    const [jobData, setJobData] = useState({
        company_name: '',
        job_title:'',
        start_date:'',
        end_date:'',
        is_current: true,
        description: '',
    })


    const handleChange = (e) => {
        setJobData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const handleSubmit =async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("nova_token");
        console.log(token);

        const res = await fetch("/api/job-history", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("nova_token")}`
            },
            body: JSON.stringify({...jobData, end_date: jobData.end_date || null}),
        });

        const data = await res.json();
        if(!res.ok) return {ok:false, message:data.error}
    }

    return (
        <div className="flex-col h-full w-full max-w-lg flex justify-end items-end rounded-3xl px-6 py-3">
            <div className="flex items-start max-w-sm w-full">
                <h2 className="text-novaNavy items-start justify-start font-bold text-2xl mb-2 pl-6">Add Job History</h2>
            </div>
            <form onSubmit={handleSubmit}
                  className="flex flex-col bg-novaNavy gap-2.5 max-w-sm p-6 rounded-xl w-full shadow-2xl">
                <div>
                    <label className="text-white">Company Name</label>
                    <input
                        name="company_name"
                        value={jobData.company_name}
                        type="text"
                        placeholder="Company Name"
                        onChange={handleChange}
                        className="input-base w-full  rounded-lg shadow w-full"
                    />
                </div>
                <div>
                    <label className="text-white">Job Title</label>
                    <input
                        name="job_title"
                        value={jobData.job_title}
                        type="text"
                        placeholder="Job Title"
                        onChange={handleChange}
                        className="input-base w-full  rounded-lg shadow w-full"
                    />
                </div>
                <div className="flex justify-end items-center w-full ">
                    <label className="text-white text-sm pr-2">Do you currently work here?</label>
                    <input
                        name="is_current"
                        value={jobData.is_current}
                        type="checkbox"
                        placeholder="is_current"
                        onChange={(e) => {
                            setCurrentJobView(e.target.checked);
                            setJobData(prevState => ({...prevState, is_current: e.target.checked}));
                        }}
                        className="input-base rounded-lg "
                    />
                </div>
                <div>
                    <label className="text-white">Start Date</label>
                    <input
                        name="start_date"
                        value={jobData.start_date}
                        type="date"
                        placeholder="Start Date"
                        onChange={handleChange}
                        className="input-base w-full  rounded-lg shadow w-full"
                    />
                </div>

                {!currentJobView && (
                    <div>
                        <label className="text-white">End Date</label>
                        <input
                            name="end_date"
                            type="date"
                            value={jobData.end_date}
                            onChange={handleChange}
                            className="input-base w-full rounded-lg shadow"
                        />
                    </div>
                )}

                <div>
                    <label className="text-white">Responsibilities</label>
                    <textarea
                        name="description"
                        value={jobData.description}
                        type="text"
                        placeholder="Description"
                        onChange={handleChange}
                        className="input-base w-full h-40 rounded-lg shadow"
                    />
                </div>
                <button className=" bg-novaAurora rounded-3xl py-2 font-semibold text-novaNavy">Add Job to History
                </button>
            </form>
        </div>
    );
}