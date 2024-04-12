import './MainDashboard.css'
import UserContent from '../usercontent/UserContent'
import UserPost from '../userpost/UserPost'
import ContainerPosts from '../containerposts/ContainerPosts'
import Up from '../../icons/Up'
import { useEffect, useState } from 'react'

function MainDashboard() {
    const [isVisible, setIsVisible] = useState(false)

    const handleScroll = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
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
                <ContainerPosts />
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
