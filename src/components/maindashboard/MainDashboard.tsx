import "./MainDashboard.css";
import UserContent from "../usercontent/UserContent";
import UserPost from "../userpost/UserPost";
import ContainerPosts from "../containerposts/ContainerPosts";

function MainDashboard() {
    return (
        <main className="main-dashboard">
            <div className="main-dashboard-content">
                <div className="dashboard-header">
                    <UserContent />
                    <UserPost />
                </div>
                <ContainerPosts />
            </div>
        </main>
    );
}

export default MainDashboard;
