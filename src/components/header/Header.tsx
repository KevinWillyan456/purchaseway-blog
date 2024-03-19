import { useState } from 'react'
import Close from '../../icons/Close'
import MagnifyingGlass from '../../icons/MagnifyingGlass'
import './Header.css'
import { Link } from 'react-router-dom'

function Header() {
    const [search, setSearch] = useState('')

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
                <Link to="/singin" className="header-btn-register">
                    Cadastrar-se
                </Link>
                <Link to="/login" className="header-btn-login">
                    Entrar
                </Link>
            </div>
        </header>
    )
}

export default Header
