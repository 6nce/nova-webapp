import NovaLogo from "../assets/logo.svg?react";
export default function SideNav({ activeView, onNavigate }) {

    return(
        <div className="mt-10 pt-3">
            <div className="flex justify-center pb-6 px-4">
                <NovaLogo className="w-full h-14 text-novaNavy" />
            </div>
            <button onClick = {() =>[]} className="button-sideNav w-full mb-10" >
                Track New Application
            </button>
            <ul>
                <li onClick={() => onNavigate("applications")}>
                    <div className={`flex pt-3 pb-3 pl-2 cursor-pointer rounded-md transition-all duration-300 ease-out ${activeView === "applications" ? "bg-black/5 translate-x-1" : "translate-x-0"}`}>
                        <h3 className="pr-3 text-3xl">📑</h3>
                        <p className={`flex items-center ${activeView === "applications" ? "font-extrabold text-2xl" : "font-bold text-xl"}`}>
                            Applications
                        </p>
                    </div>
                    <div className={`ml-12 border-l-2 border-l-novaNavy/50 overflow-hidden transition-[max-height,opacity,transform,margin] duration-1000 ease-in-out ${activeView === "applications" ? "max-h-40 opacity-100 translate-y-0 mt-3" : "max-h-0 opacity-0 -translate-y-1 mt-0 pointer-events-none"}`}>
                        <ul className="pl-4 pb-2 font-medium cursor-pointer">View Applications</ul>
                        <ul className="pl-4 pb-2 font-medium cursor-pointer">Submissions Timeline</ul>
                        <ul className="pl-4 pb-2 font-medium cursor-pointer">Next Steps Tracker</ul>
                    </div>
                </li>
                <li onClick={() => onNavigate("opportunities")}>
                    <div className={`flex pt-3 pb-3 pl-2 cursor-pointer rounded-md transition-all duration-300 ease-out ${activeView === "opportunities" ? "bg-black/5 translate-x-1" : "translate-x-0"}`}>
                        <h3 className="pr-3 text-3xl">💼</h3>
                        <p className={`flex items-center ${activeView === "opportunities" ? "font-extrabold text-2xl" : "font-bold text-xl"}`}>
                            Opportunities
                        </p>
                    </div>
                </li>
                <li onClick={() => onNavigate("learnandgrow")}>
                    <div className={`flex pt-3 pb-3 pl-2 cursor-pointer rounded-md transition-all duration-300 ease-out ${activeView === "learnandgrow" ? "bg-black/5 translate-x-1" : "translate-x-0"}`}>
                        <h3 className="pr-3 text-3xl">⬆️</h3>
                        <p className={`flex items-center ${activeView === "learnandgrow" ? "font-extrabold text-2xl" : "font-bold text-xl"}`}>
                            Learn & Grow</p>
                    </div>
                </li>
                <li onClick={() => onNavigate("profile")}>
                    <div className={`flex pt-3 pb-3 pl-2 cursor-pointer rounded-md transition-all duration-300 ease-out ${activeView === "profile" ? "bg-black/5 translate-x-1" : "translate-x-0"}`}>
                        <h3 className="pr-3 text-3xl">👤</h3>
                        <p className={`flex items-center ${activeView === "profile" ? "font-extrabold text-2xl" : "font-bold text-xl"}`}>
                            Profile
                        </p>
                    </div>
                </li>
                <li onClick={() => onNavigate("novaoptimizer")}>
                    <div className={`flex pt-3 pb-3 pl-2 cursor-pointer rounded-md transition-all duration-300 ease-out ${activeView === "novaoptimizer" ? "bg-black/5 translate-x-1" : "translate-x-0"}`}>
                        <h3 className="pr-3 text-3xl">💫</h3>
                        <p className={`flex items-center ${activeView === "novaoptimizer" ? "font-extrabold text-2xl" : "font-bold text-xl"}`}>
                            Nova Optimizer
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    );
}