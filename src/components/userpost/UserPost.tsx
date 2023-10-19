import "./UserPost.css";
import Photograph from "../../icons/Photograph";

function UserPost() {
    return (
        <article className="user-post-container">
            <textarea
                className="user-message"
                placeholder="No que está pensando?"
                maxLength={5000}
            ></textarea>
            <div className="user-post-footer">
                <div className="wrap">
                    <div className="attach-image">
                        <Photograph />
                    </div>
                    <input
                        type="text"
                        className="title-publish"
                        placeholder="Título da publicação"
                    />
                </div>
                <button className="btn-publish">Publicar</button>
            </div>
        </article>
    );
}

export default UserPost;
