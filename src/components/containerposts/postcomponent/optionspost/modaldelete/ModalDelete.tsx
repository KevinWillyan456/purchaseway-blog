import axios from 'axios'
import { useContext, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { GlobalContext } from '../../../../../contexts/GlobalContext'
import './ModalDelete.css'
import AlertComponent from '../../../../alertcomponent/AlertComponent'

function ModalDelete(props: {
    show: boolean
    onHide: () => void
    postId: string
}) {
    const { user, updatePosts, updateUserData, updateUserInfo } =
        useContext(GlobalContext)

    const [showAlertComponent, setShowAlertComponent] = useState(false)
    const [messageAlertComponent, setMessageAlertComponent] =
        useState<string>('')
    const [typeAlertComponent, setTypeAlertComponent] = useState<
        'success' | 'error'
    >('success')

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
                updatePosts()
                updateUserData()
                updateUserInfo()
                props.onHide()
            })
            .catch(() => {
                setShowAlertComponent(true)
                setMessageAlertComponent(
                    'Erro ao excluir postagem, tente novamente'
                )
                setTypeAlertComponent('error')

                setTimeout(() => {
                    setShowAlertComponent(false)
                }, 3000)

                props.onHide()
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

            <AlertComponent
                show={showAlertComponent}
                onHide={() => setShowAlertComponent(false)}
                message={messageAlertComponent}
                type={typeAlertComponent}
            />
        </>
    )
}

export default ModalDelete
