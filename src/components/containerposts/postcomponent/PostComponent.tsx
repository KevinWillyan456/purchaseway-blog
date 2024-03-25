import { useContext, useState } from 'react'
import Like from '../../../icons/Like'
import User from '../../../icons/User'
import OptionsPost from './optionspost/OptionsPost'
import AnswersComponent from '../answerscomponent/AnswersComponent'
import { IPost } from '../ContainerPosts'
import { UserContext } from '../../../contexts/UserContext'
import axios from 'axios'
import { formatDistanceToNow } from 'date-fns'
import './PostComponent.css'
import { ptBR } from 'date-fns/locale'
import { Form, Modal } from 'react-bootstrap'

function PostComponent({ post }: { post: IPost }) {
    const [showAnswers, setShowAnswers] = useState<boolean>(false)
    const [answerModalShow, setAnswerModalShow] = useState<boolean>(false)
    const [postLikes, setPostLikes] = useState<string[]>(post.curtidas)
    const { user } = useContext(UserContext)

    const handleToggleAnswers = () => {
        setShowAnswers((prev) => !prev)
    }

    const handleLike = () => {
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
                        alert(
                            'Erro ao interagir com a postagem, tente novamente'
                        )
                    })
            })
            .catch(() => {
                alert('Erro ao interagir com a postagem, tente novamente')
            })
    }

    return (
        <article className="user-posted">
            <div className="user-picture-posts">
                <User />
            </div>
            <div className="wrapper">
                <div className="name-wrapper">
                    <div className="name">
                        {post.proprietario.match(/(\w{8}(-\w{4}){3}-\w{12}?)/g)
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
                        <img
                            style={{
                                width: '100%',
                                marginTop: '20px',
                                borderRadius: '10px',
                            }}
                            src={post.conteudo.urlImg}
                        />
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
            />
        </article>
    )
}

function ModalAnswer(props: {
    show: boolean
    onHide: () => void
    postId: string
}) {
    const [text, setText] = useState<string>('')
    const { user } = useContext(UserContext)

    const handleAnswer = () => {
        axios
            .post(
                import.meta.env.VITE_API_URL +
                    '/posts/response/' +
                    props.postId +
                    '/' +
                    user._id,
                {
                    text,
                },
                {
                    headers: {
                        Authorization: import.meta.env.VITE_API_KEY,
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then(() => {
                setText('')
                props.onHide()
                alert('Resposta enviada com sucesso')
            })
            .catch(() => {
                alert('Erro ao responder a postagem, tente novamente')
            })
    }

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Responder postagem
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Conteúdo da resposta</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={text}
                            style={{ resize: 'none' }}
                            maxLength={5000}
                            onChange={(e) => setText(e.target.value)}
                            rows={3}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <button
                    className="modal-answer-btn-close"
                    onClick={props.onHide}
                >
                    Fechar
                </button>
                <button
                    className="modal-answer-btn-submit"
                    onClick={handleAnswer}
                >
                    Enviar
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default PostComponent
