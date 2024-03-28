import './UserPost.css'
import Photograph from '../../icons/Photograph'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/UserContext'
import axios from 'axios'
import { Form, Modal } from 'react-bootstrap'

const MAX_LENGTH_MESSAGE = 5000
const MAX_LENGTH_TITLE = 100

function UserPost() {
    const { user } = useContext(UserContext)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [urlImg, setUrlImg] = useState<string>('')
    const [imgValid, setImgValid] = useState<boolean>(false)
    const [videoId, setVideoId] = useState<string>('')
    const [onlyIdByVideo, setOnlyIdByVideo] = useState<string>('')
    const [videoIdValid, setVideoIdValid] = useState<boolean>(false)

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

        if (!message.value.replace(/\s/g, '').length) {
            message.focus()
            return
        }

        if (message.value.length > MAX_LENGTH_MESSAGE) {
            alert(
                `Mensagem deve ter no máximo ${MAX_LENGTH_MESSAGE} caracteres`
            )
            return
        }

        if (title.value === '') {
            title.focus()
            return
        }

        if (title.value.length > MAX_LENGTH_TITLE) {
            alert(`Título deve ter no máximo ${MAX_LENGTH_TITLE} caracteres`)
            return
        }

        axios
            .post(
                import.meta.env.VITE_API_URL + '/posts/' + user._id,
                {
                    title: title.value,
                    text: message.value,
                    urlImg: imgValid ? urlImg : '',
                    videoId: videoIdValid ? onlyIdByVideo : '',
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
                    setUrlImg('')
                    setImgValid(false)
                    setVideoId('')
                    setOnlyIdByVideo('')
                    setVideoIdValid(false)

                    alert('Postagem criada com sucesso!')
                }
            })
            .catch(() => {
                alert('Erro ao criar postagem!')
            })
    }

    return (
        <>
            <form className="user-post-container" onSubmit={handleSubmit}>
                <textarea
                    className="user-message focus-ring"
                    placeholder="No que está pensando?"
                    required
                    maxLength={5000}
                ></textarea>
                <div className="user-post-footer">
                    <div className="wrap">
                        <button
                            className="attach-image"
                            type="button"
                            onClick={() => setShowModal(true)}
                        >
                            <Photograph />
                            {((urlImg !== '' && imgValid) ||
                                (videoId !== '' && videoIdValid)) && (
                                <abbr
                                    title={
                                        urlImg && videoId
                                            ? 'Uma imagem e um vídeo serão adicionados à postagem'
                                            : urlImg
                                            ? 'Uma imagem será adicionada à postagem'
                                            : videoId
                                            ? 'Um vídeo será adicionado à postagem'
                                            : ''
                                    }
                                >
                                    <span className="is-valid-img"></span>
                                </abbr>
                            )}
                        </button>
                        <input
                            type="text"
                            className="title-publish focus-ring"
                            placeholder="Título da postagem"
                            required
                            maxLength={100}
                        />
                    </div>
                    <button className="btn-publish" type="submit">
                        Postar
                    </button>
                </div>
            </form>

            <ModalImage
                show={showModal}
                onHide={() => setShowModal(false)}
                urlImg={urlImg}
                setUrlImg={setUrlImg}
                imgValid={imgValid}
                setImgValid={setImgValid}
                videoId={videoId}
                setVideoId={setVideoId}
                videoIdValid={videoIdValid}
                setVideoIdValid={setVideoIdValid}
                onlyIdByVideo={onlyIdByVideo}
                setOnlyIdByVideo={setOnlyIdByVideo}
            />
        </>
    )
}

function ModalImage(props: {
    show: boolean
    onHide: () => void
    urlImg: string
    setUrlImg: (value: string) => void
    imgValid: boolean
    setImgValid: (value: boolean) => void
    videoId: string
    setVideoId: (value: string) => void
    videoIdValid: boolean
    setVideoIdValid: (value: boolean) => void
    onlyIdByVideo: string
    setOnlyIdByVideo: (value: string) => void
}) {
    const handleImage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        props.onHide()
    }

    useEffect(
        function () {
            const img = new Image()
            img.src = props.urlImg

            img.onload = () => {
                props.setImgValid(true)
            }
            img.onerror = () => {
                props.setImgValid(false)
            }
        },
        [props]
    )

    useEffect(
        function () {
            const pieces =
                props.videoId.length === 11
                    ? props.videoId
                    : props.videoId.split('https://youtu.be/')[1]
                    ? props.videoId.split('https://youtu.be/')[1].slice(0, 11)
                    : props.videoId.split('https://youtube.com/watch?v=')[1]
                    ? props.videoId
                          .split('https://youtube.com/watch?v=')[1]
                          .slice(0, 11)
                    : props.videoId.split('https://www.youtube.com/watch?v=')[1]
                    ? props.videoId
                          .split('https://www.youtube.com/watch?v=')[1]
                          .slice(0, 11)
                    : null

            if (!pieces || pieces.length !== 11) {
                props.setVideoIdValid(false)
                return
            }
            props.setVideoIdValid(true)
            props.setOnlyIdByVideo(pieces)
        },
        [props]
    )

    return (
        <>
            <Modal
                show={props.show}
                onHide={props.onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Form onSubmit={handleImage}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Adicionar imagem ou vídeo do YouTube à postagem
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>URL da imagem</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Adicione a URL da imagem"
                                autoFocus
                                value={props.urlImg}
                                onChange={(e) =>
                                    props.setUrlImg(e.target.value)
                                }
                            />
                        </Form.Group>

                        {props.urlImg !== '' && props.imgValid ? (
                            <div className="image-preview">
                                <img
                                    src={props.urlImg}
                                    alt="Imagem da postagem"
                                />
                            </div>
                        ) : props.urlImg ? (
                            <div className="image-preview">
                                <h5>URL da imagem inválida</h5>
                            </div>
                        ) : null}
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput2"
                        >
                            <Form.Label>URL do vídeo do YouTube</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Adicione a URL do vídeo do YouTube"
                                value={props.videoId}
                                onChange={(e) =>
                                    props.setVideoId(e.target.value)
                                }
                            />
                        </Form.Group>

                        {props.videoId !== '' && props.videoIdValid ? (
                            <div className="video-preview">
                                <iframe
                                    width="560"
                                    height="315"
                                    src={`https://www.youtube.com/embed/${props.onlyIdByVideo}`}
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ) : props.videoId ? (
                            <div className="video-preview">
                                <h5>URL do vídeo inválida</h5>
                            </div>
                        ) : null}
                    </Modal.Body>
                    <Modal.Footer className="d-flex justify-content-center">
                        <button className="modal-edit-btn-close" type="submit">
                            OK
                        </button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default UserPost
