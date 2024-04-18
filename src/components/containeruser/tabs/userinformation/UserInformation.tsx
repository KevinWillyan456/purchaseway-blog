import { useContext } from 'react'
import UserLarge from '../../../../icons/UserLarge'
import './UserInformation.css'
import { GlobalContext } from '../../../../contexts/GlobalContext'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

function UserInformation() {
    const { userInfo } = useContext(GlobalContext)

    return (
        <article className="user-information">
            <div className="user-menu-container">
                <div className="user-menu-picture">
                    <UserLarge />
                </div>
                <div className="user-menu-name">{userInfo.nome}</div>
            </div>

            <div className="user-information-details">
                <div className="user-information-details-item">
                    Se cadastrou desde o dia{' '}
                    <span>
                        {format(
                            new Date(userInfo.dataCriacao),
                            "dd 'de' MMMM 'de' yyyy",
                            {
                                locale: ptBR,
                            }
                        )}
                    </span>
                </div>
                <div className="user-information-details-item">
                    <span>{userInfo.posts}</span> postagens criadas
                </div>
                <div className="user-information-details-item">
                    <span>{userInfo.curtidasPosts}</span> curtidas recebidas em
                    postagens
                </div>
                <div className="user-information-details-item">
                    <span>{userInfo.respostasPosts}</span> respostas recebidas
                    em postagens
                </div>
                <div className="user-information-details-item">
                    <span>{userInfo.imagensCompartilhadas}</span> imagens
                    compartilhadas em postagens
                </div>
                <div className="user-information-details-item">
                    <span>{userInfo.videosCompartilhados}</span> vídeos
                    compartilhados em postagens
                </div>
            </div>
        </article>
    )
}

export default UserInformation
