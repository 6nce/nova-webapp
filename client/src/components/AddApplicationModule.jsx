import {useAuth} from "../../context/AuthContext.jsx";



export default function AddApplicationModule() {
    const {login} = useAuth()


    const handleSubmit =async (e) => {
        e.preventDefault();
        const result = await login(email, secret);

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
                    value={secret}
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setSecret(e.target.value)}
                    className="input-base w-full  rounded-lg shadow w-full"
                />
                <div>
                    <p className="flex justify-end text-xs font-medium text-novaAurora">forgot your password?</p>
                </div>
                <button className=" bg-novaAurora rounded-3xl py-2 font-semibold text-novaNavy">Sign In</button>
                <div className="pt-1">
                    <p className="cursor-pointer flex justify-center text-xs font-medium text-novaCream" onClick={onSwitchToRegister}>
                        First time? Get started by clicking here
                    </p>
                </div>
            </form>
        </div>
    );
}