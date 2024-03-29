import axios from 'axios'
import { useContext, useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import { UserContext } from '../../../../../contexts/UserContext'

const MAX_LENGTH_TEXT = 5000

function ModalEdit(props: {
    show: boolean
    onHide: () => void
    postId: string
    answerId: string
    text: string
}) {
    const { user } = useContext(UserContext)

    const [text, setText] = useState(props.text)

    const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
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
            .put(
                import.meta.env.VITE_API_URL +
                    '/posts/response/' +
                    props.postId +
                    '/' +
                    props.answerId +
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
                alert('Resposta editada com sucesso')
                props.onHide()
            })
            .catch(() => {
                alert('Erro ao editar resposta, tente novamente')
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
                <Form onSubmit={handleEdit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar resposta</Modal.Title>
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
                            className="modal-edit-btn-close"
                            onClick={props.onHide}
                            type="button"
                        >
                            Fechar
                        </button>
                        <button className="modal-edit-btn-edit" type="submit">
                            Salvar
                        </button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default ModalEdit
