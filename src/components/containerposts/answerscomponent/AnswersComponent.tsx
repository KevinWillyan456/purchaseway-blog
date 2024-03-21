import { useContext, useState } from 'react'
import Like from '../../../icons/Like'
import User from '../../../icons/User'
import { IAnswer } from '../ContainerPosts'
import './AnswersComponent.css'
import axios from 'axios'
import { UserContext } from '../../../contexts/UserContext'

function AnswersComponent({
    answer,
    postId,
}: {
    answer: IAnswer
    postId: string
}) {
    const [answerLikes, setAnswerLikes] = useState<string[]>(answer.curtidas)
    const { user } = useContext(UserContext)

    const handleLike = () => {
        axios
            .put(
                import.meta.env.VITE_API_URL +
                    '/posts/response/likes/' +
                    postId +
                    '/' +
                    answer._id +
                    '/' +
                    user._id,
                {},
                {
                    headers: {
                        Authorization: import.meta.env.VITE_API_KEY,
                    },
                }
            )
            .then(() => {
                axios
                    .get(import.meta.env.VITE_API_URL + '/posts/' + postId, {
                        headers: {
                            Authorization: import.meta.env.VITE_API_KEY,
                        },
                    })
                    .then((response) => {
                        setAnswerLikes(
                            response.data.post.respostas.find(
                                (resposta: IAnswer) =>
                                    resposta._id === answer._id
                            ).curtidas
                        )
                    })
                    .catch(() => {
                        alert(
                            'Erro ao interagir com a resposta, tente novamente'
                        )
                    })
            })
            .catch(() => {
                alert('Erro ao interagir com a resposta, tente novamente')
            })
    }

    return (
        <article className="user-posted-answering">
            <div className="user-picture-posts">
                <User />
            </div>
            <div className="wrapper">
                <div className="name-wrapper">
                    <div className="name">
                        {answer.userId.match(/(\w{8}(-\w{4}){3}-\w{12}?)/g)
                            ? 'Carregando...'
                            : answer.userId}
                    </div>
                    <div className="posted-in">
                        {new Date(answer.dataCriacao).toLocaleDateString(
                            'pt-BR',
                            {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                            }
                        )}
                    </div>
                </div>
                <div className="content-post">{answer.text}</div>
                <div className="actions-post">
                    <div className="actions-wrapper">
                        <button
                            className={
                                answerLikes.includes(user._id)
                                    ? 'like-btn active'
                                    : 'like-btn'
                            }
                            onClick={handleLike}
                        >
                            <Like />
                        </button>
                        <div className="count-like-post">
                            {answerLikes.length}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default AnswersComponent
