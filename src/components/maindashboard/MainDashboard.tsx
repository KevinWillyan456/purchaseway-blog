import "./MainDashboard.css";
import UserContent from "../usercontent/UserContent";
import UserPost from "../userpost/UserPost";

function MainDashboard() {
    return (
        <main className="main-dashboard">
            <div className="main-dashboard-content">
                <UserContent />
                <UserPost />
            </div>
        </main>
    );
}

export default MainDashboard;
