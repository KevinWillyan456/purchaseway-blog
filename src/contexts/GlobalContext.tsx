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
export interface IPost {
    _id: string
    conteudo: { text: string; urlImg: string; title: string; videoId: string }
    respostas: IAnswer[]
    proprietario: string
    proprietarioId: string
    curtidas: string[]
    dataCriacao: Date
    wasEdited: boolean
}

export interface IAnswer {
    _id: string
    userId: string
    userName: string
    text: string
    curtidas: string[]
    dataCriacao: Date
    wasEdited: boolean
}

interface GlobalContextType {
    user: IUser
    posts: IPost[]
    setUser: Dispatch<SetStateAction<IUser>>
    setPosts: Dispatch<SetStateAction<IPost[]>>
    updatePosts: () => void
    updateUserData: () => void
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
    updatePosts: () => {},
    updateUserData: () => {},
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
        }
    }, [])

    const updatePosts = () => {
        axios
            .get(import.meta.env.VITE_API_URL + '/posts', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: import.meta.env.VITE_API_KEY,
                },
            })
            .then((response) => setPosts(response.data.posts))
    }

    const updateUserData = () => {
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
        }
    }

    return (
        <GlobalContext.Provider
            value={{
                user,
                setUser,
                posts,
                setPosts,
                updatePosts,
                updateUserData,
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}
