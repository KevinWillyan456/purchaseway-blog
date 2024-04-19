import { Form } from 'react-bootstrap'
import UserLarge from '../../../../icons/UserLarge'
import './UserAccount.css'
import { useContext, useState } from 'react'
import ModalDeleteAllPosts from './modaldeleteallposts/ModalDeleteAllPosts'
import { GlobalContext } from '../../../../contexts/GlobalContext'

const EXAMPLE_EMAIL = 'joedawn@email.com'

function UserAccount() {
    const { userInfo } = useContext(GlobalContext)
    const [email, setEmail] = useState<string>('')
    const [showModalDeleteAllPosts, setShowModalDeleteAllPosts] =
        useState(false)

    const handleDeleteAccount = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (email !== EXAMPLE_EMAIL) {
            return
        }

        alert('Conta deletada com sucesso')
    }

    return (
        <article className="user-account">
            <div className="user-menu-container">
                <div className="user-menu-picture">
                    <UserLarge />
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
                        email === EXAMPLE_EMAIL
                            ? 'user-account-button-delete-account'
                            : 'user-account-button-delete-account-disabled'
                    }
                    onClick={handleDeleteAccount}
                >
                    Deletar conta
                </button>
            </div>

            <ModalDeleteAllPosts
                show={showModalDeleteAllPosts}
                onHide={() => setShowModalDeleteAllPosts(false)}
            />
        </article>
    )
}

export default UserAccount
