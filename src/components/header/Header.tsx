import { useCallback, useContext, useEffect, useState } from 'react'
import Close from '../../icons/Close'
import MagnifyingGlass from '../../icons/MagnifyingGlass'
import './Header.css'
import { Link } from 'react-router-dom'
import { GlobalContext, IPost } from '../../contexts/GlobalContext'
import Cookies from 'js-cookie'
import User from '../../icons/User'
import ModalSearchPost from './modalsearchpost/ModalSearchPost'
import axios from 'axios'

function Header() {
    const [search, setSearch] = useState('')
    const { user, setUser, posts } = useContext(GlobalContext)
    const [showModalSearchPost, setShowModalSearchPost] =
        useState<boolean>(false)
    const [searchPosts, setSearchPosts] = useState<IPost[]>([])
    const [selectedPost, setSelectedPost] = useState<IPost>({} as IPost)

    const handleSearch = useCallback(() => {
        if (!search) return

        const postsFiltered = posts.filter((post) => {
            return (
                post.conteudo.title
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                post.conteudo.text.toLowerCase().includes(search.toLowerCase())
            )
        })

        setSearchPosts(postsFiltered)
    }, [posts, search])

    useEffect(() => {
        handleSearch()
    }, [handleSearch, search])

    const logout = async () => {
        setUser({
            _id: '',
            nome: '',
            fotoPerfil: '',
            hasGooglePassword: false,
            isGoogle: false,
            email: '',
            dataCriacao: new Date(),
            curtidas: 0,
            posts: 0,
        })

        await axios
            .post(
                `${import.meta.env.VITE_API_URL}/logout`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: import.meta.env.VITE_API_KEY,
                        token: Cookies.get('token'),
                    },
                }
            )
            .catch((error) => {
                console.error(error)
            })
            .finally(() => {
                Cookies.remove('token')
                Cookies.remove('user')
                window.location.href = '/'
            })
    }

    return (
        <header className="header">
            <div className="container">
                <Link to="/" className="header-logo">
                    <img src="/purchaseway-blog-logo.png" alt="logo" />
                </Link>
                <div className="header-container-search">
                    <div className="header-search-icon">
                        <MagnifyingGlass />
                    </div>
                    <input
                        type="text"
                        placeholder="Pesquise por algo interessante..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Close
                        className={!search ? 'hidden' : ''}
                        onclick={() => {
                            setSearch('')
                        }}
                    />
                </div>
                {!user._id ? (
                    <>
                        <Link to="/singin" className="header-btn-register">
                            Cadastrar-se
                        </Link>
                        <Link to="/login" className="header-btn-login">
                            Entrar
                        </Link>
                    </>
                ) : (
                    <button className="header-btn-logout" onClick={logout}>
                        Sair
                    </button>
                )}
            </div>

            {search && (
                <section
                    className="container-search"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setSearch('')
                        }
                    }}
                >
                    <section className="container-search-post">
                        {!user._id ? (
                            <div className="search-empty-post">
                                Faça login para pesquisar postagens
                            </div>
                        ) : searchPosts.length === 0 ? (
                            <div className="search-empty-post">
                                Nenhuma postagem encontrada
                            </div>
                        ) : (
                            searchPosts.map((post, index) => (
                                <div
                                    key={index}
                                    className="post-item"
                                    onClick={() => {
                                        setSelectedPost(post)
                                        setShowModalSearchPost(true)
                                    }}
                                >
                                    <div className="user-picture-search-post">
                                        {post.fotoPerfil ? (
                                            <img
                                                src={post.fotoPerfil}
                                                alt="Foto de perfil"
                                            />
                                        ) : (
                                            <User />
                                        )}
                                    </div>
                                    <div className="user-content-search-post">
                                        <div className="title">
                                            {post.conteudo.title}
                                        </div>
                                        <div className="text">
                                            {post.conteudo.text}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </section>
                </section>
            )}

            <ModalSearchPost
                show={showModalSearchPost}
                onHide={() => setShowModalSearchPost(false)}
                selectedPost={selectedPost}
            />
        </header>
    )
}

export default Header
