import {useState} from "react";

const EMPTY_FORM = { //ALL CAPS + UNDERSCORE = CONSTANT
    company:"",
    position:"",
    salary:"",
    date:"",
    matchConfidence:5,
    desiredLevel:5,
    coverLetter:false,
    requirements:"",
    responsibilities:""
}

export default function ApplicationsPage() {
    const [applications, setApplications] = useState([]);
    const [view, setView] = useState("form");
    const [selectedFormId, setSelectedFormId] = useState(null);
    const [formData, setFormData] = useState(EMPTY_FORM);
    const selectedApp = applications.find(app => app.id === selectedFormId);



    const handleChange = (e) => {
        const field = e.target;

        const checkValue = (field) => {
            if (field.type === 'checkbox') { //Checks for Checkbox
                return field.checked;
            } else if (field.type === "number") { //Checks for Number
                return Number(field.value);
            } else { //Defaults to value fallback
                return field.value;
            }
        };

        let value = checkValue(field);

        setFormData(prev => ({...prev, [field.name]: value})); //prev prevents edge cases if formData becomes stale.

    };

    const handleAddMore = () => {
        setFormData(EMPTY_FORM)
        setSelectedFormId(null);
        setView("form")
    }

    const handleSubmit = (e) => {
        e.preventDefault(); //Prevents page refresh

        const newApp = {
            ...formData, //copies all fields from formData
            id: crypto.randomUUID() //adds a new unique key to object
        };

        setApplications(prev => [...prev, newApp]);
        setSelectedFormId(newApp.id);
        setView("overview");
    }

    const handleSelectApp = (appId) => {
        setSelectedFormId(appId);
        setView("overview")
    }

    return (
        view === "form" ? (
            <div>
                <h3 className="text-2xl font-bold text-novaNavy">
                    Application for {formData.company}
                </h3>
                <form onSubmit={handleSubmit} className="form-base">
                    <label className="label-base">
                        Company Name:
                        <input
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="input-base"
                        />
                    </label>
                    <label className="label-base">
                        Position Applying for:
                        <input
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            className="input-base"
                        />
                    </label>
                    <label className="label-base">
                        Cover Letter Included?:
                        <input
                            type="checkbox"
                            name="coverLetter"
                            checked={formData.coverLetter}
                            onChange={handleChange}
                            className="input-base"
                        />
                    </label>
                    <label className="label-base">
                        Listed Salary:
                        <input
                            name="salary"
                            type="number"
                            value={formData.salary}
                            onChange={handleChange}
                            className="input-base"
                        />
                    </label>
                    <button type="submit" className="button-primary">Add Application</button>
                </form>
            </div>
    ): view === "list" ? (
            <div>
                <ul>
                    {applications.map((app) => (
                        <li key={app.id}>
                            <p>{app.company}</p>
                            <button type="button" onClick={() => handleSelectApp(app.id)}>View Application</button>
                        </li>
                    ))}

                </ul>
            </div>
        ): view === "overview" ? (
            <div>
                <h2>Success!</h2>
                <p>Your application is now being tracked.</p>
                <h2>Company:</h2>
                <p>{selectedApp?.company}</p>
                <h2>Position:</h2>
                <p>{selectedApp?.position}</p>
                <h2>Salary:</h2>
                <p>{selectedApp?.salary}</p>
                <h2>Cover Letter Sent?:</h2>
                <p>{selectedApp?.coverLetter ? "Yes": "No"}</p>
                <button className="button-primary pl-4 pr-4" onClick={handleAddMore}>
                    Submit another Application
                </button>
                <button className="button-primary pl-4 pr-4" type="button" onClick={() => setView("list")}>
                    Back to List
                </button>
            </div>
        ) : null
    )
}