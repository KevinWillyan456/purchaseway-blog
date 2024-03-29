import './OptionsAnswer.css'
import { useState } from 'react'
import Bin from '../../../../icons/Bin'
import Gear from '../../../../icons/Gear'
import Pencil from '../../../../icons/Pencil'
import ModalEdit from './modaledit/ModalEdit'
import ModalDelete from './modaldelete/ModalDelete'

function OptionsAnswer({
    answerId,
    postId,
    text,
}: {
    postId: string
    answerId: string
    text: string
}) {
    const [deleteModalShow, setDeleteModalShow] = useState<boolean>(false)
    const [editModalShow, setEditModalShow] = useState<boolean>(false)

    return (
        <>
            <div className="dropdown options-answer">
                <button
                    className="options-answer-icon dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                >
                    <Gear />
                </button>

                <ul className="dropdown-menu">
                    <li>
                        <button
                            className="dropdown-item options-answer-item"
                            type="button"
                            onClick={() => setEditModalShow(true)}
                        >
                            <Pencil />
                            Editar
                        </button>
                    </li>
                    <li>
                        <button
                            className="dropdown-item options-answer-item"
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
                answerId={answerId}
            />

            <ModalEdit
                show={editModalShow}
                onHide={() => setEditModalShow(false)}
                postId={postId}
                answerId={answerId}
                text={text}
            />
        </>
    )
}

export default OptionsAnswer
