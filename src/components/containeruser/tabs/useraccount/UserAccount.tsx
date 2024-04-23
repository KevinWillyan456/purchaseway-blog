import { Form } from 'react-bootstrap'
import UserLarge from '../../../../icons/UserLarge'
import './UserAccount.css'
import { useContext, useState } from 'react'
import ModalDeleteAllPosts from './modaldeleteallposts/ModalDeleteAllPosts'
import { GlobalContext } from '../../../../contexts/GlobalContext'
import ModalDeleteAccount from './modaldeleteaccount/ModalDeleteAccount'

function UserAccount() {
    const { user, userInfo } = useContext(GlobalContext)
    const [email, setEmail] = useState<string>('')
    const [showModalDeleteAllPosts, setShowModalDeleteAllPosts] =
        useState(false)
    const [showModalDeleteAccount, setShowModalDeleteAccount] = useState(false)

    return (
        <article className="user-account">
            <div className="user-menu-container">
                <div className="user-menu-picture">
                    {user.fotoPerfil ? (
                        <img
                            src={user.fotoPerfil}
                            alt="Foto de perfil do usuário"
                        />
                    ) : (
                        <UserLarge />
                    )}
                </div>
                <div className="user-menu-name">{userInfo.nome}</div>
            </div>

            <div className="user-account-details">
                <button
                    className="user-account-button-delete-posts"
                    onClick={() => setShowModalDeleteAllPosts(true)}
                >
                    Deletar todas as postagens
                </button>

                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>
                        Para deletar sua conta digite seu email
                    </Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Digite seu nome"
                        className="user-account-input-name"
                        maxLength={100}
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <button
                    className={
                        email === user.email
                            ? 'user-account-button-delete-account'
                            : 'user-account-button-delete-account-disabled'
                    }
                    onClick={() => {
                        if (email === user.email) {
                            setShowModalDeleteAccount(true)
                        }
                    }}
                >
                    Deletar conta
                </button>
            </div>

            <ModalDeleteAllPosts
                show={showModalDeleteAllPosts}
                onHide={() => setShowModalDeleteAllPosts(false)}
            />

            <ModalDeleteAccount
                show={showModalDeleteAccount}
                onHide={() => setShowModalDeleteAccount(false)}
                email={email}
            />
        </article>
    )
}

export default UserAccount
