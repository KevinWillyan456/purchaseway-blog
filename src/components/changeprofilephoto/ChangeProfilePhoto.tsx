import { useContext, useEffect, useState } from 'react'
import './ChangeProfilePhoto.css'
import { Form, Modal } from 'react-bootstrap'
import AlertComponent from '../alertcomponent/AlertComponent'
import axios from 'axios'
import { GlobalContext } from '../../contexts/GlobalContext'
import UserLarge from '../../icons/UserLarge'

interface IChangeProfilePhotoProps {
    show: boolean
    onHide: () => void
}

function ChangeProfilePhoto(props: IChangeProfilePhotoProps) {
    const { user, updateUserData, updateUserPosts } = useContext(GlobalContext)
    const [photo, setPhoto] = useState<string>(user.fotoPerfil)
    const [removePhoto, setRemovePhoto] = useState<boolean>(
        user.fotoPerfil === ''
    )
    const [invalidPhoto, setInvalidPhoto] = useState<boolean>(false)

    const [showAlertComponent, setShowAlertComponent] = useState(false)
    const [messageAlertComponent, setMessageAlertComponent] =
        useState<string>('')
    const [typeAlertComponent, setTypeAlertComponent] = useState<
        'success' | 'error'
    >('success')
    const [onceSubmit, setOnceSubmit] = useState<boolean>(false)

    useEffect(() => {
        setPhoto(user.fotoPerfil)
        setRemovePhoto(user.fotoPerfil === '')
    }, [user])

    useEffect(() => {
        setInvalidPhoto(false)

        if (photo === '') {
            setInvalidPhoto(false)
            return
        }

        const img = new Image()
        img.src = photo

        img.onload = () => {
            setInvalidPhoto(false)
        }

        img.onerror = () => {
            setInvalidPhoto(true)
        }
    }, [photo])

    const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (photo === '' && !removePhoto) {
            setShowAlertComponent(true)
            setMessageAlertComponent('URL da imagem não pode ser vazio')
            setTypeAlertComponent('error')
            document.getElementById('exampleForm.ControlInput4')?.focus()

            setTimeout(() => {
                setShowAlertComponent(false)
            }, 3000)
            return
        }

        if (invalidPhoto && !removePhoto) {
            setShowAlertComponent(true)
            setMessageAlertComponent('URL da imagem inválida')
            setTypeAlertComponent('error')
            document.getElementById('exampleForm.ControlInput4')?.focus()

            setTimeout(() => {
                setShowAlertComponent(false)
            }, 3000)
            return
        }

        if (onceSubmit) return
        setOnceSubmit(true)

        axios
            .put(
                import.meta.env.VITE_API_URL + '/users/' + user._id,

                {
                    fotoPerfil: removePhoto ? '' : photo,
                    nome: user.nome,
                },
                {
                    headers: {
                        Authorization: import.meta.env.VITE_API_KEY,
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then(() => {
                setShowAlertComponent(true)
                setMessageAlertComponent('Foto de perfil alterada com sucesso')
                setTypeAlertComponent('success')

                props.onHide()

                if (removePhoto) {
                    setPhoto('')
                }

                setTimeout(() => {
                    setShowAlertComponent(false)
                }, 3000)
            })
            .catch(() => {
                setShowAlertComponent(true)
                setMessageAlertComponent(
                    'Erro ao alterar foto de perfil, tente novamente'
                )
                setTypeAlertComponent('error')

                setTimeout(() => {
                    setShowAlertComponent(false)
                }, 3000)
            })
            .finally(() => {
                updateUserData()
                updateUserPosts()
                setOnceSubmit(false)
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
                        <Modal.Title>Editar foto de perfil</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {photo === '' || !invalidPhoto || removePhoto ? (
                            <div className="modal-edit-profile-photo">
                                {photo === '' || removePhoto ? (
                                    <UserLarge />
                                ) : (
                                    <img src={photo} alt="Foto de perfil" />
                                )}
                            </div>
                        ) : (
                            <h5 className="modal-edit-profile-photo-invalid">
                                Foto inválida
                            </h5>
                        )}
                        {!removePhoto && (
                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlInput4"
                            >
                                <Form.Label>URL da imagem</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="URL da imagem"
                                    autoFocus
                                    value={photo}
                                    required
                                    onChange={(e) => setPhoto(e.target.value)}
                                />
                            </Form.Group>
                        )}
                        <button
                            onClick={() => setRemovePhoto(!removePhoto)}
                            type="button"
                            className="modal-edit-profile-photo-btn-remove-img"
                        >
                            {removePhoto ? 'Adicionar foto' : 'Remover foto'}
                        </button>
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

            <AlertComponent
                show={showAlertComponent}
                onHide={() => setShowAlertComponent(false)}
                message={messageAlertComponent}
                type={typeAlertComponent}
            />
        </>
    )
}

export default ChangeProfilePhoto
