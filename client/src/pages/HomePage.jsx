import {useState, useEffect, act} from "react";
import SideNav from "../components/SideNav";
import ApplicationsPage from "./ApplicationsPage.jsx";
import randomIndex, {motivationalHeaderQuotes} from "../data/FlavorText.jsx";
import ProfilePage from "./ProfilePage.jsx";


export default function HomePage() {
    const [activeView, setActiveView] = useState("profile");
    const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);

    //Takes arg from SideNav Function
    const onNavigate = (e) => {
        setActiveView(e);
    }

    return (
        <div className="flex w-screen h-screen overflow-hidden bg-novaCream py-10">
            <aside className="flex sm:w-1/12 h-full">
                <div className="flex-1 w-full h-full border-r-2 border-r-novaNavy/40">
                    <SideNav activeView={activeView} onNavigate={onNavigate} />
                </div>
            </aside>
            <main className="flex-1 w-full h-full p-6">
                <div className="flex w-full h-1/8 col justify-between bg-blue px-5">
                    <h2 className="font-bold text-xl capitalize">{activeView}</h2>
                    <h2 className=" align-middle content-end text-sm tracking-widest italic">
                        {activeView !== "profile" && motivationalHeaderQuotes[activeQuoteIndex]}
                    </h2>
                </div>
                <div className="flex w-full h-full rounded-3xl bg-novaNavy">
                    {activeView === "applications" && <ApplicationsPage/>}
                    {activeView === "profile" && <ProfilePage />}
                </div>
            </main>
        </div>
    )
}