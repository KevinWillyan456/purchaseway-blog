import { useContext, useEffect } from 'react'
import './ContainerPosts.css'
import axios from 'axios'
import PostComponent from './postcomponent/PostComponent'
import { GlobalContext } from '../../contexts/GlobalContext'

function ContainerPosts() {
    const { posts, setPosts, emptyPosts, setEmptyPosts, error, setError } =
        useContext(GlobalContext)

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_API_URL + '/posts', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: import.meta.env.VITE_API_KEY,
                },
            })
            .then((response) => {
                if (response.data.posts.length === 0) {
                    setEmptyPosts(true)
                } else {
                    setPosts(response.data.posts)
                }
            })
            .catch(() => {
                setError(true)
            })
    }, [setEmptyPosts, setError, setPosts])

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
