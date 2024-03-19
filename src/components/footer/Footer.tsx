import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
    return (
        <footer className="footer">
            <Link to="/" className="footer-logo">
                <img src="/purchaseway-blog-logo-medium.png" alt="logo" />
            </Link>
            <div className="copyright">
                @ 2023 Purchaseway Blog - Todos os diretos reservados
            </div>
        </footer>
    )
}

export default Footer
