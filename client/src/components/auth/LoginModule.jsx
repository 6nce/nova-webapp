import {useState} from "react";
import {testUsers} from "../../data/TempTestingData.jsx";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";
import randomIndex from "../../data/FlavorText.jsx";


export default function LoginModule() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const {login} = useAuth()


    const navigate = useNavigate();


    const setTestUser = () => {
        const keys = Object.keys(testUsers);
        const randomTestUser = keys[randomIndex(keys)]
        setEmail(randomTestUser)
        setPassword("password")
    }

    const handleSubmit =(e) => {
        e.preventDefault();
        const result = login(email, password);

        if(result.ok) {navigate("/home")
        } else {
            console.log(result.message)
        }

    }


    return (
        <div className="flex-col h-full w-full max-w-lg flex justify-center items-center bg-novaNavy rounded-3xl px-6 py-3">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 max-w-sm p-6 rounded-lg w-full">
                <h2 className="text-white font-light text-xl mb-2 ">Welcome Back</h2>
                <input
                    name="username"
                    value={email}
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-base w-full  rounded-lg shadow w-full"
                />
                <input
                    name="password"
                    value={password}
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-base w-full  rounded-lg shadow w-full"
                />
                <div>
                    <p className="flex justify-end text-xs font-medium text-novaAurora">forgot your password?</p>
                </div>
                <button className=" bg-novaAurora rounded-3xl py-2 font-semibold text-novaNavy">Sign In</button>
                <div className="pt-1">
                    <p className="flex justify-center text-xs font-medium text-novaCream">
                        First time? Get started by clicking here
                    </p>
                </div>
            </form>
            <div
                className="flex flex-col h-3/4 w-5/6 justify-center items-center border-t-2 border-b-novaCream mb-5 gap-4 pt-4">
                <div className="pt-1">
                    <p className="flex justify-center text-xs font-medium text-novaCream pb-1">
                        Prefer signing in a different way?
                    </p>
                </div>
                <button className="flex justify-center items-center bg-white rounded py-2 font-medium max-w-sm w-11/12">
                    Google SSO
                </button>
                <button className="flex justify-center items-center bg-blue-800 text-white rounded py-2 font-medium max-w-sm w-11/12">
                    Facebook SSO
                </button>
                <button className="flex justify-center items-center text-white bg-black rounded py-2 font-medium max-w-sm w-11/12">
                    Apple SSO
                </button>
            </div>
            <div>
                <p className="text-novaAurora text-xs" onClick={setTestUser}> Click here to generate test login email</p>
            </div>
        </div>
    );
}