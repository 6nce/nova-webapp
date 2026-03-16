import NovaLogo from "../assets/logo.svg?react";
import {useAuth} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

export default function SideNav({ activeView, onNavigate }) {

    const {logout} = useAuth()
    const navigate = useNavigate();



    const logoutHandler = () => {
        logout()
        navigate("/login")
    }


    return(
        <div className="mt-10 pt-3 h-full w-full">
            <div className="flex justify-center flex-col items-center">
                <div className="flex justify-center pb-6 px-4">
                    <NovaLogo className="w-full h-10 text-novaNavy"/>
                </div>
                <button onClick={() => []} className="button-sideNav w-52 mb-10 items-center justify-center">
                    Track New Application
                </button>
            </div>
            <ul>
                <li onClick={() => onNavigate("applications")}>
                    <div
                        className={`flex pt-3 pb-3 pl-2 cursor-pointer rounded-md transition-all duration-300 ease-out ${activeView === "applications" ? "bg-black/5 translate-x-1" : "translate-x-0"}`}>
                        <h3 className="pr-3 text-2xl">📑</h3>
                        <p className={`flex items-center ${activeView === "applications" ? "font-bold text-xl" : "font-semibold text-lg"}`}>
                            Applications
                        </p>
                    </div>
                    <div
                        className={`ml-12 border-l-2 border-l-novaNavy/50 overflow-hidden transition-[max-height,opacity,transform,margin] duration-1000 ease-in-out ${activeView === "applications" ? "max-h-40 opacity-100 translate-y-0 mt-3" : "max-h-0 opacity-0 -translate-y-1 mt-0 pointer-events-none"}`}>
                        <ul className="pl-4 pb-2 font-medium cursor-pointer">View Applications</ul>
                        <ul className="pl-4 pb-2 font-medium cursor-pointer">Submissions Timeline</ul>
                        <ul className="pl-4 pb-2 font-medium cursor-pointer">Next Steps Tracker</ul>
                    </div>
                </li>
                <li onClick={() => onNavigate("opportunities")}>
                    <div
                        className={`flex pt-3 pb-3 pl-2 cursor-pointer rounded-md transition-all duration-300 ease-out ${activeView === "opportunities" ? "bg-black/5 translate-x-1" : "translate-x-0"}`}>
                        <h3 className="pr-3 text-2xl">💼</h3>
                        <p className={`flex items-center ${activeView === "opportunities" ? "font-bold text-xl" : "font-semibold text-lg"}`}>
                            Opportunities
                        </p>
                    </div>
                </li>
                <li onClick={() => onNavigate("learnandgrow")}>
                    <div
                        className={`flex pt-3 pb-3 pl-2 cursor-pointer rounded-md transition-all duration-300 ease-out ${activeView === "learnandgrow" ? "bg-black/5 translate-x-1" : "translate-x-0"}`}>
                        <h3 className="pr-3 text-2xl">⬆️</h3>
                        <p className={`flex items-center ${activeView === "learnandgrow" ? "font-bold text-xl" : "font-semibold text-lg"}`}>
                            Learn & Grow</p>
                    </div>
                </li>
                <li onClick={() => onNavigate("profile")}>
                    <div
                        className={`flex pt-3 pb-3 pl-2 cursor-pointer rounded-md transition-all duration-300 ease-out ${activeView === "profile" ? "bg-black/5 translate-x-1" : "translate-x-0"}`}>
                        <h3 className="pr-3 text-2xl">👤</h3>
                        <p className={`flex items-center ${activeView === "profile" ? "font-bold text-xl" : "font-semibold text-lg"}`}>
                            Profile
                        </p>
                    </div>
                </li>
                <li onClick={() => onNavigate("novaoptimizer")}>
                    <div
                        className={`flex pt-3 pb-3 pl-2 cursor-pointer rounded-md transition-all duration-300 ease-out ${activeView === "novaoptimizer" ? "bg-black/5 translate-x-1" : "translate-x-0"}`}>
                        <h3 className="pr-3 text-2xl">💫</h3>
                        <p className={`flex items-center ${activeView === "novaoptimizer" ? "font-bold text-xl" : "font-semibold text-lg"}`}>
                            Nova Optimizer
                        </p>
                    </div>
                </li>
            </ul>
            <div className="flex justify-center items-end pb-20 h-2/4">
                <button onClick={logoutHandler} className="flex justify-center items-center button-sideNav h-10 w-1/2 mb-10">
                    Sign Out
                </button>
            </div>
        </div>
    );
}