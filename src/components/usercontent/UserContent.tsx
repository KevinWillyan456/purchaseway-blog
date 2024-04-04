import './UserContent.css'
import User from '../../icons/User'
import Pencil from '../../icons/Pencil'
import { GlobalContext } from '../../contexts/GlobalContext'
import { useContext } from 'react'

function UserContent() {
    const { user } = useContext(GlobalContext)

    return (
        <article className="user-container">
            <div className="user-picture">
                <User />
                <div className="pencil-container">
                    <Pencil />
                </div>
            </div>
            <div className="user-name">{user.nome}</div>
            <div className="user-posts-text">Posts</div>
            <div className="user-posts">{user.posts}</div>
            <div className="user-likes-text">Likes</div>
            <div className="user-likes">{user.curtidas}</div>
        </article>
    )
}

export default UserContent
