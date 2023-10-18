import { useState } from "react";
import Close from "../../icons/Close";
import MagnifyingGlass from "../../icons/magnifyingGlass";
import "./Header.css";

function Header() {
    const [search, setSearch] = useState("");

    return (
        <header className="header">
            <div className="content">
                <div className="header-logo">
                    <img src="/purchaseway-blog-logo.png" alt="logo" />
                </div>
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
                        className={!search ? "hidden" : ""}
                        onclick={() => {
                            setSearch("");
                        }}
                    />
                </div>
                <button className="header-btn-register">Cadastrar-se</button>
                <button className="header-btn-login">Entrar</button>
            </div>
        </header>
    );
}

export default Header;
