import {useEffect, useState} from 'react';
import randomIndex, {motivationalHeaderQuotes, userNameTestRandomizer, userDashboardWelcomeMessages, userDashboardHypeText, userDashboardPositionExamples, userDashboardDescriptorText} from "../data/FlavorText.jsx";
import {avatarUrls} from "../components/userRandomizerForTest.jsx";


export default function LandingPage({quoteIndex}) {
    const [avatarURL, setAvatarURL] = useState("");
    const [activeUserFirstName, setActiveFirstName] = useState("");
    const [activeUserName, setActiveUserName] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const randomAvatar = avatarUrls[randomIndex(avatarUrls)];
        setAvatarURL(randomAvatar);

        const cleanAvatar = randomAvatar.split("?")[0];
        const user = userNameTestRandomizer[cleanAvatar];

        if (!user) {
            console.warn("No user mapping for avatar:", randomAvatar);
            setActiveUserName("UnknownUser");
            setActiveFirstName("Guest");
            setMounted(true);
            return;
        }

        setActiveUserName(user.testName);
        setActiveFirstName(user.firstName);
        setMounted(true);
    }, []);

    return (
        <div className="flex-col w-full h-full ">
            <div className="w-full h-36">
                <p
                    className={[
                        "flex pl-28 tracking-superwide text-novaCream items-center h-36 text-xl font-light italic",
                        "transition-all duration-1000 ease-in-out",
                        mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                    ].join(" ")}
                >
                    {motivationalHeaderQuotes[quoteIndex] ?? "Loading..."}
                </p>
            </div>
            <div className="flex row w-full h-4/6 pr-40 pl-28">
                <div className="flex-col w-1/2 h-full">
                    <div className="w-full h-1/3">
                        <p
                            className={[
                                "pl-2 flex items-end h-full font-semibold text-4xl text-novaSand",
                                "transition-all duration-1000 ease-in-out delay-150",
                                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                            ].join(" ")}
                        >
                            {userDashboardWelcomeMessages[quoteIndex]}
                        </p>
                    </div>
                    <div className="w-full h-3/10 pb-1">
                        <p
                            className={[
                                "flex items-center text-9xl font-semibold text-white",
                                "transition-all duration-700 ease-in-out delay-100",
                                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                            ].join(" ")}
                        >
                            {activeUserFirstName}
                        </p>
                    </div>
                    <div className="w-full h-1/3">
                        <p
                            className={[
                                "pl-2 flex items-start h-full font-light text-xl text-novaAurora",
                                "transition-all duration-700 ease-in-out delay-300",
                                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                            ].join(" ")}
                        >
                            ( {activeUserName} )
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-end w-1/2 h-full">
                    <img
                        src={avatarURL}
                        alt="Random profile"
                        className={[
                            "aspect-square h-5/6 rounded-full object-cover border-8 border-novaAurora",
                            "transition-all duration-700 ease-out delay-150",
                            mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
                        ].join(" ")}
                    />
                </div>
            </div>
            <div className="flex w-full h-36 justify-center items-center w-full">
                <p
                    className={[
                        "flex text-novaCream items-center h-36 text-2xl font-extralight",
                        "transition-all duration-700 ease-in-out delay-200",
                        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                    ].join(" ")}
                >
                    {userDashboardDescriptorText[randomIndex(userDashboardDescriptorText)]}
                </p>
                <p
                    className={[
                        "px-5 flex tracking-widest text-novaCream items-center h-36 text-5xl font-extrabold italic",
                        "transition-all duration-700 ease-in-out delay-300",
                        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                    ].join(" ")}
                >
                    {userDashboardPositionExamples[randomIndex(userDashboardPositionExamples)]}
                </p>
                <p
                    className={[
                        "flex text-novaCream items-center h-36 text-2xl font-extralight",
                        "transition-all duration-700 ease-in-out delay-500",
                        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                    ].join(" ")}
                >
                    {userDashboardHypeText[randomIndex(userDashboardHypeText)]}
                </p>
            </div>
        </div>
    )
}