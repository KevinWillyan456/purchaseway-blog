import React, {
    createContext,
    useState,
    Dispatch,
    SetStateAction,
    useEffect,
} from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import { IPost } from '../components/containerposts/ContainerPosts'

export interface IUser {
    _id: string
    nome: string
    senha: string
    email: string
    dataCriacao: Date
    curtidas: number
    posts: number
}

interface GlobalContextType {
    user: IUser
    posts: IPost[]
    setUser: Dispatch<SetStateAction<IUser>>
    setPosts: Dispatch<SetStateAction<IPost[]>>
}

export const GlobalContext = createContext<GlobalContextType>({
    user: {
        _id: '',
        nome: 'Carregando...',
        senha: '',
        email: '',
        dataCriacao: new Date(),
        curtidas: 0,
        posts: 0,
    },
    setUser: () => {},
    posts: [],
    setPosts: () => {},
})

interface ProviderProps {
    children: React.ReactNode
}

export function GlobalContextProvider({ children }: ProviderProps) {
    const [user, setUser] = useState<IUser>({
        _id: '',
        nome: 'Carregando...',
        senha: '',
        email: '',
        dataCriacao: new Date(),
        curtidas: 0,
        posts: 0,
    })
    const [posts, setPosts] = useState<IPost[]>([])

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
        <GlobalContext.Provider value={{ user, setUser, posts, setPosts }}>
            {children}
        </GlobalContext.Provider>
    )
}
