import { useContext, useState } from 'react'
import Close from '../../icons/Close'
import MagnifyingGlass from '../../icons/MagnifyingGlass'
import './Header.css'
import { Link } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import Cookies from 'js-cookie'

function Header() {
    const [search, setSearch] = useState('')
    const { user, setUser } = useContext(UserContext)

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
                    <Link
                        to="/"
                        className="header-btn-logout"
                        onClick={() => {
                            Cookies.remove('token')

                            setUser({
                                _id: '',
                                nome: '',
                                senha: '',
                                email: '',
                                dataCriacao: new Date(),
                                curtidas: 0,
                                posts: 0,
                            })

                            window.location.href = '/'
                        }}
                    >
                        Sair
                    </Link>
                )}
            </div>
        </header>
    )
}

export default Header
