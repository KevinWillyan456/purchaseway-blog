import './MainDashboard.css'
import UserContent from '../usercontent/UserContent'
import UserPost from '../userpost/UserPost'
import ContainerPosts from '../containerposts/ContainerPosts'
import Up from '../../icons/Up'
import { useEffect, useState } from 'react'
import ContainerUser from '../containeruser/ContainerUser'

type TabSelected = 'postagens' | 'perfil'

function MainDashboard() {
    const [isVisible, setIsVisible] = useState(false)
    const [tabSelected, setTabSelected] = useState<TabSelected>('postagens')

    const handleScroll = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    const handleTabSelected = (tab: TabSelected) => {
        if (tab === tabSelected) return
        setTabSelected(tab)
    }

    useEffect(() => {
        const onScroll = () => {
            const scrollPosition = window.scrollY
            setIsVisible(scrollPosition > 300)
        }

        window.addEventListener('scroll', onScroll)

        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    }, [])

    return (
        <main className="main-dashboard">
            <div className="main-dashboard-content">
                <div className="dashboard-header">
                    <UserContent />
                    <UserPost />
                </div>
                <section className="menu-dashboard">
                    <button
                        className={`menu-dashboard-tab${
                            tabSelected === 'postagens' ? '-selected' : ''
                        }`}
                        onClick={() => handleTabSelected('postagens')}
                    >
                        Postagens
                    </button>
                    <button
                        className={`menu-dashboard-tab${
                            tabSelected === 'perfil' ? '-selected' : ''
                        }`}
                        onClick={() => handleTabSelected('perfil')}
                    >
                        Perfil
                    </button>
                </section>
                {tabSelected === 'postagens' ? (
                    <ContainerPosts />
                ) : (
                    <ContainerUser />
                )}
            </div>
            {isVisible && (
                <button className="up-button" onClick={handleScroll}>
                    <Up />
                </button>
            )}
        </main>
    )
}

export default MainDashboard
