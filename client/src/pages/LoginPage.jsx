import {useState} from "react";
import NovaLogo from "../assets/logo.svg?react";
import LoginIllustration from "../assets/loginIllustration.svg?react";
import LoginModule from "../components/auth/LoginModule.jsx";



export default function LoginPage() {

    //loginPage views: login, sign up, forget password
    const [activeView, setActiveView] = useState("login");


    return (
        activeView === "login" ? (
        <div className="flex w-screen h-screen justify-center items-center">
            <div className="flex w-5/6 h-3/4">
                <div className="h-full w-1/3 flex flex-col border-r-2 border-r-novaNavy/40 pr-16">
                    <div className="flex h-1/6 items-center justify-end w-full mt-5">
                        <NovaLogo className="h-14"/>
                    </div>
                    <div className="flex justify-end">
                    <LoginModule/>
                    </div>
                </div>
                <div className="pl-16 flex flex-1 items-center justify-start w-full">
                    <div className="flex flex-col pt-4 bg-novaNavy h-full w-full rounded-3xl">
                        <div className="w-full h-1/4 flex flex-col items-center justify-center">
                            <h1 className="text-novaCream font-light text-center text-3xl tracking-wide px-2">
                                Resumes, cover letters, job boards, recruiters, assessments, and more... </h1>
                            <h1 className="text-novaCream font-semibold text-center text-3xl tracking-wide px-2 pt-4">Don't venture into the foggy job hunt alone.</h1>

                        </div>
                        <div className="flex flex-row justify-start items-end h-full w-full">
                            <div
                                className="flex flex-col justify-end h-full w-3/6 text-xl font-light text-novaCream px-10 pb-32">
                                <h2 className="pb-14 text-2xl font-light">Job hunting can feel hazy, foggy, and even a
                                    little scary. </h2>
                                <h2 className="pb-14 text-4xl font-semibold">But what if it didn't have to?</h2>
                                <h2 className="pb-14"> We want to provide some more clarity and brightness to your path and help make your
                                    journey through the fog a little more visible. </h2>
                                <h2 className="pt-10">With nova, we can light the way forward together.</h2>
                                <NovaLogo className="h-24 pt-5 mr-auto"/>
                            </div>
                            <LoginIllustration className="flex justify-end items-end -mb-8 -mr-10 h-5/6"/>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        ) : null
    )
}