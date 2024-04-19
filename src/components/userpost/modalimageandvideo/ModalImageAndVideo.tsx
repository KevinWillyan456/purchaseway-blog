import { useEffect } from 'react'
import { Form, Modal } from 'react-bootstrap'
import './ModalImageAndVideo.css'

interface IModalImageAndVideoProps {
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
}

function ModalImageAndVideo(props: IModalImageAndVideoProps) {
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

export default ModalImageAndVideo
