import axios from 'axios'
import { useContext, useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import { GlobalContext } from '../../../../../contexts/GlobalContext'
import AlertComponent from '../../../../alertcomponent/AlertComponent'

const MAX_LENGTH_TEXT = 5000

interface IModalEditProps {
    show: boolean
    onHide: () => void
    postId: string
    answerId: string
    text: string
}

function ModalEdit(props: IModalEditProps) {
    const { user, updatePosts } = useContext(GlobalContext)

    const [text, setText] = useState(props.text)

    const [showAlertComponent, setShowAlertComponent] = useState(false)
    const [messageAlertComponent, setMessageAlertComponent] =
        useState<string>('')
    const [typeAlertComponent, setTypeAlertComponent] = useState<
        'success' | 'error'
    >('success')
    const [onceSubmit, setOnceSubmit] = useState<boolean>(false)

    const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!text.replace(/\s/g, '').length) {
            setShowAlertComponent(true)
            setMessageAlertComponent(
                'O conteúdo da resposta não pode ser vazio'
            )
            setTypeAlertComponent('error')

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
                setShowAlertComponent(true)
                setMessageAlertComponent('Resposta editada com sucesso')
                setTypeAlertComponent('success')
                updatePosts()

                setTimeout(() => {
                    setShowAlertComponent(false)
                }, 3000)

                props.onHide()
            })
            .catch(() => {
                setShowAlertComponent(true)
                setMessageAlertComponent(
                    'Erro ao editar resposta, tente novamente'
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
                                autoFocus
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

            <AlertComponent
                show={showAlertComponent}
                onHide={() => setShowAlertComponent(false)}
                message={messageAlertComponent}
                type={typeAlertComponent}
            />
        </>
    )
}

export default ModalEdit
