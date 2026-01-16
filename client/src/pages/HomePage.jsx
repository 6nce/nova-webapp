import {useState} from "react";
import SideNav from "../components/SideNav";
import ApplicationsPage from "./ApplicationsPage.jsx";


export default function HomePage() {
    const [activeView, setActiveView] = useState("home");

    const onNavigate = (e) => {
        setActiveView(e);
    }

    return (
        <div className="flex w-full h-screen">
            <aside className="w-96 border-r border-r-novaNavy pl-7 pr-7" >
                <SideNav activeView={activeView} onNavigate={onNavigate} />
            </aside>
            <main className="flex-1 p-6">
                <div className="w-full bg-blue ml-5 mt-14">
                    <h2 className="font-bold text-xl">Applications</h2>
                </div>
                <div className="flex items-center justify-center h-5/6 bg-novaNavy mt-5 rounded-3xl ">
                    {activeView === "applications" && <ApplicationsPage/>}
                </div>
            </main>
        </div>
    )
}