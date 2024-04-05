import { useContext, useEffect, useState } from 'react'
import './ContainerPosts.css'
import axios from 'axios'
import PostComponent from './postcomponent/PostComponent'
import { GlobalContext } from '../../contexts/GlobalContext'

function ContainerPosts() {
    const { posts, setPosts } = useContext(GlobalContext)
    const [emptyPosts, setEmptyPosts] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_API_URL + '/posts', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: import.meta.env.VITE_API_KEY,
                },
            })
            .then((response) => {
                setPosts(response.data.posts)

                if (response.data.posts.length === 0) {
                    setEmptyPosts(true)
                }
            })
            .catch(() => {
                setError(true)
            })
    }, [setPosts])

    useEffect(() => {
        posts.forEach((post) => {
            if (!post.proprietario.match(/(\w{8}(-\w{4}){3}-\w{12}?)/g)) return

            axios
                .get(
                    import.meta.env.VITE_API_URL +
                        '/users/' +
                        post.proprietario,
                    {
                        headers: {
                            'Content-Type': 'application/json',
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
                                    proprietarioId: response.data.user._id,
                                }
                            }
                            return prevPost
                        })
                    })
                })
        })

        posts.forEach((post) => {
            post.respostas.forEach((answer) => {
                if (answer.userName) return

                axios
                    .get(
                        import.meta.env.VITE_API_URL +
                            '/users/' +
                            answer.userId,
                        {
                            headers: {
                                'Content-Type': 'application/json',
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
                                                        userName:
                                                            response.data.user
                                                                .nome,
                                                    }
                                                }
                                                return prevAnswer
                                            }
                                        ),
                                    }
                                }
                                return prevPost
                            })
                        })
                    })
            })
        })
    }, [posts, setPosts])

    return (
        <section className="container-posts">
            {posts.length === 0 && !emptyPosts && !error ? (
                <div className="loading">Carregando...</div>
            ) : emptyPosts && !error && posts.length === 0 ? (
                <div className="empty-posts">Nenhuma postagem disponível</div>
            ) : error ? (
                <div className="error">Erro na comunicação com o servidor</div>
            ) : (
                <div className="content-posts">
                    <p className="recommendations">Recomendações para você</p>

                    {posts.map((post) => (
                        <PostComponent key={post._id} post={post} />
                    ))}
                </div>
            )}
        </section>
    )
}

export default ContainerPosts
