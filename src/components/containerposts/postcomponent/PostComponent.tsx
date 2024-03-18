import { useState } from "react";
import Like from "../../../icons/Like";
import User from "../../../icons/User";
import { IPost } from "../ContainerPosts";
import AnswersComponent from "../answerscomponent/AnswersComponent";
import "./PostComponent.css";

function PostComponent({ post }: { post: IPost }) {
    const [showAnswers, setShowAnswers] = useState(false);

    const handleToggleAnswers = () => {
        setShowAnswers((prev) => !prev);
    };

    return (
        <article className="user-posted">
            <div className="user-picture-posts">
                <User />
            </div>
            <div className="wrapper">
                <div className="name-wrapper">
                    <div className="name">
                        {post.proprietario.match(/(\w{8}(-\w{4}){3}-\w{12}?)/g)
                            ? "Carregando..."
                            : post.proprietario}
                    </div>
                    <div className="posted-in">
                        {new Date(post.dataCriacao).toLocaleDateString(
                            "pt-BR",
                            {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                            }
                        )}
                    </div>
                </div>
                <div className="title-post">{post.conteudo.title}</div>
                <div className="content-post">
                    {post.conteudo.text}
                    {post.conteudo.urlImg && (
                        <img
                            style={{
                                width: "100%",
                                marginTop: "20px",
                                borderRadius: "10px",
                            }}
                            src={post.conteudo.urlImg}
                        />
                    )}
                </div>
                <div className="actions-post">
                    <div className="actions-wrapper">
                        <div className="like-btn-wrapper">
                            <button className="like-btn">
                                <Like />
                            </button>
                            <div className="count-like-post">
                                {post.curtidas.length}
                            </div>
                        </div>
                        <button className="btn-respond">Responder</button>
                    </div>
                    {post.respostas.length > 0 && (
                        <button
                            className="answers"
                            onClick={handleToggleAnswers}
                        >
                            Respostas
                            <div className="answers-count">
                                {post.respostas.length}
                            </div>
                        </button>
                    )}

                    {showAnswers && (
                        <>
                            {post.respostas.map((answer) => (
                                <AnswersComponent
                                    key={answer._id}
                                    answer={answer}
                                />
                            ))}
                        </>
                    )}
                </div>
            </div>
        </article>
    );
}

export default PostComponent;
