import { useContext, useEffect } from 'react'
import axios from 'axios'
import PostComponent from '../../containerposts/postcomponent/PostComponent'
import Cookies from 'js-cookie'
import { GlobalContext } from '../../../contexts/GlobalContext'

function ContainerUserPosts() {
    const {
        userPosts,
        setUserPosts,
        emptyUserPosts,
        setEmptyUserPosts,
        errorUserPosts,
        setErrorUserPosts,
    } = useContext(GlobalContext)

    useEffect(() => {
        const token = Cookies.get('token')

        axios
            .get(import.meta.env.VITE_API_URL + '/get-user-posts', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: import.meta.env.VITE_API_KEY,
                    token,
                },
            })
            .then((response) => {
                if (response.data.length === 0) {
                    setEmptyUserPosts(true)
                } else {
                    setUserPosts(response.data.posts)
                }
            })
            .catch(() => {
                setErrorUserPosts(true)
            })
    }, [setEmptyUserPosts, setErrorUserPosts, setUserPosts])

    return (
        <section className="container-posts">
            {userPosts.length === 0 && !emptyUserPosts && !errorUserPosts ? (
                <div className="loading">Carregando...</div>
            ) : emptyUserPosts && !errorUserPosts && userPosts.length === 0 ? (
                <div className="empty-posts">
                    Você ainda não criou nenhuma postagem
                </div>
            ) : errorUserPosts ? (
                <div className="error">Erro na comunicação com o servidor</div>
            ) : (
                <div className="content-posts">
                    <p className="recommendations">
                        Confira as postagens criadas por você
                    </p>

                    {userPosts.map((post) => (
                        <PostComponent key={post._id} post={post} />
                    ))}
                </div>
            )}
        </section>
    )
}

export default ContainerUserPosts
