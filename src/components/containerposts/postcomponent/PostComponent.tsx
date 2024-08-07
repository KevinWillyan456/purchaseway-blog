import { useContext, useState } from 'react'
import Like from '../../../icons/Like'
import User from '../../../icons/User'
import OptionsPost from './optionspost/OptionsPost'
import AnswersComponent from '../answerscomponent/AnswersComponent'
import { GlobalContext, IPost } from '../../../contexts/GlobalContext'
import axios from 'axios'
import { formatDistanceToNow } from 'date-fns'
import './PostComponent.css'
import { ptBR } from 'date-fns/locale'
import ModalAnswer from './modalanswer/ModalAnswer'
import AlertComponent from '../../alertcomponent/AlertComponent'

function PostComponent({ post }: { post: IPost }) {
    const [showAnswers, setShowAnswers] = useState<boolean>(false)
    const [answerModalShow, setAnswerModalShow] = useState<boolean>(false)
    const [postLikes, setPostLikes] = useState<string[]>(post.curtidas)
    const { user, updateUserData, updateUserInfo } = useContext(GlobalContext)

    const [showAlertComponent, setShowAlertComponent] = useState(false)
    const [messageAlertComponent, setMessageAlertComponent] =
        useState<string>('')
    const [typeAlertComponent, setTypeAlertComponent] = useState<
        'success' | 'error'
    >('success')
    const [onceSubmit, setOnceSubmit] = useState<boolean>(false)

    const handleToggleAnswers = () => {
        setShowAnswers((prev) => !prev)
    }

    const handleLike = () => {
        if (onceSubmit) return
        setOnceSubmit(true)

        axios
            .put(
                import.meta.env.VITE_API_URL +
                    '/posts/likes/' +
                    post._id +
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
                    .get(import.meta.env.VITE_API_URL + '/posts/' + post._id, {
                        headers: {
                            Authorization: import.meta.env.VITE_API_KEY,
                        },
                    })
                    .then((response) => {
                        setPostLikes(response.data.post.curtidas)
                    })
                    .catch(() => {
                        setShowAlertComponent(true)
                        setMessageAlertComponent(
                            'Erro ao interagir com a postagem, tente novamente'
                        )
                        setTypeAlertComponent('error')

                        setTimeout(() => {
                            setShowAlertComponent(false)
                        }, 3000)
                    })
                    .finally(() => {
                        updateUserData()
                        updateUserInfo()
                    })
            })
            .catch(() => {
                setShowAlertComponent(true)
                setMessageAlertComponent(
                    'Erro ao interagir com a postagem, tente novamente'
                )
                setTypeAlertComponent('error')

                updateUserData()
                updateUserInfo()

                setTimeout(() => {
                    setShowAlertComponent(false)
                }, 3000)
            })
            .finally(() => {
                setOnceSubmit(false)
            })
    }

    const [showVideo, setShowVideo] = useState<boolean>(false)

    return (
        <article className="user-posted">
            <div
                className="user-picture-posts"
                style={!post.fotoPerfil ? { padding: '5px' } : {}}
            >
                {post.fotoPerfil ? (
                    <img src={post.fotoPerfil} alt="Foto de perfil" />
                ) : (
                    <User />
                )}
            </div>
            <div className="wrapper">
                <div className="name-wrapper">
                    <div className="name">
                        {!post.proprietario
                            ? 'Carregando...'
                            : post.proprietario}
                    </div>
                    <div className="posted-in">
                        {formatDistanceToNow(new Date(post.dataCriacao), {
                            locale: ptBR,
                            addSuffix: true,
                        })}
                        {post.wasEdited && <span> (editado)</span>}
                    </div>
                </div>
                <div className="title-post text-truncate">
                    {post.conteudo.title}
                </div>
                <div className="content-post">
                    {post.conteudo.text}
                    {post.conteudo.urlImg && (
                        <>
                            <h3 className="title-check-out">
                                Confira esta imagem
                            </h3>
                            <img
                                style={{
                                    width: '100%',
                                    marginTop: '20px',
                                    borderRadius: '10px',
                                }}
                                src={post.conteudo.urlImg}
                            />
                        </>
                    )}
                    {post.conteudo.videoId && (
                        <>
                            <h3 className="title-check-out">
                                Confira este vídeo
                            </h3>
                            <div className="video-post">
                                {!showVideo && (
                                    <div className="show-video-post">
                                        <button
                                            className="btn-show-video-post"
                                            onClick={() =>
                                                setShowVideo((prev) => !prev)
                                            }
                                        >
                                            Mostrar vídeo
                                        </button>
                                    </div>
                                )}

                                {showVideo && (
                                    <iframe
                                        width="560"
                                        height="315"
                                        src={`https://www.youtube.com/embed/${post.conteudo.videoId}`}
                                        title="YouTube video player"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                    ></iframe>
                                )}
                            </div>
                        </>
                    )}
                </div>
                <div className="actions-post">
                    <div className="actions-wrapper">
                        <div className="like-btn-wrapper">
                            <button
                                className={
                                    postLikes.includes(user._id)
                                        ? 'like-btn active'
                                        : 'like-btn'
                                }
                                onClick={handleLike}
                            >
                                <Like />
                            </button>
                            <div className="count-like-post">
                                {postLikes.length}
                            </div>
                        </div>
                        <button
                            className="btn-respond"
                            onClick={() => setAnswerModalShow(true)}
                        >
                            Responder
                        </button>
                    </div>
                    {post.respostas.length > 0 && (
                        <button
                            className="answers"
                            onClick={handleToggleAnswers}
                        >
                            Respostas
                            <div className="answers-count">
                                {post.respostas.length}
                            </div>
                        </button>
                    )}

                    {showAnswers && (
                        <>
                            {post.respostas.map((answer) => (
                                <AnswersComponent
                                    key={answer._id}
                                    answer={answer}
                                    postId={post._id}
                                />
                            ))}
                        </>
                    )}
                </div>
            </div>
            {user._id === post.proprietarioId && (
                <OptionsPost postId={post._id} content={post.conteudo} />
            )}
            <ModalAnswer
                show={answerModalShow}
                onHide={() => setAnswerModalShow(false)}
                postId={post._id}
                setShowAnswers={setShowAnswers}
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

export default PostComponent
