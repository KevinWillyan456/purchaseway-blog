import './UserPost.css'
import Photograph from '../../icons/Photograph'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import axios from 'axios'

function UserPost() {
    const { user } = useContext(UserContext)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const message = e.currentTarget.querySelector(
            '.user-message'
        ) as HTMLTextAreaElement
        const title = e.currentTarget.querySelector(
            '.title-publish'
        ) as HTMLInputElement

        if (message.value === '') {
            message.focus()
            return
        }

        if (title.value === '') {
            title.focus()
            return
        }

        axios
            .post(
                import.meta.env.VITE_API_URL + '/posts/' + user._id,
                {
                    title: title.value,
                    text: message.value,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: import.meta.env.VITE_API_KEY,
                    },
                }
            )
            .then((response) => {
                if (response.status === 201) {
                    message.value = ''
                    title.value = ''

                    alert('Postagem criada com sucesso!')
                }
            })
            .catch(() => {
                alert('Erro ao criar postagem!')
            })
    }

    return (
        <form className="user-post-container" onSubmit={handleSubmit}>
            <textarea
                className="user-message focus-ring"
                placeholder="No que está pensando?"
                maxLength={5000}
            ></textarea>
            <div className="user-post-footer">
                <div className="wrap">
                    <div className="attach-image">
                        <Photograph />
                    </div>
                    <input
                        type="text"
                        className="title-publish focus-ring"
                        placeholder="Título da publicação"
                    />
                </div>
                <button className="btn-publish" type="submit">
                    Publicar
                </button>
            </div>
        </form>
    )
}

export default UserPost
