import { useEffect, useState } from 'react'
import Header from '../components/header/Header'
import MainLogin from '../components/mainlogin/MainLogin'
import authenticate from '../utils/AuthUtils'
import { GoogleOAuthProvider } from '@react-oauth/google'

function Login() {
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
            {isAuthenticated
                ? (window.location.href = '/dashboard')
                : requestHasEnded && (
                      <>
                          <GoogleOAuthProvider
                              clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
                          >
                              <Header />
                              <MainLogin />
                          </GoogleOAuthProvider>
                      </>
                  )}
        </>
    )
}

export default Login
