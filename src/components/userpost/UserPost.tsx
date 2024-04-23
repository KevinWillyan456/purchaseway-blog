import './UserPost.css'
import Photograph from '../../icons/Photograph'
import { useContext, useState } from 'react'
import { GlobalContext } from '../../contexts/GlobalContext'
import axios from 'axios'
import ModalImageAndVideo from './modalimageandvideo/ModalImageAndVideo'
import AlertComponent from '../alertcomponent/AlertComponent'

const MAX_LENGTH_MESSAGE = 5000
const MAX_LENGTH_TITLE = 100

function UserPost() {
    const { user, updatePosts, updateUserData, updateUserInfo } =
        useContext(GlobalContext)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [urlImg, setUrlImg] = useState<string>('')
    const [imgValid, setImgValid] = useState<boolean>(false)
    const [videoId, setVideoId] = useState<string>('')
    const [onlyIdByVideo, setOnlyIdByVideo] = useState<string>('')
    const [videoIdValid, setVideoIdValid] = useState<boolean>(false)
    const [showAlertComponent, setShowAlertComponent] = useState(false)
    const [messageAlertComponent, setMessageAlertComponent] =
        useState<string>('')
    const [typeAlertComponent, setTypeAlertComponent] = useState<
        'success' | 'error'
    >('success')
    const [onceSubmit, setOnceSubmit] = useState<boolean>(false)

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
            setShowAlertComponent(true)
            setMessageAlertComponent(
                `Mensagem deve ter no máximo ${MAX_LENGTH_MESSAGE} caracteres`
            )
            setTypeAlertComponent('error')

            setTimeout(() => {
                setShowAlertComponent(false)
            }, 3000)
            return
        }

        if (title.value === '') {
            title.focus()
            return
        }

        if (title.value.length > MAX_LENGTH_TITLE) {
            setShowAlertComponent(true)
            setMessageAlertComponent(
                `Título deve ter no máximo ${MAX_LENGTH_TITLE} caracteres`
            )
            setTypeAlertComponent('error')

            setTimeout(() => {
                setShowAlertComponent(false)
            }, 3000)
            return
        }

        if (onceSubmit) return
        setOnceSubmit(true)

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
                    setShowAlertComponent(true)
                    setMessageAlertComponent('Postagem criada com sucesso!')
                    setTypeAlertComponent('success')
                    updatePosts()
                    updateUserData()
                    updateUserInfo()

                    setTimeout(() => {
                        setShowAlertComponent(false)
                    }, 3000)
                }
            })
            .catch(() => {
                setShowAlertComponent(true)
                setMessageAlertComponent(
                    'Erro ao criar postagem, tente novamente'
                )
                setTypeAlertComponent('error')

                setTimeout(() => {
                    setShowAlertComponent(false)
                }, 3000)
            })
            .finally(() => {
                setOnceSubmit(false)
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
                                        urlImg &&
                                        imgValid &&
                                        videoId &&
                                        videoIdValid
                                            ? 'Uma imagem e um vídeo serão adicionados à postagem'
                                            : urlImg && imgValid
                                            ? 'Uma imagem será adicionada à postagem'
                                            : videoId && videoIdValid
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

            <AlertComponent
                show={showAlertComponent}
                onHide={() => setShowAlertComponent(false)}
                message={messageAlertComponent}
                type={typeAlertComponent}
            />
        </>
    )
}

export default UserPost
