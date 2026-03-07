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

}