import Bin from '../../../../icons/Bin'
import Gear from '../../../../icons/Gear'
import Pencil from '../../../../icons/Pencil'
import axios from 'axios'
import './OptionsPost.css'
import { useContext, useState } from 'react'
import { UserContext } from '../../../../contexts/UserContext'
import { Modal } from 'react-bootstrap'

function OptionsPost({ postId }: { postId: string }) {
    const [modalShow, setModalShow] = useState(false)

    return (
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
                    >
                        <Pencil />
                        Editar
                    </button>
                </li>
                <li>
                    <button
                        className="dropdown-item options-post-item"
                        type="button"
                        onClick={() => setModalShow(true)}
                    >
                        <Bin />
                        Excluir
                    </button>
                </li>
            </ul>

            <ModalDelete
                show={modalShow}
                onHide={() => setModalShow(false)}
                postId={postId}
            />
        </div>
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

export default OptionsPost
