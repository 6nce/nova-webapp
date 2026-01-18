import {useState} from "react";
import NovaLogo from "../assets/logo.svg?react";
import LoginModule from "../components/auth/LoginModule.jsx";


export default function LoginPage() {

    //loginPage views: login, sign up, forget password
    const [activeView, setActiveView] = useState("login");


    return (
        activeView === "login" ? (
        <div className="flex w-screen h-screen justify-center items-center">
            <div className="flex w-5/6 h-3/4 bg-black/60">
                <div className="bg-novaCream h-full w-1/3 flex-col border-r-2 border-r-novaNavy/40 pr-10">
                    <div className="flex h-1/6 items-center max-w-lg mt-5">
                        <NovaLogo className="h-14 text-novaNavy" />
                    </div>
                    <div>
                        <LoginModule/>
                    </div>
                </div>
                <div className="bg-novaAurora h-full w-full">

                </div>

            </div>

        </div>
        ) : null
    )
}