import './UserPost.css'
import Photograph from '../../icons/Photograph'
import { useContext, useState } from 'react'
import { UserContext } from '../../contexts/UserContext'
import axios from 'axios'
import ModalImageAndVideo from './modalimageandvideo/ModalImageAndVideo'

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

            <ModalImageAndVideo
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

export default UserPost
