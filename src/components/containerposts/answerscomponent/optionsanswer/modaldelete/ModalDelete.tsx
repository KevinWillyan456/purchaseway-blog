import axios from 'axios'
import { useContext } from 'react'
import { Modal } from 'react-bootstrap'
import { UserContext } from '../../../../../contexts/UserContext'

function ModalDelete(props: {
    show: boolean
    onHide: () => void
    postId: string
    answerId: string
}) {
    const { user } = useContext(UserContext)

    const handleDelete = () => {
        axios
            .delete(
                import.meta.env.VITE_API_URL +
                    '/posts/response/' +
                    props.postId +
                    '/' +
                    props.answerId +
                    '/' +
                    user._id,
                {
                    headers: {
                        Authorization: import.meta.env.VITE_API_KEY,
                    },
                }
            )
            .then(() => {
                alert('Resposta excluída com sucesso')
                props.onHide()
            })
            .catch(() => {
                alert('Erro ao excluir resposta, tente novamente')
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
                    Excluir resposta
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Tem certeza que deseja excluir esta resposta?</h5>
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

export default ModalDelete
