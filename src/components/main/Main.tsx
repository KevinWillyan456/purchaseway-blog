import { Link } from 'react-router-dom'
import AddUser from '../../icons/AddUser'
import Publish from '../../icons/Publish'
import Share from '../../icons/Share'
import World from '../../icons/World'
import './Main.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Main() {
    const [someNumbers, setSomeNumbers] = useState<{
        users: number | string
        posts: number | string
    }>({
        users: '--',
        posts: '--',
    })

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_API_URL + '/some-numbers', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: import.meta.env.VITE_API_KEY,
                },
            })
            .then((response) => {
                setSomeNumbers({
                    users: response.data.users,
                    posts: response.data.posts,
                })
            })
    }, [])

    return (
        <section className="main">
            <div className="container">
                <div className="content-banner">
                    <div className="conversion">
                        <div className="title">
                            Conheça uma comunidade baseada em postagens
                        </div>
                        <Link to="/singin" className="btn-register">
                            Cadastrar-se
                        </Link>
                    </div>
                    <div>
                        <World />
                    </div>
                </div>
                <div className="title-characteristics">
                    Principais características de nosso sistema
                </div>
                <div className="cards">
                    <div className="card-characteristics">
                        <Share />
                        <p className="feature">Compartilhe</p>
                    </div>
                    <div className="card-characteristics">
                        <AddUser />
                        <p className="feature">Interaja</p>
                    </div>
                    <div className="card-characteristics">
                        <Publish />
                        <p className="feature">Poste</p>
                    </div>
                </div>
                <div className="title-characteristics">
                    Alguns de números de nosso sistema
                </div>
                <div className="cards-numbers">
                    <div className="card-numbers">
                        <p className="number">
                            {someNumbers.users.toLocaleString('pt-BR')}
                        </p>
                        <p className="feature">Usuários</p>
                    </div>
                    <div className="card-numbers">
                        <p className="number">
                            {someNumbers.posts.toLocaleString('pt-BR')}
                        </p>
                        <p className="feature">Postagens</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Main
