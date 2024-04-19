import { useContext, useState } from 'react'
import Like from '../../../icons/Like'
import User from '../../../icons/User'
import './AnswersComponent.css'
import axios from 'axios'
import { GlobalContext, IAnswer } from '../../../contexts/GlobalContext'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import OptionsAnswer from './optionsanswer/OptionsAnswer'
import AlertComponent from '../../alertcomponent/AlertComponent'

function AnswersComponent({
    answer,
    postId,
}: {
    answer: IAnswer
    postId: string
}) {
    const [answerLikes, setAnswerLikes] = useState<string[]>(answer.curtidas)
    const { user } = useContext(GlobalContext)
    const [showAlertComponent, setShowAlertComponent] = useState(false)
    const [messageAlertComponent, setMessageAlertComponent] =
        useState<string>('')
    const [typeAlertComponent, setTypeAlertComponent] = useState<
        'success' | 'error'
    >('success')

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
                        setShowAlertComponent(true)
                        setMessageAlertComponent(
                            'Erro ao interagir com a resposta, tente novamente'
                        )
                        setTypeAlertComponent('error')

                        setTimeout(() => {
                            setShowAlertComponent(false)
                        }, 3000)
                    })
            })
            .catch(() => {
                setShowAlertComponent(true)
                setMessageAlertComponent(
                    'Erro ao interagir com a resposta, tente novamente'
                )
                setTypeAlertComponent('error')

                setTimeout(() => {
                    setShowAlertComponent(false)
                }, 3000)
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
                        {answer.userName === undefined
                            ? 'Carregando...'
                            : answer.userName}
                    </div>
                    <div className="posted-in">
                        {formatDistanceToNow(new Date(answer.dataCriacao), {
                            locale: ptBR,
                            addSuffix: true,
                        })}
                        {answer.wasEdited && <span> (editado)</span>}
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

            {user._id === answer.userId && (
                <OptionsAnswer
                    postId={postId}
                    answerId={answer._id}
                    text={answer.text}
                />
            )}

            <AlertComponent
                show={showAlertComponent}
                onHide={() => setShowAlertComponent(false)}
                message={messageAlertComponent}
                type={typeAlertComponent}
            />
        </article>
    )
}

export default AnswersComponent
