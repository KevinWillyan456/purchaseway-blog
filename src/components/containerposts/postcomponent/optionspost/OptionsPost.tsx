import Bin from '../../../../icons/Bin'
import Gear from '../../../../icons/Gear'
import Pencil from '../../../../icons/Pencil'
import axios from 'axios'
import './OptionsPost.css'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../../contexts/UserContext'
import { Modal } from 'react-bootstrap'
import { Form } from 'react-bootstrap'

function OptionsPost({
    postId,
    content,
}: {
    postId: string
    content: { title: string; text: string; urlImg: string; videoId: string }
}) {
    const [deleteModalShow, setDeleteModalShow] = useState<boolean>(false)
    const [editModalShow, setEditModalShow] = useState<boolean>(false)

    return (
        <>
            <div className="dropdown options-post">
                <button
                    className="options-post-icon dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                >
                    <Gear />
                </button>

                <ul className="dropdown-menu">
                    <li>
                        <button
                            className="dropdown-item options-post-item"
                            type="button"
                            onClick={() => setEditModalShow(true)}
                        >
                            <Pencil />
                            Editar
                        </button>
                    </li>
                    <li>
                        <button
                            className="dropdown-item options-post-item"
                            type="button"
                            onClick={() => setDeleteModalShow(true)}
                        >
                            <Bin />
                            Excluir
                        </button>
                    </li>
                </ul>
            </div>

            <ModalDelete
                show={deleteModalShow}
                onHide={() => setDeleteModalShow(false)}
                postId={postId}
            />

            <ModalEdit
                content={content}
                show={editModalShow}
                onHide={() => setEditModalShow(false)}
                postId={postId}
            />
        </>
    )
}

function ModalDelete(props: {
    show: boolean
    onHide: () => void
    postId: string
}) {
    const { user } = useContext(UserContext)

    const handleDelete = () => {
        axios
            .delete(
                import.meta.env.VITE_API_URL +
                    '/posts/' +
                    props.postId +
                    '/' +
                    user._id,
                {
                    headers: {
                        Authorization: import.meta.env.VITE_API_KEY,
                    },
                }
            )
            .then(() => {
                alert('Postagem excluída com sucesso')
                props.onHide()
            })
            .catch(() => {
                alert('Erro ao excluir postagem, tente novamente')
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
                    Excluir postagem
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Tem certeza que deseja excluir esta postagem?</h5>
            </Modal.Body>
            <Modal.Footer>
                <button
                    className="modal-delete-btn-close"
                    onClick={props.onHide}
                >
                    Fechar
                </button>
                <button
                    className="modal-delete-btn-delete"
                    onClick={handleDelete}
                >
                    Excluir
                </button>
            </Modal.Footer>
        </Modal>
    )
}

const MAX_TEXT_LENGTH = 5000
const MAX_TITLE_LENGTH = 100

function ModalEdit(props: {
    show: boolean
    onHide: () => void
    postId: string
    content: {
        title: string
        text: string
        urlImg: string
        videoId: string
    }
}) {
    const { user } = useContext(UserContext)

    const [title, setTitle] = useState(props.content.title)
    const [text, setText] = useState(props.content.text)
    const [urlImg, setUrlImg] = useState(props.content.urlImg)
    const [imgValid, setImgValid] = useState<boolean>(false)
    const [removeImg, setRemoveImg] = useState<boolean>(
        props.content.urlImg === '' ? false : true
    )
    const [videoId, setVideoId] = useState(
        props.content.videoId ? `https://youtu.be/${props.content.videoId}` : ''
    )
    const [videoIdValid, setVideoIdValid] = useState<boolean>(false)
    const [onlyIdByVideo, setOnlyIdByVideo] = useState<string>('')
    const [removeVideoId, setRemoveVideoId] = useState<boolean>(
        props.content.videoId === '' ? false : true
    )

    useEffect(
        function () {
            setImgValid(false)

            if (!removeImg) {
                setImgValid(true)
                return
            }
            const img = new Image()
            img.src = urlImg

            img.onload = () => {
                setImgValid(true)
            }
            img.onerror = () => {
                setImgValid(false)
            }
        },
        [props, removeImg, urlImg]
    )

    useEffect(
        function () {
            setVideoIdValid(false)

            if (!removeVideoId) {
                setVideoIdValid(true)
                return
            }

            const pieces =
                videoId.length === 11
                    ? videoId
                    : videoId.split('https://youtu.be/')[1]
                    ? videoId.split('https://youtu.be/')[1].slice(0, 11)
                    : videoId.split('https://youtube.com/watch?v=')[1]
                    ? videoId
                          .split('https://youtube.com/watch?v=')[1]
                          .slice(0, 11)
                    : videoId.split('https://www.youtube.com/watch?v=')[1]
                    ? videoId
                          .split('https://www.youtube.com/watch?v=')[1]
                          .slice(0, 11)
                    : null

            if (!pieces || pieces.length !== 11) {
                setVideoIdValid(false)
                return
            }

            setVideoIdValid(true)
            setOnlyIdByVideo(pieces)
        },
        [props, removeVideoId, videoId]
    )

    const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (removeImg && urlImg === '') {
            alert('Adicione uma URL de imagem')
            return
        }

        if (imgValid === false && removeImg) {
            return alert('URL da imagem inválida')
        }

        if (removeVideoId && videoId === '') {
            alert('Adicione um ID de video do YouTube')
            return
        }

        if (videoIdValid === false && removeVideoId) {
            return alert('ID do vídeo do YouTube inválido')
        }

        if (title === '' || text === '') {
            return alert('Preencha todos os campos')
        }

        if (title.length > MAX_TITLE_LENGTH) {
            return alert(
                `O título deve ter no máximo ${MAX_TITLE_LENGTH} caracteres`
            )
        }

        if (text.length > MAX_TEXT_LENGTH) {
            return alert(
                `O texto deve ter no máximo ${MAX_TEXT_LENGTH} caracteres`
            )
        }

        if (!text.replace(/\s/g, '').length) {
            alert('O conteúdo da postagem não pode ser vazio')
            return
        }

        axios
            .put(
                import.meta.env.VITE_API_URL +
                    '/posts/' +
                    props.postId +
                    '/' +
                    user._id,
                {
                    title,
                    text,
                    urlImg: removeImg ? urlImg : '',
                    videoId: removeVideoId ? onlyIdByVideo : '',
                },
                {
                    headers: {
                        Authorization: import.meta.env.VITE_API_KEY,
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then(() => {
                alert('Postagem editada com sucesso')
                props.onHide()
            })
            .catch(() => {
                alert('Erro ao editar postagem, tente novamente')
            })
    }

    return (
        <>
            <Modal
                show={props.show}
                onHide={props.onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Form onSubmit={handleEdit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar postagem</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>Título da postagem</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Título da postagem"
                                maxLength={100}
                                autoFocus
                                value={title}
                                required
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Conteúdo da postagem</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={text}
                                style={{ resize: 'none' }}
                                maxLength={5000}
                                required
                                onChange={(e) => setText(e.target.value)}
                                rows={3}
                            />
                        </Form.Group>
                        {removeImg && (
                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlInput2"
                            >
                                <Form.Label>URL da imagem</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="URL da imagem"
                                    value={urlImg}
                                    onChange={(e) => setUrlImg(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        )}
                        {urlImg !== '' && removeImg && imgValid ? (
                            <div className="image-preview">
                                <img src={urlImg} alt="Imagem da postagem" />
                            </div>
                        ) : urlImg && removeImg ? (
                            <div className="image-preview">
                                <h5>URL da imagem inválida</h5>
                            </div>
                        ) : null}
                        <div className="d-flex mt-3">
                            <button
                                className="modal-edit-btn-remove-img"
                                type="button"
                                onClick={() => setRemoveImg((prev) => !prev)}
                            >
                                {removeImg ? 'Remover' : 'Adicionar'} imagem
                            </button>
                        </div>
                        {removeVideoId && (
                            <Form.Group
                                className="mb-3 mt-3"
                                controlId="exampleForm.ControlInput3"
                            >
                                <Form.Label>URL do vídeo do YouTube</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="URL do vídeo do YouTube"
                                    value={videoId}
                                    onChange={(e) => setVideoId(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        )}
                        {videoId !== '' && removeVideoId && videoIdValid ? (
                            <div className="video-preview">
                                <iframe
                                    width="560"
                                    height="315"
                                    src={`https://www.youtube.com/embed/${onlyIdByVideo}`}
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ) : videoId && removeVideoId ? (
                            <div className="video-preview">
                                <h5>URL do vídeo do YouTube inválida</h5>
                            </div>
                        ) : null}
                        <div className="d-flex mt-3">
                            <button
                                className="modal-edit-btn-remove-video"
                                type="button"
                                onClick={() =>
                                    setRemoveVideoId((prev) => !prev)
                                }
                            >
                                {removeVideoId ? 'Remover' : 'Adicionar'} vídeo
                            </button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            className="modal-edit-btn-close"
                            onClick={props.onHide}
                            type="button"
                        >
                            Fechar
                        </button>
                        <button className="modal-edit-btn-edit" type="submit">
                            Salvar
                        </button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default OptionsPost
