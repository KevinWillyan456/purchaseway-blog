import { useContext, useState } from 'react'
import './ModalChangePassword.css'
import { Form, Modal } from 'react-bootstrap'
import AlertComponent from '../../../../alertcomponent/AlertComponent'
import { GlobalContext } from '../../../../../contexts/GlobalContext'
import axios from 'axios'

interface IModalChangePasswordProps {
    show: boolean
    onHide: () => void
}

const USER_PASSWORD_MIN_LENGTH = 6
const USER_PASSWORD_MAX_LENGTH = 100

function ModalChangePassword(props: IModalChangePasswordProps) {
    const { user } = useContext(GlobalContext)

    const [senhaAtual, setSenhaAtual] = useState<string>('')
    const [showSenhaAtual, setShowSenhaAtual] = useState<boolean>(false)

    const [novaSenha, setNovaSenha] = useState<string>('')
    const [showNovaSenha, setShowNovaSenha] = useState<boolean>(false)

    const [confirmarNovaSenha, setConfirmarNovaSenha] = useState<string>('')
    const [showConfirmarNovaSenha, setShowConfirmarNovaSenha] =
        useState<boolean>(false)

    const [showAlertComponent, setShowAlertComponent] = useState(false)
    const [messageAlertComponent, setMessageAlertComponent] =
        useState<string>('')
    const [typeAlertComponent, setTypeAlertComponent] = useState<
        'success' | 'error'
    >('success')
    const [onceSubmit, setOnceSubmit] = useState<boolean>(false)

    const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (senhaAtual === '') {
            setShowAlertComponent(true)
            setMessageAlertComponent('Senha atual não pode ser vazio')
            setTypeAlertComponent('error')
            document.getElementById('exampleForm.ControlInput2')?.focus()

            setTimeout(() => {
                setShowAlertComponent(false)
            }, 3000)
            return
        }

        if (novaSenha === '') {
            setShowAlertComponent(true)
            setMessageAlertComponent('Nova senha não pode ser vazio')
            setTypeAlertComponent('error')
            document.getElementById('exampleForm.ControlInput3')?.focus()

            setTimeout(() => {
                setShowAlertComponent(false)
            }, 3000)
            return
        }

        if (confirmarNovaSenha === '') {
            setShowAlertComponent(true)
            setMessageAlertComponent('Confirmar nova senha não pode ser vazio')
            setTypeAlertComponent('error')
            document.getElementById('exampleForm.ControlInput4')?.focus()

            setTimeout(() => {
                setShowAlertComponent(false)
            }, 3000)
            return
        }

        if (novaSenha.length < USER_PASSWORD_MIN_LENGTH) {
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

        if (novaSenha.length > USER_PASSWORD_MAX_LENGTH) {
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

        if (novaSenha !== confirmarNovaSenha) {
            setShowAlertComponent(true)
            setMessageAlertComponent('As senhas não conferem')
            setTypeAlertComponent('error')
            document.getElementById('exampleForm.ControlInput4')?.focus()

            setTimeout(() => {
                setShowAlertComponent(false)
            }, 3000)
            return
        }

        if (novaSenha === senhaAtual) {
            setShowAlertComponent(true)
            setMessageAlertComponent(
                'A nova senha não pode ser igual a senha atual'
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
                { senha: senhaAtual, novaSenha, isGoogle: user.isGoogle },
                {
                    headers: {
                        Authorization: import.meta.env.VITE_API_KEY,
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then(() => {
                setShowAlertComponent(true)
                setMessageAlertComponent('Senha alterada com sucesso')
                setTypeAlertComponent('success')

                setSenhaAtual('')
                setNovaSenha('')
                setConfirmarNovaSenha('')

                setTimeout(() => {
                    setShowAlertComponent(false)
                }, 3000)
                props.onHide()
                setSenhaAtual('')
                setNovaSenha('')
                setConfirmarNovaSenha('')

                setShowSenhaAtual(false)
                setShowNovaSenha(false)
                setShowConfirmarNovaSenha(false)
            })
            .catch(() => {
                setShowAlertComponent(true)
                setMessageAlertComponent(
                    'Erro ao alterar senha, tente novamente'
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
                    setSenhaAtual('')
                    setNovaSenha('')
                    setConfirmarNovaSenha('')

                    setShowSenhaAtual(false)
                    setShowNovaSenha(false)
                    setShowConfirmarNovaSenha(false)
                }}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Form onSubmit={handleEdit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Mudar senha</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput2"
                        >
                            <Form.Label className="modal-change-password-label">
                                Senha atual
                            </Form.Label>
                            <Form.Control
                                type={showSenhaAtual ? 'text' : 'password'}
                                placeholder="Senha atual"
                                autoFocus
                                value={senhaAtual}
                                required
                                onChange={(e) => setSenhaAtual(e.target.value)}
                            />
                            <Form.Switch
                                id="custom-switch1"
                                label="Mostrar senha atual"
                                className="mt-2"
                                onChange={() =>
                                    setShowSenhaAtual((prev) => !prev)
                                }
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput3"
                        >
                            <Form.Label className="modal-change-password-label">
                                Nova senha
                            </Form.Label>
                            <Form.Control
                                type={showNovaSenha ? 'text' : 'password'}
                                placeholder="Nova senha"
                                value={novaSenha}
                                required
                                onChange={(e) => setNovaSenha(e.target.value)}
                            />
                            <Form.Switch
                                id="custom-switch2"
                                label="Mostrar nova senha"
                                className="mt-2"
                                onChange={() =>
                                    setShowNovaSenha((prev) => !prev)
                                }
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput4"
                        >
                            <Form.Label className="modal-change-password-label">
                                Confirmar nova senha
                            </Form.Label>
                            <Form.Control
                                type={
                                    showConfirmarNovaSenha ? 'text' : 'password'
                                }
                                placeholder="Confirmar nova senha"
                                value={confirmarNovaSenha}
                                required
                                onChange={(e) =>
                                    setConfirmarNovaSenha(e.target.value)
                                }
                            />
                            <Form.Switch
                                id="custom-switch3"
                                label="Mostrar confirmar nova senha"
                                className="mt-2"
                                onChange={() =>
                                    setShowConfirmarNovaSenha((prev) => !prev)
                                }
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            className="modal-edit-btn-close"
                            type="button"
                            onClick={() => {
                                props.onHide()
                                setSenhaAtual('')
                                setNovaSenha('')
                                setConfirmarNovaSenha('')

                                setShowSenhaAtual(false)
                                setShowNovaSenha(false)
                                setShowConfirmarNovaSenha(false)
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

export default ModalChangePassword
