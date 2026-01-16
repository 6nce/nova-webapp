import NovaLogo from "../assets/logo.svg?react";
export default function SideNav({ activeView, onNavigate }) {

    return(
        <div className="mt-12">
            <div className="flex justify-center pb-6 px-4">
                <NovaLogo className="w-full h-14 text-novaNavy" />
            </div>
            <button onClick = {() =>[]} className="button-sideNav w-full mb-10" >
                Track New Application
            </button>
            <ul>
                <li onClick={() => onNavigate("applications")}>
                    <div
                        className={`flex row pt-3 pb-3 pl-2 cursor-pointer rounded-md ${activeView === "applications" ? "bg-black/5 rounded-md" : ""}`}>
                        <h3 className="pr-3 text-3xl">📑</h3>
                        <p className={`flex items-center ${activeView === "applications" ? "font-extrabold text-2xl" : "font-bold text-xl"}`}>
                            Applications
                        </p>
                    </div>
                </li> {activeView === "applications" ? (
                <div className="ml-12 mt-3 border-l-2 border-l-novaNavy/50 ">
                    <ul className="pl-4 pb-2 font-medium"> View Applications </ul>
                    <ul className="pl-4 pb-2 font-medium"> Submissions Timeline </ul>
                    <ul className="pl-4 font-medium"> Next Steps Tracker </ul>
                </div>
            ) : null}
                <li onClick={() => onNavigate("opportunities")}>
                    <div
                        className={`flex row pt-3 pb-3 pl-2 cursor-pointer rounded-md ${activeView === "opportunities" ? "bg-black/5 rounded-md" : ""}`}>
                        <h3 className="pr-3 text-3xl">💼</h3>
                        <p className={`flex items-center ${activeView === "opportunities" ? "font-extrabold text-2xl" : "font-bold text-xl"}`}>
                            Opportunities
                        </p>
                    </div>
                </li>
                <li onClick={() => onNavigate("learnandgrow")}>
                    <div
                        className={`flex pt-3 pb-3 pl-2 cursor-pointer rounded-md ${activeView === "learnandgrow" ? "bg-black/5 rounded-md" : ""}`}>
                        <h3 className="pr-3 text-3xl">⬆️</h3>
                        <p className={`flex items-center ${activeView === "learnandgrow" ? "font-extrabold text-2xl" : "font-bold text-xl"}`}>
                            Learn & Grow</p>
                    </div>
                </li>
                <li onClick={() => onNavigate("profile")}>
                    <div className={`flex pt-3 pb-3 pl-2 cursor-pointer rounded-md ${activeView === "profile" ? "bg-black/5 rounded-md" : ""}`}>
                        <h3 className="pr-3 text-3xl">👤</h3>
                        <p className={`flex items-center ${activeView === "profile" ? "font-extrabold text-2xl" : "font-bold text-xl"}`}>
                            Profile
                        </p>
                    </div>
                </li>
                <li onClick={() => onNavigate("novaoptimizer")}>
                    <div
                        className={`flex pt-3 pb-3 pl-2 cursor-pointer rounded-md ${activeView === "novaoptimizer" ? "bg-black/5 rounded-md" : ""}`}>
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