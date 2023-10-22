import "./MainDashboard.css";
import UserContent from "../userContent/UserContent";
import UserPost from "../userPost/UserPost";
import ContainerPosts from "../containerPosts/ContainerPosts";

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
