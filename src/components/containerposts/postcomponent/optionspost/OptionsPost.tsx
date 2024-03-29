import Bin from '../../../../icons/Bin'
import Gear from '../../../../icons/Gear'
import Pencil from '../../../../icons/Pencil'
import './OptionsPost.css'
import { useState } from 'react'
import ModalEdit from './modaledit/ModalEdit'
import ModalDelete from './modaldelete/ModalDelete'

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

export default OptionsPost
