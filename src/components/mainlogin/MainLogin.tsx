import axios from 'axios'
import Cookies from 'js-cookie'
import './MainLogin.css'
import { useState } from 'react'
import AlertComponent from '../alertcomponent/AlertComponent'

function MainLogin() {
    const [showAlertComponent, setShowAlertComponent] = useState(false)
    const [messageAlertComponent, setMessageAlertComponent] =
        useState<string>('')
    const [typeAlertComponent, setTypeAlertComponent] = useState<
        'success' | 'error'
    >('success')
    const [onceSubmit, setOnceSubmit] = useState<boolean>(false)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const form = event.currentTarget as HTMLFormElement

        const email = (form[0] as HTMLInputElement).value.trim()
        const senha = (form[1] as HTMLInputElement).value.trim()
        const stayConnected = (form[2] as HTMLInputElement).checked

        if (!email || !senha) {
            setShowAlertComponent(true)
            setMessageAlertComponent('Email ou senha incorretos')
            setTypeAlertComponent('error')

            setTimeout(() => {
                setShowAlertComponent(false)
            }, 3000)
            return
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setShowAlertComponent(true)
            setMessageAlertComponent('Email ou senha incorretos')
            setTypeAlertComponent('error')

            setTimeout(() => {
                setShowAlertComponent(false)
            }, 3000)
            return
        }

        if (senha.length < 6) {
            setShowAlertComponent(true)
            setMessageAlertComponent('Email ou senha incorretos')
            setTypeAlertComponent('error')

            setTimeout(() => {
                setShowAlertComponent(false)
            }, 3000)
            return
        }

        if (onceSubmit) return
        setOnceSubmit(true)

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
                setOnceSubmit(false)
                Cookies.set('token', response.data.token, {
                    expires: response.data.stayConnected ? 7 : 1,
                })

                if (response.status === 200) {
                    window.location.href = '/dashboard'
                }
            })
            .catch((error) => {
                setOnceSubmit(false)

                if (
                    error.response?.status === 401 ||
                    error.response?.status === 404
                ) {
                    setShowAlertComponent(true)
                    setMessageAlertComponent('Email ou senha incorretos')
                    setTypeAlertComponent('error')

                    setTimeout(() => {
                        setShowAlertComponent(false)
                    }, 3000)
                } else {
                    setShowAlertComponent(true)
                    setMessageAlertComponent(
                        'Erro ao fazer login, tente novamente'
                    )
                    setTypeAlertComponent('error')

                    setTimeout(() => {
                        setShowAlertComponent(false)
                    }, 3000)
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

            <AlertComponent
                show={showAlertComponent}
                onHide={() => setShowAlertComponent(false)}
                message={messageAlertComponent}
                type={typeAlertComponent}
            />
        </main>
    )
}

export default MainLogin
