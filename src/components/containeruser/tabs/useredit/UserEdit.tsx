import { Form } from 'react-bootstrap'
import UserLarge from '../../../../icons/UserLarge'
import './UserEdit.css'
import { useContext, useState } from 'react'
import AlertComponent from '../../../alertcomponent/AlertComponent'
import { GlobalContext } from '../../../../contexts/GlobalContext'
import axios from 'axios'
import ChangeProfilePhoto from '../../../changeprofilephoto/ChangeProfilePhoto'

const USER_NAME_MIN_LENGTH = 3
const USER_NAME_MAX_LENGTH = 100

function UserEdit() {
    const { user, userInfo, updateUserData, updateUserInfo } =
        useContext(GlobalContext)
    const [name, setName] = useState<string>(userInfo.nome)

    const [showAlertComponent, setShowAlertComponent] = useState(false)
    const [messageAlertComponent, setMessageAlertComponent] =
        useState<string>('')
    const [typeAlertComponent, setTypeAlertComponent] = useState<
        'success' | 'error'
    >('success')
    const [onceSubmit, setOnceSubmit] = useState<boolean>(false)

    const [showChangeProfilePhoto, setShowChangeProfilePhoto] = useState(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (name === userInfo.nome) return

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

        if (name.length < USER_NAME_MIN_LENGTH) {
            setShowAlertComponent(true)
            setMessageAlertComponent('Nome deve ter no mínimo 3 caracteres')
            setTypeAlertComponent('error')
            document.getElementById('exampleForm.ControlInput1')?.focus()

            setTimeout(() => {
                setShowAlertComponent(false)
            }, 3000)
            return
        }

        if (name.length > USER_NAME_MAX_LENGTH) {
            setShowAlertComponent(true)
            setMessageAlertComponent('Nome ultrapassou o limite de caracteres')
            setTypeAlertComponent('error')
            document.getElementById('exampleForm.ControlInput1')?.focus()

            setTimeout(() => {
                setShowAlertComponent(false)
            }, 3000)
            return
        }

        if (onceSubmit) return
        setOnceSubmit(true)

        axios
            .put(
                import.meta.env.VITE_API_URL + '/users/' + user._id,
                { nome: name },
                {
                    headers: {
                        Authorization: import.meta.env.VITE_API_KEY,
                    },
                }
            )
            .then(() => {
                setOnceSubmit(false)
                updateUserData()
                updateUserInfo()
            })
            .catch(() => {
                setOnceSubmit(false)
                setShowAlertComponent(true)
                setMessageAlertComponent(
                    'Erro ao alterar nome, tente novamente'
                )
                setTypeAlertComponent('error')

                setTimeout(() => {
                    setShowAlertComponent(false)
                }, 3000)
            })
    }

    return (
        <article className="user-edit">
            <div className="user-menu-container">
                <div className="user-menu-picture">
                    <UserLarge />
                </div>
                <div className="user-menu-name">{userInfo.nome}</div>
            </div>

            <Form onSubmit={handleSubmit}>
                <div className="user-edit-details">
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Mudar nome</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite seu nome"
                            className="user-edit-input-name"
                            maxLength={USER_NAME_MAX_LENGTH}
                            value={name}
                            required
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <button
                        className="user-edit-button-change-picture"
                        type="button"
                        onClick={() => setShowChangeProfilePhoto(true)}
                    >
                        Mudar foto de perfil
                    </button>
                    <button
                        className={
                            name === userInfo.nome
                                ? 'user-edit-button-save disabled'
                                : 'user-edit-button-save'
                        }
                        type="submit"
                    >
                        Salvar
                    </button>
                </div>
            </Form>

            <ChangeProfilePhoto
                show={showChangeProfilePhoto}
                onHide={() => setShowChangeProfilePhoto(false)}
            />

            <AlertComponent
                show={showAlertComponent}
                onHide={() => setShowAlertComponent(false)}
                message={messageAlertComponent}
                type={typeAlertComponent}
            />
        </article>
    )
}

export default UserEdit
