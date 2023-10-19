import "./UserContent.css";
import User from "../../icons/User";
import Pencil from "../../icons/Pencil";

function UserContent() {
    return (
        <article className="user-container">
            <div className="user-picture">
                <User />
                <div className="pencil-container">
                    <Pencil />
                </div>
            </div>
            <div className="user-name">Joe Dawn</div>

            <div className="user-posts-text">Post</div>
            <div className="user-posts">10</div>
            <div className="user-likes-text">Likes</div>
            <div className="user-likes">10</div>
        </article>
    );
}

export default UserContent;
