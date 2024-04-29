import axios from 'axios'
import { useState, useContext } from 'react'
import { Form, Modal } from 'react-bootstrap'
import { GlobalContext } from '../../../../contexts/GlobalContext'
import './ModalAnswer.css'
import AlertComponent from '../../../alertcomponent/AlertComponent'

const MAX_LENGTH_TEXT = 5000

interface IModalAnswerProps {
    show: boolean
    onHide: () => void
    postId: string
    setShowAnswers: (value: boolean) => void
}

function ModalAnswer(props: IModalAnswerProps) {
    const [text, setText] = useState<string>('')
    const { user, updatePosts, updateUserPosts, updateUserInfo } =
        useContext(GlobalContext)

    const [showAlertComponent, setShowAlertComponent] = useState(false)
    const [messageAlertComponent, setMessageAlertComponent] =
        useState<string>('')
    const [typeAlertComponent, setTypeAlertComponent] = useState<
        'success' | 'error'
    >('success')
    const [onceSubmit, setOnceSubmit] = useState<boolean>(false)

    const handleAnswer = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!text.replace(/\s/g, '').length) {
            setShowAlertComponent(true)
            setMessageAlertComponent(
                'O conteúdo da resposta não pode ser vazio'
            )
            setTypeAlertComponent('error')

            document.getElementById('exampleForm.ControlTextarea1')?.focus()

            setTimeout(() => {
                setShowAlertComponent(false)
            }, 3000)

            return
        }

        if (text.length > MAX_LENGTH_TEXT) {
            setShowAlertComponent(true)
            setMessageAlertComponent(
                'O texto da resposta ultrapassou o limite de caracteres'
            )
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
                import.meta.env.VITE_API_URL +
                    '/posts/response/' +
                    props.postId +
                    '/' +
                    user._id,
                {
                    text,
                },
                {
                    headers: {
                        Authorization: import.meta.env.VITE_API_KEY,
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then(() => {
                setText('')
                props.onHide()

                setShowAlertComponent(true)
                setMessageAlertComponent('Resposta enviada com sucesso')
                setTypeAlertComponent('success')
                updatePosts()
                updateUserPosts()
                updateUserInfo()
                props.setShowAnswers(true)

                setTimeout(() => {
                    setShowAlertComponent(false)
                }, 3000)
            })
            .catch(() => {
                setShowAlertComponent(true)
                setMessageAlertComponent(
                    'Erro ao responder a postagem, tente novamente'
                )
                setTypeAlertComponent('error')

                setTimeout(() => {
                    setShowAlertComponent(false)
                }, 3000)

                props.onHide()
            })
            .finally(() => {
                setOnceSubmit(false)
            })
    }

    return (
        <>
            <Modal
                show={props.show}
                onHide={props.onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Form onSubmit={handleAnswer}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Responder postagem
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Conteúdo da resposta</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={text}
                                style={{ resize: 'none' }}
                                maxLength={5000}
                                required
                                autoFocus
                                onChange={(e) => setText(e.target.value)}
                                rows={5}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            className="modal-answer-btn-close"
                            type="button"
                            onClick={props.onHide}
                        >
                            Fechar
                        </button>
                        <button
                            className="modal-answer-btn-submit"
                            type="submit"
                        >
                            Enviar
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

export default ModalAnswer
