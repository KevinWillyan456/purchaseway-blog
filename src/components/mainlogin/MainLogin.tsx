import axios from 'axios'
import Cookies from 'js-cookie'
import './MainLogin.css'

function MainLogin() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget as HTMLFormElement

        const email = (form[0] as HTMLInputElement).value.trim()
        const senha = (form[1] as HTMLInputElement).value.trim()
        const stayConnected = (form[2] as HTMLInputElement).checked

        if (!email || !senha) {
            alert('Preencha todos os campos')
            return
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Email ou senha incorretos')
            return
        }

        if (senha.length < 6) {
            alert('Email ou senha incorretos')
            return
        }

        axios
            .post(
                import.meta.env.VITE_API_URL + '/login',
                {
                    email,
                    senha,
                    stayConnected,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: import.meta.env.VITE_API_KEY,
                    },
                }
            )
            .then((response) => {
                Cookies.set('token', response.data.token, {
                    expires: response.data.stayConnected ? 7 : 1,
                })

                if (response.status === 200) {
                    window.location.href = '/dashboard'
                }
            })
            .catch((error) => {
                if (
                    error.response?.status === 401 ||
                    error.response?.status === 404
                ) {
                    alert('Email ou senha incorretos')
                } else {
                    alert('Erro ao fazer login')
                }
            })
    }

    return (
        <main className="d-flex align-items-center bg-body-tertiary main-singin">
            <section className="form-login w-100 m-auto">
                <form onSubmit={handleSubmit}>
                    <div className="main-singin-logo">
                        <img
                            src="/purchaseway-blog-favicon-medium.png"
                            alt="logo"
                        />
                    </div>
                    <h1 className="h3 mb-3 fw-normal main-singin-create-account">
                        Faça login na sua conta
                    </h1>

                    <div className="form-floating">
                        <input
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            required
                        />
                        <label htmlFor="floatingInput">E-mail</label>
                    </div>
                    <div className="form-floating">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            required
                        />
                        <label htmlFor="floatingPassword">Senha</label>
                    </div>

                    <div className="form-check text-start my-3">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value="remember-me"
                            id="flexCheckDefault"
                        />
                        <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                        >
                            Lembre de mim
                        </label>
                    </div>
                    <button
                        className="btn btn-primary w-100 py-2"
                        type="submit"
                    >
                        Entrar
                    </button>
                </form>
            </section>
        </main>
    )
}

export default MainLogin
