import {useState, useEffect, act} from "react";
import SideNav from "../components/SideNav";
import ApplicationsPage from "./ApplicationsPage.jsx";
import randomIndex, {motivationalHeaderQuotes} from "../data/FlavorText.jsx";
import LandingPage from "./LandingPage.jsx";


export default function HomePage() {
    const [activeView, setActiveView] = useState("profile");
    const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);
    const [apiStatus, setApiStatus] = useState("loading");

    //Takes arg from SideNav Function
    const onNavigate = (e) => {
        setActiveView(e);
    }

    const handleQuote = () => {
        setActiveQuoteIndex(randomIndex(motivationalHeaderQuotes));
    }

    useEffect(() => {
        handleQuote();
        const checkHealth = async () => {
            try {
                setApiStatus("loading");

                const response = await fetch ("/api/health");
                if (!response.ok) throw new Error(`HTTP status ${response.status}`);

                setApiStatus("ok");
            } catch (error) {
                console.log("Health Check Failed: ", error);
                setApiStatus("error");
            }
        };

        checkHealth();
    }, []);


    return (
        <div className="flex w-full h-screen">
            <aside>
                <div className="w-96 h-[94vh] border-r-2 border-r-novaNavy/40 pl-7 pr-7">
                    <SideNav activeView={activeView} onNavigate={onNavigate} />
                </div>
            </aside>
            <main className="flex-1 p-6">
                <div className="flex col justify-between bg-blue ml-5 mt-16">
                    <h2 className="font-bold text-xl capitalize">{activeView} : API Status: {apiStatus}</h2>
                    <h2 className=" align-middle content-end text-sm tracking-widest italic">
                        {activeView !== "profile" && motivationalHeaderQuotes[activeQuoteIndex]}
                    </h2>
                </div>
                <div className="flex items-center justify-center h-5/6 bg-novaNavy mt-5 rounded-3xl ">
                    {activeView === "applications" && <ApplicationsPage/>}
                    {activeView === "profile" && <LandingPage quoteIndex={activeQuoteIndex} />}
                </div>
            </main>
        </div>
    )
}