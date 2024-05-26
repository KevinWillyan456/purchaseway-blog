import axios from 'axios'

function checkTokenInCookie(): boolean {
    const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
    )
    return !!token
}

async function verifyToken(token: string): Promise<boolean> {
    try {
        const response = await axios.post(
            import.meta.env.VITE_API_URL + '/verify-token',
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: import.meta.env.VITE_API_KEY,
                    token,
                },
            }
        )

        return response.data.valid
    } catch (error) {
        return false
    }
}

async function authenticate(): Promise<boolean> {
    const tokenExists = checkTokenInCookie()

    if (tokenExists) {
        const token = document.cookie.replace(
            /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
            '$1'
        )
        const isValid = await verifyToken(token)

        if (isValid) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}

export default authenticate
