import axios from 'axios'
import { useContext, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { GlobalContext } from '../../../../../contexts/GlobalContext'
import AlertComponent from '../../../../alertcomponent/AlertComponent'

interface IModalDeleteProps {
    show: boolean
    onHide: () => void
    postId: string
    answerId: string
}

function ModalDelete(props: IModalDeleteProps) {
    const { user, updatePosts, updateUserPosts } = useContext(GlobalContext)

    const [showAlertComponent, setShowAlertComponent] = useState(false)
    const [messageAlertComponent, setMessageAlertComponent] =
        useState<string>('')
    const [typeAlertComponent, setTypeAlertComponent] = useState<
        'success' | 'error'
    >('success')
    const [onceSubmit, setOnceSubmit] = useState<boolean>(false)

    const handleDelete = () => {
        if (onceSubmit) return
        setOnceSubmit(true)

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
                updatePosts()
                updateUserPosts()
                props.onHide()
            })
            .catch(() => {
                setShowAlertComponent(true)
                setMessageAlertComponent(
                    'Erro ao excluir resposta, tente novamente'
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
