import './NotFound.css'
import World from '../../../icons/World'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className="container-not-found">
            <section className="not-found-content">
                <div className="world-container">
                    <World />
                </div>

                <section>
                    <span className="not-found-code">404</span>
                    <h2>Página não encontrada</h2>
                    <Link className="link-not-found" to="/">
                        Voltar para a página inicial
                    </Link>
                </section>
            </section>
        </div>
    )
}

export default NotFound
