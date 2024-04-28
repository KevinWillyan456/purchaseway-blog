import axios from 'axios'
import Cookies from 'js-cookie'
import './MainSingIn.css'
import AlertComponent from '../alertcomponent/AlertComponent'
import { useState } from 'react'
import ContinueWithGoogle from '../continuewithgoogle/ContinueWithGoogle'
import { Form } from 'react-bootstrap'

const USER_NAME_MIN_LENGTH = 3
const USER_NAME_MAX_LENGTH = 100
const USER_PASSWORD_MIN_LENGTH = 6
const USER_PASSWORD_MAX_LENGTH = 100

function MainSingIn() {
    const [showSenha, setShowSenha] = useState<boolean>(false)

    const [showAlertComponent, setShowAlertComponent] = useState<boolean>(false)
    const [messageAlertComponent, setMessageAlertComponent] =
        useState<string>('')
    const [typeAlertComponent, setTypeAlertComponent] = useState<
        'success' | 'error'
    >('success')
    const [onceSubmit, setOnceSubmit] = useState<boolean>(false)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const form = event.currentTarget as HTMLFormElement

        const nome = (form[0] as HTMLInputElement).value.trim()
        const email = (form[1] as HTMLInputElement).value.trim()
        const senha = (form[2] as HTMLInputElement).value.trim()
        const stayConnected = (form[3] as HTMLInputElement).checked

        if (!nome || !email || !senha) {
            setShowAlertComponent(true)
            setMessageAlertComponent('Preencha todos os campos')
            setTypeAlertComponent('error')

            if (!nome) {
                document.getElementById('floatingName')?.focus()
            } else if (!email) {
                document.getElementById('floatingInput')?.focus()
            } else if (!senha) {
                document.getElementById('floatingPassword')?.focus()
            }

            setTimeout(() => {
                setShowAlertComponent(false)
            }, 3000)
            return
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setShowAlertComponent(true)
            setMessageAlertComponent('E-mail inválido')
            setTypeAlertComponent('error')
            document.getElementById('floatingInput')?.focus()

            setTimeout(() => {
                setShowAlertComponent(false)
            }, 3000)
            return
        }

        if (senha.length < USER_PASSWORD_MIN_LENGTH) {
            setShowAlertComponent(true)
            setMessageAlertComponent(
                `Senha deve ter no mínimo ${USER_PASSWORD_MIN_LENGTH} caracteres`
            )
            setTypeAlertComponent('error')
            document.getElementById('floatingPassword')?.focus()

            setTimeout(() => {
                setShowAlertComponent(false)
            }, 3000)
            return
        }

        if (senha.length > USER_PASSWORD_MAX_LENGTH) {
            setShowAlertComponent(true)
            setMessageAlertComponent(
                `Senha ultrapassou o limite de ${USER_PASSWORD_MAX_LENGTH} caracteres`
            )
            setTypeAlertComponent('error')
            document.getElementById('floatingPassword')?.focus()

            setTimeout(() => {
                setShowAlertComponent(false)
            }, 3000)
            return
        }

        if (nome.length < USER_NAME_MIN_LENGTH) {
            setShowAlertComponent(true)
            setMessageAlertComponent(
                `Nome deve ter no mínimo ${USER_NAME_MIN_LENGTH} caracteres`
            )
            setTypeAlertComponent('error')
            document.getElementById('floatingName')?.focus()

            setTimeout(() => {
                setShowAlertComponent(false)
            }, 3000)
            return
        }

        if (nome.length > USER_NAME_MAX_LENGTH) {
            setShowAlertComponent(true)
            setMessageAlertComponent(
                `Nome ultrapassou o limite de ${USER_NAME_MAX_LENGTH} caracteres`
            )
            setTypeAlertComponent('error')
            document.getElementById('floatingName')?.focus()

            setTimeout(() => {
                setShowAlertComponent(false)
            }, 3000)
            return
        }

        if (onceSubmit) return
        setOnceSubmit(true)

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
                if (error.response?.status === 409) {
                    setShowAlertComponent(true)
                    setMessageAlertComponent('E-mail já cadastrado')
                    setTypeAlertComponent('error')

                    setTimeout(() => {
                        setShowAlertComponent(false)
                    }, 3000)
                } else {
                    setShowAlertComponent(true)
                    setMessageAlertComponent(
                        'Erro ao criar conta, tente novamente'
                    )
                    setTypeAlertComponent('error')

                    setTimeout(() => {
                        setShowAlertComponent(false)
                    }, 3000)
                }
            })
            .finally(() => {
                setOnceSubmit(false)
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
                            type={showSenha ? 'text' : 'password'}
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            required
                        />
                        <label htmlFor="floatingPassword">Senha</label>
                    </div>

                    <Form.Switch
                        id="custom-switch1"
                        label="Mostrar senha"
                        className="mt-3"
                        onChange={() => setShowSenha((prev) => !prev)}
                    />

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
                    <button className="main-singin-button" type="submit">
                        Criar
                    </button>
                </form>
                <ContinueWithGoogle />
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

export default MainSingIn
