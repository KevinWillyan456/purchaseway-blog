import { useState } from 'react'
import './ContainerUser.css'
import UserInformation from './tabs/userinformation/UserInformation'
import UserEdit from './tabs/useredit/UserEdit'
import UserAccount from './tabs/useraccount/UserAccount'

type TabSelected = 'informacoes' | 'editar' | 'conta'

function ContainerUser() {
    const [tabSelected, setTabSelected] = useState<TabSelected>('informacoes')

    const handleTabSelected = (tab: TabSelected) => {
        if (tab === tabSelected) return
        setTabSelected(tab)
    }

    return (
        <section className="container-user">
            <article className="menu-user">
                <button
                    className={
                        'menu-tab' +
                        (tabSelected === 'informacoes'
                            ? ' selected'
                            : ' unselected')
                    }
                    onClick={() => handleTabSelected('informacoes')}
                >
                    Informações
                </button>
                <button
                    className={
                        'menu-tab' +
                        (tabSelected === 'editar' ? ' selected' : ' unselected')
                    }
                    onClick={() => handleTabSelected('editar')}
                >
                    Editar
                </button>
                <button
                    className={
                        'menu-tab' +
                        (tabSelected === 'conta' ? ' selected' : ' unselected')
                    }
                    onClick={() => handleTabSelected('conta')}
                >
                    Conta
                </button>
            </article>
            <section className="content-user">
                {tabSelected === 'informacoes' ? (
                    <UserInformation />
                ) : tabSelected === 'editar' ? (
                    <UserEdit />
                ) : (
                    <UserAccount />
                )}
            </section>
        </section>
    )
}

export default ContainerUser
