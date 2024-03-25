import Bin from '../../../../icons/Bin'
import Gear from '../../../../icons/Gear'
import Pencil from '../../../../icons/Pencil'
import axios from 'axios'
import './OptionsPost.css'
import { useContext, useState } from 'react'
import { UserContext } from '../../../../contexts/UserContext'
import { Modal } from 'react-bootstrap'
import { Form } from 'react-bootstrap'

function OptionsPost({
    postId,
    content,
}: {
    postId: string
    content: { title: string; text: string }
}) {
    const [deleteModalShow, setDeleteModalShow] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)

    return (
        <>
            <div className="dropdown options-post">
                <button
                    className="options-post-icon dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                >
                    <Gear />
                </button>

                <ul className="dropdown-menu">
                    <li>
                        <button
                            className="dropdown-item options-post-item"
                            type="button"
                            onClick={() => setEditModalShow(true)}
                        >
                            <Pencil />
                            Editar
                        </button>
                    </li>
                    <li>
                        <button
                            className="dropdown-item options-post-item"
                            type="button"
                            onClick={() => setDeleteModalShow(true)}
                        >
                            <Bin />
                            Excluir
                        </button>
                    </li>
                </ul>
            </div>

            <ModalDelete
                show={deleteModalShow}
                onHide={() => setDeleteModalShow(false)}
                postId={postId}
            />

            <ModalEdit
                content={content}
                show={editModalShow}
                onHide={() => setEditModalShow(false)}
                postId={postId}
            />
        </>
    )
}

function ModalDelete(props: {
    show: boolean
    onHide: () => void
    postId: string
}) {
    const { user } = useContext(UserContext)

    const handleDelete = () => {
        axios
            .delete(
                import.meta.env.VITE_API_URL +
                    '/posts/' +
                    props.postId +
                    '/' +
                    user._id,
                {
                    headers: {
                        Authorization: import.meta.env.VITE_API_KEY,
                    },
                }
            )
            .then(() => {
                alert('Postagem excluída com sucesso')
                props.onHide()
            })
            .catch(() => {
                alert('Erro ao excluir postagem, tente novamente')
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
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Excluir postagem
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Tem certeza que deseja excluir esta postagem?</h5>
            </Modal.Body>
            <Modal.Footer>
                <button
                    className="modal-delete-btn-close"
                    onClick={props.onHide}
                >
                    Fechar
                </button>
                <button
                    className="modal-delete-btn-delete"
                    onClick={handleDelete}
                >
                    Excluir
                </button>
            </Modal.Footer>
        </Modal>
    )
}

function ModalEdit(props: {
    show: boolean
    onHide: () => void
    postId: string
    content: {
        title: string
        text: string
    }
}) {
    const { user } = useContext(UserContext)

    const [title, setTitle] = useState(props.content.title)
    const [text, setText] = useState(props.content.text)

    const handleEdit = () => {
        axios
            .put(
                import.meta.env.VITE_API_URL +
                    '/posts/' +
                    props.postId +
                    '/' +
                    user._id,
                {
                    title: title,
                    text: text,
                },
                {
                    headers: {
                        Authorization: import.meta.env.VITE_API_KEY,
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then(() => {
                alert('Postagem editada com sucesso')
                props.onHide()
            })
            .catch(() => {
                alert('Erro ao editar postagem, tente novamente')
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
                <Modal.Header closeButton>
                    <Modal.Title>Editar postagem</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>Título da postagem</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Título da postagem"
                                autoFocus
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Conteúdo da postagem</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={text}
                                style={{ resize: 'none' }}
                                maxLength={5000}
                                onChange={(e) => setText(e.target.value)}
                                rows={3}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="modal-edit-btn-close"
                        onClick={props.onHide}
                    >
                        Fechar
                    </button>
                    <button
                        className="modal-edit-btn-edit"
                        onClick={handleEdit}
                    >
                        Salvar
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default OptionsPost
