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
        <div className="my-10 pt-2 h-full w-full px-4 overflow-x-auto">
            <div className="flex justify-center flex-col items-center">
                <div className="flex justify-center pb-6">
                    <NovaLogo className="w-full h-12 text-novaNavy"/>
                </div>
                <button onClick={() => []} className="button-sideNav w-full py-2 px-2 h-1/2 mb-6 items-center justify-center text-sm overflow-hidden">
                    New Application
                </button>
            </div>
            <ul>
                <li onClick={() => onNavigate("applications")}>
                    <div
                        className={`flex pt-3 pb-3 pl-2 items-center cursor-pointer rounded-md transition-all duration-300 ease-out ${activeView === "applications" ? "bg-black/5 translate-x-1.5" : "translate-x-0"}`}>
                        <p className={`flex items-start text-lg ${activeView === "applications" ? "font-extrabold " : "font-semibold"}`}>
                            Applications
                        </p>
                    </div>
                    <div
                        className={`ml-4 border-l-2 border-l-novaNavy/50 overflow-hidden transition-[max-height,opacity,transform,margin] duration-1000 ease-in-out ${activeView === "applications" ? "max-h-40 opacity-100 translate-y-0 mt-3" : "max-h-0 opacity-0 -translate-y-1 mt-0 pointer-events-none"}`}>
                        <ul className="pl-4 pb-2 text-sm font-medium cursor-pointer">View Applications</ul>
                        <ul className="pl-4 pb-2 text-sm font-medium cursor-pointer">Submissions Timeline</ul>
                        <ul className="pl-4 pb-2 text-sm font-medium cursor-pointer">Next Steps Tracker</ul>
                    </div>
                </li>
                <li onClick={() => onNavigate("opportunities")}>
                    <div
                        className={`flex pt-3 pb-3 pl-2 pl-2 items-center cursor-pointer rounded-md transition-all duration-300 ease-out ${activeView === "opportunities" ? "bg-black/5 translate-x-1" : "translate-x-0"}`}>
                        <p className={`flex items-start text-lg ${activeView === "opportunities" ? "font-extrabold " : "font-semibold"}`}>
                            Opportunities
                        </p>
                    </div>
                </li>
                <li onClick={() => onNavigate("learnandgrow")}>
                    <div
                        className={`flex pt-3 pb-3 pl-2 items-center cursor-pointer rounded-md transition-all duration-300 ease-out ${activeView === "learnandgrow" ? "bg-black/5 translate-x-1" : "translate-x-0"}`}>
                        <p className={`flex items-start text-lg ${activeView === "learnandgrow" ? "font-extrabold " : "font-semibold"}`}>
                            Learn & Grow</p>
                    </div>
                </li>
                <li onClick={() => onNavigate("profile")}>
                    <div
                        className={`flex pt-3 pb-3 pl-2 items-center  cursor-pointer rounded-md transition-all duration-300 ease-out ${activeView === "profile" ? "bg-black/5 translate-x-1" : "translate-x-0"}`}>
                        <p className={`flex items-start text-lg ${activeView === "profile" ? "font-extrabold " : "font-semibold"}`}>
                            Profile
                        </p>
                    </div>
                </li>
                <li onClick={() => onNavigate("novaoptimizer")}>
                    <div
                        className={`flex pt-3 pb-3 pl-2 items-center cursor-pointer rounded-md transition-all duration-300 ease-out ${activeView === "novaoptimizer" ? "bg-black/5 translate-x-1" : "translate-x-0"}`}>
                        <p className={`flex items-start text-lg ${activeView === "novaoptimizer" ? "font-extrabold " : "font-semibold"}`}>
                            Nova Optimizer
                        </p>
                    </div>
                </li>
            </ul>
            <div className="flex justify-center items-end pb-20 h-2/4 w-full">
                <button onClick={logoutHandler} className="flex justify-center items-center button-sideNav h-10 w-full mb-10">
                    Sign Out
                </button>
            </div>
        </div>
    );
}