import { useEffect, useState } from "react";
import "./ContainerPosts.css";
import axios from "axios";
import PostComponent from "./postcomponent/PostComponent";

export interface IPost {
    _id: string;
    conteudo: { text: string; urlImg: string; title: string };
    respostas: IAnswer[];
    proprietario: string;
    curtidas: string[];
    dataCriacao: Date;
}

export interface IAnswer {
    _id: string;
    userId: string;
    text: string;
    curtidas: string[];
    dataCriacao: Date;
}

function ContainerPosts() {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [emptyPosts, setEmptyPosts] = useState<boolean>(false);

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

                if (response.data.posts.length === 0) {
                    setEmptyPosts(true);
                }
            });
    }, []);

    useEffect(() => {
        posts.forEach((post) => {
            if (!post.proprietario.match(/(\w{8}(-\w{4}){3}-\w{12}?)/g)) return;

            axios
                .get(
                    import.meta.env.VITE_API_URL +
                        "/users/" +
                        post.proprietario,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: import.meta.env.VITE_API_KEY,
                        },
                    }
                )
                .then((response) => {
                    setPosts((prevPosts) => {
                        return prevPosts.map((prevPost) => {
                            if (prevPost._id === post._id) {
                                return {
                                    ...prevPost,
                                    proprietario: response.data.user.nome,
                                };
                            }
                            return prevPost;
                        });
                    });
                });
        });

        posts.forEach((post) => {
            post.respostas.forEach((answer) => {
                if (!answer.userId.match(/(\w{8}(-\w{4}){3}-\w{12}?)/g)) return;

                axios
                    .get(
                        import.meta.env.VITE_API_URL +
                            "/users/" +
                            answer.userId,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: import.meta.env.VITE_API_KEY,
                            },
                        }
                    )
                    .then((response) => {
                        setPosts((prevPosts) => {
                            return prevPosts.map((prevPost) => {
                                if (prevPost._id === post._id) {
                                    return {
                                        ...prevPost,
                                        respostas: prevPost.respostas.map(
                                            (prevAnswer) => {
                                                if (
                                                    prevAnswer._id ===
                                                    answer._id
                                                ) {
                                                    return {
                                                        ...prevAnswer,
                                                        userId: response.data
                                                            .user.nome,
                                                    };
                                                }
                                                return prevAnswer;
                                            }
                                        ),
                                    };
                                }
                                return prevPost;
                            });
                        });
                    });
            });
        });
    }, [posts]);

    return (
        <section className="container-posts">
            {posts.length === 0 ? (
                <div className="loading">Carregando...</div>
            ) : emptyPosts ? (
                <div className="empty-posts">Nenhuma postagem disponível</div>
            ) : (
                <div className="content-posts">
                    <p className="recommendations">Recomendações para você</p>

                    {posts.map((post) => (
                        <PostComponent key={post._id} post={post} />
                    ))}
                </div>
            )}
        </section>
    );
}

export default ContainerPosts;
