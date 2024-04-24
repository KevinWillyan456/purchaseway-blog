import axios from 'axios'
import { useContext, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { GlobalContext } from '../../../../../contexts/GlobalContext'
import AlertComponent from '../../../../alertcomponent/AlertComponent'
import Cookies from 'js-cookie'

interface IModalDeleteAccountProps {
    show: boolean
    onHide: () => void
    email: string
}

function ModalDeleteAccount(props: IModalDeleteAccountProps) {
    const { user } = useContext(GlobalContext)

    const [showAlertComponent, setShowAlertComponent] = useState(false)
    const [messageAlertComponent, setMessageAlertComponent] =
        useState<string>('')
    const [typeAlertComponent, setTypeAlertComponent] = useState<
        'success' | 'error'
    >('success')
    const [onceSubmit, setOnceSubmit] = useState<boolean>(false)

    const handleDeleteAccount = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (props.email !== user.email || onceSubmit) {
            return
        }
        setOnceSubmit(true)

        const token = Cookies.get('token')

        axios
            .delete(import.meta.env.VITE_API_URL + '/users/' + user.email, {
                headers: {
                    Authorization: import.meta.env.VITE_API_KEY,
                    token,
                },
            })
            .then(() => {
                props.onHide()
                Cookies.remove('token')
                window.location.href = '/'
            })
            .catch(() => {
                props.onHide()
                setShowAlertComponent(true)
                setMessageAlertComponent(
                    'Erro ao deletar a conta, tente novamente'
                )
                setTypeAlertComponent('error')

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
                        Deletar conta
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Tem certeza que deseja deletar a sua conta?</h5>
                    <p>
                        Essa ação não pode ser desfeita e todas as postagens e
                        dados serão perdidos permanentemente.
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
                        className="user-account-modal-button-delete-account"
                        onClick={handleDeleteAccount}
                    >
                        Deletar conta
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

export default ModalDeleteAccount
