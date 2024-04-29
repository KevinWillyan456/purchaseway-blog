import { useCallback, useContext, useEffect, useState } from 'react'
import { GlobalContext, IPost } from '../../../contexts/GlobalContext'
import axios from 'axios'
import { Modal } from 'react-bootstrap'
import PostComponent from '../../containerposts/postcomponent/PostComponent'
import './ModalSearchPost.css'

interface IModalEditProps {
    show: boolean
    onHide: () => void
    selectedPost: IPost
}

function ModalSearchPost(props: IModalEditProps) {
    const { user } = useContext(GlobalContext)
    const [post, setPost] = useState<IPost>({} as IPost)
    const [onceSubmit, setOnceSubmit] = useState<boolean>(false)

    const handleModalUpdatePost = useCallback(() => {
        if (onceSubmit) return

        axios
            .get(import.meta.env.VITE_API_URL + '/posts/' + post._id, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: import.meta.env.VITE_API_KEY,
                },
            })
            .then((response) => {
                setPost(response.data.post)
            })
            .finally(() => {
                setOnceSubmit(false)
            })
    }, [onceSubmit, post._id])

    useEffect(() => {
        setPost(props.selectedPost)
    }, [props.selectedPost])

    return (
        <>
            {user._id && (
                <Modal
                    show={props.show}
                    onHide={props.onHide}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Visualizando uma postagem de um usuário
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            Caso você não seja o autor da postagem, você só
                            poderá visualizar a postagem. Caso você faça alguma
                            alteração na postagem, será necessário clicar no
                            botão "Atualizar" para visualizar a postagem em seu
                            estado original.
                        </p>
                        {post._id && (
                            <section
                                className="container-posts"
                                style={{ marginTop: 0, paddingTop: 0 }}
                            >
                                <div className="content-posts">
                                    <PostComponent key={post._id} post={post} />
                                </div>
                            </section>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            className="modal-search-btn-update"
                            onClick={handleModalUpdatePost}
                            type="button"
                        >
                            Atualizar
                        </button>
                        <button
                            className="modal-edit-btn-close"
                            onClick={props.onHide}
                            type="button"
                        >
                            Fechar
                        </button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    )
}

export default ModalSearchPost
