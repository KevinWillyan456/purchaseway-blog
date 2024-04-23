import axios from 'axios'
import { useContext, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { GlobalContext } from '../../../../../contexts/GlobalContext'
import AlertComponent from '../../../../alertcomponent/AlertComponent'

interface IModalDeleteAllPostsProps {
    show: boolean
    onHide: () => void
}

function ModalDeleteAllPosts(props: IModalDeleteAllPostsProps) {
    const { user, updateUserData, updateUserInfo } = useContext(GlobalContext)

    const [showAlertComponent, setShowAlertComponent] = useState(false)
    const [messageAlertComponent, setMessageAlertComponent] =
        useState<string>('')
    const [typeAlertComponent, setTypeAlertComponent] = useState<
        'success' | 'error'
    >('success')
    const [onceSubmit, setOnceSubmit] = useState<boolean>(false)

    const handleDeletePosts = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (onceSubmit) return
        setOnceSubmit(true)

        axios
            .delete(
                import.meta.env.VITE_API_URL + '/delete-all-posts/' + user._id,
                {
                    headers: {
                        Authorization: import.meta.env.VITE_API_KEY,
                    },
                }
            )
            .then(() => {
                updateUserData()
                updateUserInfo()
                props.onHide()
            })
            .catch(() => {
                setShowAlertComponent(true)
                setMessageAlertComponent(
                    'Erro ao deletar as postagens, tente novamente'
                )
                setTypeAlertComponent('error')
                props.onHide()

                setTimeout(() => {
                    setShowAlertComponent(false)
                }, 3000)
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
                        Deletar todas as postagens
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Tem certeza que deseja deletar todas as postagens?</h5>
                    <p>
                        Essa ação não pode ser desfeita e todas as postagens
                        criadas por você serão deletadas permanentemente.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="modal-delete-btn-close"
                        onClick={props.onHide}
                    >
                        Fechar
                    </button>
                    <button
                        className="user-account-modal-button-delete-posts"
                        onClick={handleDeletePosts}
                    >
                        Deletar todas as postagens
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

export default ModalDeleteAllPosts
