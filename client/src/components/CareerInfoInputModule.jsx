import {useState} from "react";

export default function CareerInfoInputModule() {
    const [careerData, setCareerData] = useState({
        degree:'',
        linkedin_url:'',
        portfolio_url:'',
        skills:'',
    })


    const handleChange = (e) => {
        setCareerData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const handleSubmit =async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("nova_token");
        console.log(token);

        const res = await fetch("/api/career-info", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("nova_token")}`
            },
            body: JSON.stringify(careerData),
        });

        const data = await res.json();
        if(!res.ok) return {ok:false, message:data.error}
    }

    return (
        <div className="flex-col h-full w-full max-w-lg flex justify-end items-end rounded-3xl px-6 py-3">
            <div className="flex items-start max-w-sm w-full">
                <h2 className="text-novaNavy items-start justify-start font-bold text-2xl mb-2 pl-6">Candidate Details</h2>
            </div>
            <form onSubmit={handleSubmit}
                  className="flex flex-col bg-novaNavy gap-2.5 max-w-sm p-6 rounded-xl w-full shadow-2xl">
                <div>
                    <label className="text-white">Education</label>
                    <input
                        name="degree"
                        value={careerData.degree}
                        type="text"
                        placeholder="Degree"
                        onChange={handleChange}
                        className="input-base w-full  rounded-lg shadow w-full"
                    />
                </div>
                <div>
                    <label className="text-white">LinkedIn Profile</label>
                    <input
                        name="linkedin_url"
                        value={careerData.linkedin_url}
                        type="url"
                        placeholder="LinkedIn Profile"
                        onChange={handleChange}
                        className="input-base w-full  rounded-lg shadow w-full"
                    />
                </div>
                <div>
                    <label className="text-white">Portfolio Link</label>
                    <input
                        name="portfolio_url"
                        value={careerData.portfolio_url}
                        type="url"
                        placeholder="Portfolio Profile"
                        onChange={handleChange}
                        className="input-base w-full  rounded-lg shadow w-full"
                    />
                </div>
                <div>
                    <label className="text-white">Skills & Certifications</label>
                    <textarea
                        name="skills"
                        value={careerData.skills}
                        placeholder="Skill & Certifications"
                        onChange={handleChange}
                        className="input-base w-full h-40 rounded-lg shadow"
                    />
                </div>
                <button className=" bg-novaAurora rounded-3xl py-2 font-semibold text-novaNavy">Add Career Details
                </button>
            </form>
        </div>
    );
}