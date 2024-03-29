import axios from 'axios'
import { useState, useContext } from 'react'
import { Form, Modal } from 'react-bootstrap'
import { UserContext } from '../../../../contexts/UserContext'
import './ModalAnswer.css'

const MAX_LENGTH_TEXT = 5000

function ModalAnswer(props: {
    show: boolean
    onHide: () => void
    postId: string
}) {
    const [text, setText] = useState<string>('')
    const { user } = useContext(UserContext)

    const handleAnswer = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!text.replace(/\s/g, '').length) {
            alert('O conteúdo da resposta não pode ser vazio')
            return
        }

        if (text.length > MAX_LENGTH_TEXT) {
            alert('O texto da resposta ultrapassou o limite de caracteres')
            return
        }

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
                alert('Resposta enviada com sucesso')
            })
            .catch(() => {
                alert('Erro ao responder a postagem, tente novamente')
            })
    }

    return (
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
                    <button className="modal-answer-btn-submit" type="submit">
                        Enviar
                    </button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default ModalAnswer
