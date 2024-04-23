import './UserContent.css'
import User from '../../icons/User'
import Pencil from '../../icons/Pencil'
import { GlobalContext } from '../../contexts/GlobalContext'
import { useContext, useState } from 'react'
import ChangeProfilePhoto from '../changeprofilephoto/ChangeProfilePhoto'

function UserContent() {
    const { user } = useContext(GlobalContext)
    const [showChangeProfilePhoto, setShowChangeProfilePhoto] = useState(false)

    return (
        <article className="user-container">
            <div className="user-picture">
                {user.fotoPerfil ? (
                    <img
                        src={user.fotoPerfil}
                        alt="Foto de perfil do usuário"
                    />
                ) : (
                    <User />
                )}
            </div>

            <div
                className="pencil-container"
                onClick={() => setShowChangeProfilePhoto(true)}
            >
                <Pencil />
            </div>

            <div className="user-name">{user.nome}</div>
            <div className="user-posts-text">Posts</div>
            <div className="user-posts">{user.posts}</div>
            <div className="user-likes-text">Likes</div>
            <div className="user-likes">{user.curtidas}</div>

            <ChangeProfilePhoto
                show={showChangeProfilePhoto}
                onHide={() => setShowChangeProfilePhoto(false)}
            />
        </article>
    )
}

export default UserContent
