import { useState, useEffect } from 'react'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import MainDashboard from '../components/maindashboard/MainDashboard'
import authenticate from '../utils/AuthUtils'
import { GlobalContextProvider } from '../contexts/GlobalContext'

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
                <GlobalContextProvider>
                    <Header />
                    <MainDashboard />
                    <Footer />
                </GlobalContextProvider>
            ) : !requestHasEnded ? (
                <section
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        gap: '16px',
                        height: '100vh',
                        fontSize: '24px',
                        color: 'var(--color-dark)',
                        maxWidth: '600px',
                        width: 'calc(100% - 40px)',
                        margin: '0 auto',
                        fontWeight: 'bold',
                    }}
                >
                    Aguarde...
                    <p
                        style={{
                            fontSize: '20px',
                            color: 'var(--color-dark)',
                            textAlign: 'justify',
                            fontWeight: 'normal',
                        }}
                    >
                        Estamos verificando se você está autenticado. Caso não
                        seja redirecionado para a página de login em alguns
                        segundos,{' '}
                        <a
                            href="/login"
                            style={{
                                color: 'var(--color-dark)',
                                textDecoration: 'none',
                                borderBottom: '1px solid var(--color-dark)',
                                fontWeight: 'bold',
                            }}
                        >
                            clique aqui
                        </a>
                        .
                    </p>
                </section>
            ) : (
                requestHasEnded && (window.location.href = '/login')
            )}
        </>
    )
}

export default Dashboard
