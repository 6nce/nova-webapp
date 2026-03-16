import AddJobHistoryModule from "../components/AddJobHistoryModule.jsx";
import CareerInfoInputModule from "../components/CareerInfoInputModule.jsx";
import CandidateSummaryModule from "../components/CandidateSummaryModule.jsx";

export default function ProfilePage() {
    return (
        <div className="profile-page h-full flex flex-row items-end">
            <AddJobHistoryModule/>
            <CareerInfoInputModule/>
            <CandidateSummaryModule/>
        </div>
    );
}