import axios from 'axios'
import Cookies from 'js-cookie'
import './MainSingIn.css'

function MainSingIn() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget as HTMLFormElement

        const nome = (form[0] as HTMLInputElement).value.trim()
        const email = (form[1] as HTMLInputElement).value.trim()
        const senha = (form[2] as HTMLInputElement).value.trim()
        const stayConnected = (form[3] as HTMLInputElement).checked

        if (!nome || !email || !senha) {
            alert('Preencha todos os campos')
            return
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('E-mail inválido')
            return
        }

        if (senha.length < 6) {
            alert('Senha deve ter no mínimo 6 caracteres')
            return
        }

        if (nome.length < 3) {
            alert('Nome deve ter no mínimo 3 caracteres')
            return
        }

        axios
            .post(
                import.meta.env.VITE_API_URL + '/users',
                {
                    nome,
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

                if (response.status === 201) {
                    window.location.href = '/dashboard'
                }
            })
            .catch((error) => {
                if (error.response.status === 409) {
                    alert('E-mail já cadastrado')
                }
            })
    }

    return (
        <main className="d-flex align-items-center bg-body-tertiary main-singin">
            <section className="form-signin w-100 m-auto">
                <form onSubmit={handleSubmit}>
                    <div className="main-singin-logo">
                        <img
                            src="/purchaseway-blog-favicon-medium.png"
                            alt="logo"
                        />
                    </div>
                    <h1 className="h3 mb-3 fw-normal main-singin-create-account">
                        Crie sua conta
                    </h1>

                    <div className="form-floating">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingName"
                            placeholder="name@example.com"
                            required
                        />
                        <label htmlFor="floatingName">Nome</label>
                    </div>
                    <div className="form-floating">
                        <input
                            type="email"
                            className="form-control email-input"
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
                        Criar
                    </button>
                </form>
            </section>
        </main>
    )
}

export default MainSingIn
