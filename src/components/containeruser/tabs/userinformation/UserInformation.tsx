import UserLarge from '../../../../icons/UserLarge'
import './UserInformation.css'

function UserInformation() {
    return (
        <article className="user-information">
            <div className="user-menu-container">
                <div className="user-menu-picture">
                    <UserLarge />
                </div>
                <div className="user-menu-name">Joe Dawn</div>
            </div>

            <div className="user-information-details">
                <div className="user-information-details-item">
                    Se cadastrou desde <span>15 de abril de 2024</span>
                </div>
                <div className="user-information-details-item">
                    <span>10</span> postagens
                </div>
                <div className="user-information-details-item">
                    <span>420</span> curtidas
                </div>
                <div className="user-information-details-item">
                    <span>88</span> respostas recebidas em postagens
                </div>
                <div className="user-information-details-item">
                    <span>42</span> imagens compartilhadas
                </div>
                <div className="user-information-details-item">
                    <span>5</span> vídeos compartilhados
                </div>
            </div>
        </article>
    )
}

export default UserInformation
