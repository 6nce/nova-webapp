import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";


export default function RegisterModule({ onSwitchToLogin }){
    const {login} = useAuth();
    const navigate = useNavigate();


    //registerSchema
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        userName:"",
        email:"",
        secret:""
    })


    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (!res.ok) {
            console.log(data.error);
            return;
        }

        const result = await login(formData.email, formData.secret);
        if (result.ok) navigate("/home");
    };


    const handleChange = (e) => {
        setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-screen-md p-6 rounded-lg">
            <h2 className="text-white text-xl font-semibold">Welcome</h2>
            <p className="text-white mb-4">Please fill out the form below to complete registration.</p>
            <label className="text-white"> First Name </label>
            <input
                name="firstName"
                value={formData.firstName}
                type="text"
                onChange={handleChange}
                placeholder="First Name"
                className="input-base w-full rounded-lg shadow "
            />
            <label className="text-white"> Last Name </label>
            <input
                name="lastName"
                value={formData.lastName}
                type="text"
                onChange={handleChange}
                placeholder="Last Name"
                className="input-base w-full rounded-lg shadow "
            />
            <label className="text-white"> User Name </label>
            <input
                name="userName"
                value={formData.userName}
                type="text"
                onChange={handleChange}
                placeholder="User Name"
                className="input-base w-full rounded-lg shadow "
            />
            <label className="text-white"> Email </label>
            <input
                name="email"
                value={formData.email}
                type="email"
                onChange={handleChange}
                placeholder="Email"
                className="input-base w-full rounded-lg shadow"
            />
            <label className="text-white"> Password</label>
            <input
                name="secret"
                value={formData.secret}
                type="password"
                onChange={handleChange}
                placeholder="Password"
                className="input-base w-full rounded-lg shadow"
            />
            <button className=" bg-novaAurora rounded-3xl py-3 my-5 font-semibold text-novaNavy">Register</button>
            <p className="cursor-pointer flex justify-center text-xs font-medium text-novaCream"
               onClick={onSwitchToLogin}>
                Already registered? Click here to return to login
            </p>
        </form>
    );
}