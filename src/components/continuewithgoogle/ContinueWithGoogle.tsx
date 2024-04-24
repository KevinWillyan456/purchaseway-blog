import axios from 'axios'
import { IGoogleLogin } from '../../contexts/GlobalContext'
import AlertComponent from '../alertcomponent/AlertComponent'
import { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'

function ContinueWithGoogle() {
    const [showAlertComponent, setShowAlertComponent] = useState<boolean>(false)
    const [messageAlertComponent, setMessageAlertComponent] =
        useState<string>('')
    const [typeAlertComponent, setTypeAlertComponent] = useState<
        'success' | 'error'
    >('success')
    const [onceSubmit, setOnceSubmit] = useState<boolean>(false)

    const handleGoogleMethod = (data: IGoogleLogin) => {
        if (onceSubmit) return
        setOnceSubmit(true)

        const pictureFormatted = data.picture.replace('s96-c', 's400-c')

        axios
            .post(
                import.meta.env.VITE_API_URL + '/users',
                {
                    nome: data.name,
                    email: data.email,
                    senha: data.sub,
                    picture: pictureFormatted,
                    stayConnected: true,
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
                    axios
                        .post(
                            import.meta.env.VITE_API_URL + '/login',
                            {
                                email: data.email,
                                senha: data.sub,
                                stayConnected: true,
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
                                setShowAlertComponent(true)
                                setMessageAlertComponent(
                                    'Email ou senha incorretos'
                                )
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
        <>
            <GoogleLogin
                onSuccess={(credentialResponse) => {
                    const decoded = jwtDecode(
                        credentialResponse?.credential as string
                    )

                    handleGoogleMethod(decoded as IGoogleLogin)
                }}
                onError={() => {
                    setShowAlertComponent(true)
                    setMessageAlertComponent(
                        'Erro ao fazer login com o Google, tente novamente'
                    )
                    setTypeAlertComponent('error')

                    setTimeout(() => {
                        setShowAlertComponent(false)
                    }, 3000)
                }}
                size="large"
                text="continue_with"
                shape="circle"
                logo_alignment="center"
                width={300}
            />
            <AlertComponent
                show={showAlertComponent}
                onHide={() => setShowAlertComponent(false)}
                message={messageAlertComponent}
                type={typeAlertComponent}
            />
        </>
    )
}

export default ContinueWithGoogle
