import { Form } from 'react-bootstrap'
import UserLarge from '../../../../icons/UserLarge'
import './UserEdit.css'
import { useState } from 'react'
import AlertComponent from '../../../alertcomponent/AlertComponent'

function UserEdit() {
    const [name, setName] = useState<string>('')

    const [showAlertComponent, setShowAlertComponent] = useState(false)
    const [messageAlertComponent, setMessageAlertComponent] =
        useState<string>('')
    const [typeAlertComponent, setTypeAlertComponent] = useState<
        'success' | 'error'
    >('success')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (name === '') {
            setShowAlertComponent(true)
            setMessageAlertComponent('O nome não pode ser vazio')
            setTypeAlertComponent('error')
            document.getElementById('exampleForm.ControlInput1')?.focus()

            setTimeout(() => {
                setShowAlertComponent(false)
            }, 3000)
            return
        }

        if (name.length < 3) {
            setShowAlertComponent(true)
            setMessageAlertComponent('Nome deve ter no mínimo 3 caracteres')
            setTypeAlertComponent('error')
            document.getElementById('exampleForm.ControlInput1')?.focus()

            setTimeout(() => {
                setShowAlertComponent(false)
            }, 3000)
            return
        }

        setShowAlertComponent(true)
        setMessageAlertComponent('Nome alterado com sucesso')
        setTypeAlertComponent('success')

        setTimeout(() => {
            setShowAlertComponent(false)
        }, 3000)
    }

    return (
        <>
            <AlertComponent
                show={showAlertComponent}
                onHide={() => setShowAlertComponent(false)}
                message={messageAlertComponent}
                type={typeAlertComponent}
            />
            <article className="user-edit">
                <div className="user-menu-container">
                    <div className="user-menu-picture">
                        <UserLarge />
                    </div>
                    <div className="user-menu-name">Joe Dawn</div>
                </div>

                <Form onSubmit={handleSubmit}>
                    <div className="user-edit-details">
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Mudar nome</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite seu nome"
                                className="user-edit-input-name"
                                maxLength={100}
                                value={name}
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>

                        <button
                            className="user-edit-button-change-picture"
                            type="button"
                        >
                            Mudar foto de perfil
                        </button>
                        <button className="user-edit-button-save" type="submit">
                            Salvar
                        </button>
                    </div>
                </Form>
            </article>
        </>
    )
}

export default UserEdit
