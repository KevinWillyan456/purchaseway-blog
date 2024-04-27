import { useContext, useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import AlertComponent from '../../../../alertcomponent/AlertComponent'
import { GlobalContext } from '../../../../../contexts/GlobalContext'
import axios from 'axios'

interface IModalCreateGooglePasswordProps {
    show: boolean
    onHide: () => void
}

const USER_PASSWORD_MIN_LENGTH = 6
const USER_PASSWORD_MAX_LENGTH = 100

function ModalCreateGooglePassword(props: IModalCreateGooglePasswordProps) {
    const { user, updateUserData } = useContext(GlobalContext)

    const [senha, setSenha] = useState<string>('')
    const [showSenha, setShowSenha] = useState<boolean>(false)

    const [showAlertComponent, setShowAlertComponent] = useState(false)
    const [messageAlertComponent, setMessageAlertComponent] =
        useState<string>('')
    const [typeAlertComponent, setTypeAlertComponent] = useState<
        'success' | 'error'
    >('success')
    const [onceSubmit, setOnceSubmit] = useState<boolean>(false)

    const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (senha === '') {
            setShowAlertComponent(true)
            setMessageAlertComponent('Senha não pode ser vazio')
            setTypeAlertComponent('error')
            document.getElementById('exampleForm.ControlInput2')?.focus()

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
            document.getElementById('exampleForm.ControlInput3')?.focus()

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
            document.getElementById('exampleForm.ControlInput3')?.focus()

            setTimeout(() => {
                setShowAlertComponent(false)
            }, 3000)
            return
        }

        if (onceSubmit) return
        setOnceSubmit(true)

        axios
            .put(
                import.meta.env.VITE_API_URL + '/users/' + user._id,
                { senha },
                {
                    headers: {
                        Authorization: import.meta.env.VITE_API_KEY,
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then(() => {
                setShowAlertComponent(true)
                setMessageAlertComponent('Senha adicionada com sucesso')
                setTypeAlertComponent('success')

                setSenha('')
                setShowSenha(false)
                updateUserData()
                props.onHide()

                setTimeout(() => {
                    setShowAlertComponent(false)
                }, 3000)
            })
            .catch(() => {
                setShowAlertComponent(true)
                setMessageAlertComponent(
                    'Erro ao adicionar senha, tente novamente'
                )
                setTypeAlertComponent('error')

                setTimeout(() => {
                    setShowAlertComponent(false)
                }, 3000)
            })
            .finally(() => setOnceSubmit(false))
    }

    return (
        <>
            <Modal
                show={props.show}
                onHide={() => {
                    props.onHide()
                    setSenha('')
                    setShowSenha(false)
                }}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Form onSubmit={handleEdit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Crie sua senha</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            Crie uma senha para sua conta para poder acessar o
                            sistema sem precisar da sua conta do Google toda
                            vez. Podendo assim fazer login com seu email e senha
                        </p>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput2"
                        >
                            <Form.Label className="modal-change-password-label">
                                Senha
                            </Form.Label>
                            <Form.Control
                                type={showSenha ? 'text' : 'password'}
                                placeholder="Senha"
                                autoFocus
                                value={senha}
                                required
                                onChange={(e) => setSenha(e.target.value)}
                            />
                            <Form.Switch
                                id="custom-switch1"
                                label="Mostrar senha"
                                className="mt-2"
                                onChange={() => setShowSenha((prev) => !prev)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            className="modal-edit-btn-close"
                            type="button"
                            onClick={() => {
                                props.onHide()
                                setSenha('')
                                setShowSenha(false)
                            }}
                        >
                            Fechar
                        </button>
                        <button className="modal-edit-btn-edit" type="submit">
                            Salvar
                        </button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <AlertComponent
                show={showAlertComponent}
                onHide={() => setShowAlertComponent(false)}
                message={messageAlertComponent}
                type={typeAlertComponent}
            />
        </>
    )
}

export default ModalCreateGooglePassword
