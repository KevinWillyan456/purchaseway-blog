import { GoogleOAuthProvider } from '@react-oauth/google'
import Header from '../components/header/Header'
import MainSingIn from '../components/mainsingin/MainSingIn'

function SingIn() {
    return (
        <>
            <GoogleOAuthProvider
                clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
            >
                <Header />
                <MainSingIn />
            </GoogleOAuthProvider>
        </>
    )
}

export default SingIn
