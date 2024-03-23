import Bin from '../../../../icons/Bin'
import Gear from '../../../../icons/Gear'
import Pencil from '../../../../icons/Pencil'
import './OptionsPost.css'

function OptionsPost() {
    return (
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
                    >
                        <Pencil />
                        Editar
                    </button>
                </li>
                <li>
                    <button
                        className="dropdown-item options-post-item"
                        type="button"
                    >
                        <Bin />
                        Excluir
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default OptionsPost
