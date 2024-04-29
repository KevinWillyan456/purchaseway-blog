import { useCallback, useContext, useEffect, useState } from 'react'
import { GlobalContext, IPost } from '../../../contexts/GlobalContext'
import axios from 'axios'
import { Modal } from 'react-bootstrap'
import PostComponent from '../../containerposts/postcomponent/PostComponent'

interface IModalEditProps {
    show: boolean
    onHide: () => void
    selectedPost: IPost
}

function ModalSearchPost(props: IModalEditProps) {
    const { user } = useContext(GlobalContext)
    const [post, setPost] = useState<IPost>({} as IPost)
    const handleModalUpdatePost = useCallback(() => {
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
    }, [post._id])

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
                    <Modal.Body onClick={handleModalUpdatePost}>
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
                            className="modal-edit-btn-close"
                            onClick={() => {
                                props.onHide()
                            }}
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
