import {useState} from "react";

export default function ApplicationsPage() {

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
        const value = (field.type === "checkbox") ? field.checked : field.value;

        setFormData({...formData, [field.name]: value});

    };

    return (
        <div>
            <h3>Application for {formData.company}</h3>
            <label>
                Company Name:
                <input
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                />
            </label>
            <label>
                Position Applying for:
                <input
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                />
            </label>
            <label>
                Cover Letter Included?:
                <input
                    type="checkbox"
                    name="coverLetter"
                    checked={formData.coverLetter}
                    onChange={handleChange}
                />
            </label>

        </div>
    )
}