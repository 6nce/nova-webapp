import {useState} from "react";

export default function ApplicationsPage() {
    const [applications, setApplications] = useState([]);
    const [view, setView] = useState("form");
    const [formData, setFormData] = useState({
        company:"",
        position:"",
        salary:"",
        date:"",
        matchConfidence:5,
        desiredLevel:5,
        coverLetter:false,
        requirements:"",
        responsibilities:""
    });



    const handleChange = (e) => {
        const field = e.target;

        const checkValue = (field) => {
            if (field.type === 'checkbox') { //Checks for Checkbox
                return field.checked;
            } else if (field.type === 'number' && field.value < 0) { //Checks for Number
                return Number(field.value);
            } else { //Defaults to value fallback
                return field.value;
            }
        };

        let value = checkValue(field);

        setFormData(prev => ({...prev, [field.name]: value})); //prev prevents edge cases if formData becomes stale.

    };

    const handleSubmit = (e) => {
        e.preventDefault(); //Prevents page refresh

        const newApp = {
            ...formData, //copies all fields from formData
            id: crypto.randomUUID() //adds a new unique key to object
        };

        setApplications(prev => [...prev, newApp]);
        setView("formCompletion");
    }

    return (
        view === "form" ? (
            <div>
                <h3 className="text-2xl font-bold text-blue-600">
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
                            value={formData.salary}
                            onChange={handleChange}
                            className="input-base"
                        />
                    </label>
                    <button type="submit" className="button-primary">Add Application</button>
                </form>
            </div>
    )   :  <div>
            <h2>Success!</h2>
            <p>Your application is now being tracked.</p>
            <button onClick={() => setView("form")}>
                Return to previous screen
            </button>
        </div>
    )
}