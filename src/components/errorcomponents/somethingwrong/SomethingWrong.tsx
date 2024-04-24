import './SomethingWrong.css'
import World from '../../../icons/World'
import { Link } from 'react-router-dom'

function SomethingWrong() {
    return (
        <div className="container-something-wrong">
            <section className="something-wrong-content">
                <World />
                <section>
                    <span className="something-wrong-code">500</span>
                    <h2>Algo deu errado</h2>
                    <Link className="link-something-wrong" to="/">
                        Voltar para a página inicial
                    </Link>
                </section>
            </section>
        </div>
    )
}

export default SomethingWrong
