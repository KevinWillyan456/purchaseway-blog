import Like from "../../icons/Like";
import User from "../../icons/User";
import { useEffect, useState } from "react";
import "./ContainerPosts.css";
import axios from "axios";

export interface IPost {
    _id: string;
    conteudo: { text: string; urlImg: string };
    respostas: Array<{
        _id: string;
        userId: string;
        text: string;
        dataCriacao: Date;
    }>;
    proprietario: string;
    curtidas: number;
    dataCriacao: Date;
}

function ContainerPosts() {
    const [posts, setPosts] = useState<IPost[]>([]);

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_API_URL + "/posts", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: import.meta.env.VITE_API_KEY,
                },
            })
            .then((response) => {
                setPosts(response.data.posts);
            });
    }, []);

    return (
        <section className="container-posts">
            <div className="content-posts">
                <p className="recommendations">Recomendações para você</p>

                {posts.map((post) => (
                    <article className="user-posted" key={post._id}>
                        <div className="user-picture-posts">
                            <User />
                        </div>
                        <div className="wrapper">
                            <div className="name-wrapper">
                                <div className="name">Joe Dawn</div>
                                <div className="posted-in">há 2 horas</div>
                            </div>
                            <div className="title-post">Título do post</div>
                            <div className="content-post">
                                {post.conteudo.text}
                            </div>
                            <div className="actions-post">
                                <div className="actions-wrapper">
                                    <div className="like-btn-wrapper">
                                        <button className="like-btn">
                                            <Like />
                                        </button>
                                        <div className="count-like-post">
                                            {post.curtidas}
                                        </div>
                                    </div>
                                    <button className="btn-respond">
                                        Responder
                                    </button>
                                </div>
                                <button className="answers">
                                    Respostas
                                    <div className="answers-count">
                                        {post.respostas.length}
                                    </div>
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default ContainerPosts;
