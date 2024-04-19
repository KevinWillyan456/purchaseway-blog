import { Modal } from 'react-bootstrap'
import './AlertComponent.css'
import Success from '../../icons/Success'
import Error from '../../icons/Error'

interface IAlertComponentProps {
    show: boolean
    onHide: () => void
    message: string
    type: 'success' | 'error'
}

function AlertComponent(props: IAlertComponentProps) {
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <div className="modal-alert-icon">
                {props.type === 'success' ? <Success /> : <Error />}
            </div>

            <div className="modal-alert-text">{props.message}</div>

            <div className="modal-alert-btn">
                <button
                    className="modal-edit-btn-close"
                    type="submit"
                    onClick={props.onHide}
                >
                    OK
                </button>
            </div>
        </Modal>
    )
}

export default AlertComponent
