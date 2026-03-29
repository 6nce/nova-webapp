import {useState, useEffect} from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Copy } from "lucide-react";

export default function CandidateSummaryModule() {
    const [jobs, setJobs] = useState([]);
    const [careerData, setCareerData] = useState({});

    useEffect(()=> {
        const fetchData = async () => {
            //Fetch Jobs
            const resJobs = await fetch("/api/job-history", {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('nova_token')}`
                }
            });
            const jobData = await resJobs.json();
            if (resJobs.ok) {
                const sorted = jobData.jobs.sort((a, b) => new Date(b.start_date) - new Date(a.start_date));
                setJobs(sorted);
            }

            //Fetch Career Info
            const resCareerInfo = await fetch("/api/career-info", {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('nova_token')}`
                }
            });
            const careerDataInfo = await resCareerInfo.json();
            if (resCareerInfo.ok) setCareerData(careerDataInfo.userCareerInfo);


        };
        fetchData();
    }, []);

    return (
        <div className="flex flex-col self-stretch text-novaCream px-3 py-6 rounded-3xl bg-novaAurora my-8 ml-8 pt-12 overflow-hidden">
            <div className="flex w-full bg-novaAurora px-4 rounded-xl font-bold text-novaNavy text-3xl items-end pb-4">
            Career Quick Glance
                </div>
                {/* Career Info Section */}
                <div className="flex flex-col pb-4 bg-novaNavy rounded-t-lg px-4 pt-6">
                    <div className="flex flex-col">
                        <p className="font-bold text-lg">Education</p>
                        <div className=" px-3 py-3 rounded-md ">
                            <CopyToClipboard text={`Bachelor of Science, ${careerData.degree}`}>
                                <button type="button"
                                        className="flex items-center gap-2 cursor-pointer text- hover:text-novaAurora transition-colors">
                                    <Copy className="w-4 h-4"/>
                                    <p>Bachelor of Science, {careerData.degree}</p>
                                </button>
                            </CopyToClipboard>
                        </div>
                    </div>
                    <div className="flex-col">
                        <p className="font-bold text-lg">Links</p>
                        <div className="px-3 py-3 rounded-md ">
                            <div className="flex flex-col gap-2">
                                <p className="text-novaCream font-medium text-sm">LinkedIn Profile: </p>
                                <CopyToClipboard text={careerData.linkedin_url}>
                                    <button type="button"
                                            className="flex items-center gap-2 cursor-pointer text-novaCream hover:text-novaAurora transition-colors">
                                        <Copy className="w-4 h-4"/>
                                        <p>{careerData.linkedin_url}</p>
                                    </button>
                                </CopyToClipboard>
                                <p className="text-novaCream font-medium text-sm">Personal Website: </p>
                                <CopyToClipboard text={careerData.portfolio_url}>
                                    <button type="button"
                                            className="flex items-center gap-2 cursor-pointer text-novaCream hover:text-novaAurora transition-colors">
                                        <Copy className="w-4 h-4"/>
                                        <span>{careerData.portfolio_url}</span>
                                    </button>
                                </CopyToClipboard>
                            </div>
                        </div>
                    </div>
                </div>

                {/*Job History Section*/}
                <div className="flex flex-col overflow-hidden rounded-b-2xl mb-4 bg-novaNavy px-4 pb-4">
                    <p className="font-bold text-lg pb-2">Career History</p>
                    <div className="flex flex-col gap-1 flex-1 overflow-y-auto">
                        {jobs.map((job) => (
                            <div key={job.id} className="flex flex-col px-4 py-4 bg-novaNavyShadow rounded-md gap-2 ">
                                <p className="text-novaCream font-medium text-xs">Company: </p>
                                <CopyToClipboard text={job.company_name}>
                                    <button type="button"
                                            className="flex items-center gap-2 cursor-pointer text-novaCream hover:text-novaAurora transition-colors">
                                        <Copy className="w-4 h-4"/>
                                        <p>{job.company_name}</p>
                                    </button>
                                </CopyToClipboard>
                                <p className="text-novaCream font-medium text-xs">Position: </p>
                                <CopyToClipboard text={job.job_title}>
                                    <button type="button"
                                            className="flex items-center gap-2 cursor-pointer text-novaCream hover:text-novaAurora transition-colors">
                                        <Copy className="w-4 h-4"/>
                                        <p>{job.job_title}</p>
                                    </button>
                                </CopyToClipboard>
                                <p className="text-novaCream font-medium text-xs">Start Date: </p>
                                <CopyToClipboard text={new Date(job.start_date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}>
                                    <button type="button"
                                            className="flex items-center gap-2 cursor-pointer text-novaCream hover:text-novaAurora transition-colors">
                                        <Copy className="w-4 h-4"/>
                                        <p>{new Date(job.start_date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}</p>
                                    </button>
                                </CopyToClipboard>
                                {job.end_date && (
                                    <>
                                        <p className="text-novaCream font-medium text-xs">End Date: </p>
                                        <CopyToClipboard text={new Date(job.end_date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}>
                                            <button type="button"
                                                    className="flex items-center gap-2 cursor-pointer text-novaCream hover:text-novaAurora transition-colors">
                                                <Copy className="w-4 h-4"/>
                                                <p>{new Date(job.end_date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}</p>
                                            </button>
                                        </CopyToClipboard>
                                    </>
                                )}
                                <p className="text-novaCream font-medium text-xs">Job Responsibilities (Hidden, Click To Copy ) </p>
                                <CopyToClipboard  text={job.description}>
                                    <button type="button"
                                            className="flex items-center gap-2 cursor-pointer text-novaCream hover:text-novaAurora transition-colors">
                                        <Copy className="w-4 h-4"/>
                                        <p>Click to Copy</p>
                                    </button>
                                </CopyToClipboard>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
    );
}