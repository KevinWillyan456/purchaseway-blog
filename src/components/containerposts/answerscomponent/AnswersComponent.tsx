import Like from "../../../icons/Like";
import User from "../../../icons/User";
import { IAnswer } from "../ContainerPosts";
import "./AnswersComponent.css";

function AnswersComponent({ answer }: { answer: IAnswer }) {
    return (
        <article className="user-posted-answering">
            <div className="user-picture-posts">
                <User />
            </div>
            <div className="wrapper">
                <div className="name-wrapper">
                    <div className="name">
                        {answer.userId.match(/(\w{8}(-\w{4}){3}-\w{12}?)/g)
                            ? "Carregando..."
                            : answer.userId}
                    </div>
                    <div className="posted-in">
                        {new Date(answer.dataCriacao).toLocaleDateString(
                            "pt-BR",
                            {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                            }
                        )}
                    </div>
                </div>
                <div className="content-post">{answer.text}</div>
                <div className="actions-post">
                    <div className="actions-wrapper">
                        <button className="like-btn">
                            <Like />
                        </button>
                        <div className="count-like-post">
                            {answer.curtidas.length}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default AnswersComponent;
