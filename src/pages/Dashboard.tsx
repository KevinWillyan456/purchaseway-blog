import { useState, useEffect } from 'react'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import MainDashboard from '../components/maindashboard/MainDashboard'
import authenticate from '../utils/AuthUtils'
import { UserContextProvider } from '../contexts/UserContext'

function Dashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [requestHasEnded, setRequestHasEnded] = useState(false)

    useEffect(() => {
        async function checkAuthentication() {
            const authenticated = await authenticate()
            setIsAuthenticated(authenticated)
            setRequestHasEnded(true)
        }
        checkAuthentication()
    }, [])

    return (
        <>
            {isAuthenticated ? (
                <UserContextProvider>
                    <Header />
                    <MainDashboard />
                    <Footer />
                </UserContextProvider>
            ) : (
                requestHasEnded && (window.location.href = '/login')
            )}
        </>
    )
}

export default Dashboard
