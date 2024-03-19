import React, {
    createContext,
    useState,
    Dispatch,
    SetStateAction,
    useEffect,
} from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'

export interface IUser {
    _id: string
    nome: string
    senha: string
    email: string
    dataCriacao: Date
    curtidas: number
    posts: number
}

interface UserContextType {
    user: IUser
    setUser: Dispatch<SetStateAction<IUser>>
}

export const UserContext = createContext<UserContextType>({
    user: {
        _id: '',
        nome: '',
        senha: '',
        email: '',
        dataCriacao: new Date(),
        curtidas: 0,
        posts: 0,
    },
    setUser: () => {},
})

interface ProviderProps {
    children: React.ReactNode
}

export function UserContextProvider({ children }: ProviderProps) {
    const [user, setUser] = useState<IUser>({
        _id: '',
        nome: '',
        senha: '',
        email: '',
        dataCriacao: new Date(),
        curtidas: 0,
        posts: 0,
    })

    useEffect(() => {
        const token = Cookies.get('token')

        if (token) {
            axios
                .get(import.meta.env.VITE_API_URL + '/get-user-by-token', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: import.meta.env.VITE_API_KEY,
                        token,
                    },
                })
                .then((response) => {
                    setUser({
                        _id: response.data.user._id,
                        nome: response.data.user.nome,
                        senha: response.data.user.senha,
                        email: response.data.user.email,
                        dataCriacao: response.data.user.dataCriacao,
                        curtidas: response.data.user.curtidas,
                        posts: response.data.posts,
                    })
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}
