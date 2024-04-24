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
    email: string
    dataCriacao: Date
    curtidas: number
    posts: number
    fotoPerfil: string
}

const userEmpty: IUser = {
    _id: '',
    nome: 'Carregando...',
    email: '',
    dataCriacao: new Date(),
    curtidas: 0,
    posts: 0,
    fotoPerfil: '',
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
    fotoPerfil: string
}

export interface IAnswer {
    _id: string
    userId: string
    userName: string
    text: string
    curtidas: string[]
    dataCriacao: Date
    wasEdited: boolean
    fotoPerfil: string
}

interface IUserInfo {
    nome: string
    dataCriacao: Date
    posts: number
    curtidasPosts: number
    respostasPosts: number
    imagensCompartilhadas: number
    videosCompartilhados: number
}

const userInfoEmpty: IUserInfo = {
    nome: 'Carregando...',
    dataCriacao: new Date(),
    posts: 0,
    curtidasPosts: 0,
    respostasPosts: 0,
    imagensCompartilhadas: 0,
    videosCompartilhados: 0,
}

interface GlobalContextType {
    user: IUser
    setUser: Dispatch<SetStateAction<IUser>>
    posts: IPost[]
    setPosts: Dispatch<SetStateAction<IPost[]>>
    emptyPosts: boolean
    setEmptyPosts: Dispatch<SetStateAction<boolean>>
    error: boolean
    setError: Dispatch<SetStateAction<boolean>>
    userInfo: IUserInfo
    setUserInfo: Dispatch<SetStateAction<IUserInfo>>

    updatePosts: () => void
    updateUserData: () => void
    updateUserInfo: () => void
}

export const GlobalContext = createContext<GlobalContextType>({
    user: userEmpty,
    userInfo: userInfoEmpty,
    setUserInfo: () => {},
    setUser: () => {},
    posts: [],
    emptyPosts: false,
    setEmptyPosts: () => {},
    error: false,
    setError: () => {},
    setPosts: () => {},
    updatePosts: () => {},
    updateUserData: () => {},
    updateUserInfo: () => {},
})

interface ProviderProps {
    children: React.ReactNode
}

export function GlobalContextProvider({ children }: ProviderProps) {
    const [user, setUser] = useState<IUser>(userEmpty)
    const [posts, setPosts] = useState<IPost[]>([])
    const [emptyPosts, setEmptyPosts] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [userInfo, setUserInfo] = useState<IUserInfo>(userInfoEmpty)

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
                        email: response.data.user.email,
                        dataCriacao: response.data.user.dataCriacao,
                        curtidas: response.data.user.curtidas,
                        fotoPerfil: response.data.user.fotoPerfil,
                        posts: response.data.posts,
                    })
                })
                .catch(() => {
                    Cookies.remove('token')
                    setUser(userEmpty)
                    window.location.href = '/login'
                })

            axios
                .get(import.meta.env.VITE_API_URL + '/get-user-info', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: import.meta.env.VITE_API_KEY,
                        token,
                    },
                })
                .then((response) => {
                    setUserInfo({
                        nome: response.data.user.nome,
                        dataCriacao: response.data.user.dataCriacao,
                        posts: response.data.user.posts,
                        curtidasPosts: response.data.user.curtidasPosts,
                        respostasPosts: response.data.user.respostasPosts,
                        imagensCompartilhadas:
                            response.data.user.imagensCompartilhadas,
                        videosCompartilhados:
                            response.data.user.videosCompartilhados,
                    })
                })
                .catch(() => {
                    Cookies.remove('token')
                    setUser(userEmpty)
                    window.location.href = '/login'
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
            .then((response) => {
                if (response.data.length === 0) {
                    setEmptyPosts(true)
                } else {
                    setPosts(response.data.posts)
                }
            })
            .catch(() => {
                setError(true)
            })
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
                        email: response.data.user.email,
                        dataCriacao: response.data.user.dataCriacao,
                        curtidas: response.data.user.curtidas,
                        fotoPerfil: response.data.user.fotoPerfil,
                        posts: response.data.posts,
                    })
                })
        }
    }

    const updateUserInfo = () => {
        const token = Cookies.get('token')

        if (token) {
            axios
                .get(import.meta.env.VITE_API_URL + '/get-user-info', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: import.meta.env.VITE_API_KEY,
                        token,
                    },
                })
                .then((response) => {
                    setUserInfo({
                        nome: response.data.user.nome,
                        dataCriacao: response.data.user.dataCriacao,
                        posts: response.data.user.posts,
                        curtidasPosts: response.data.user.curtidasPosts,
                        respostasPosts: response.data.user.respostasPosts,
                        imagensCompartilhadas:
                            response.data.user.imagensCompartilhadas,
                        videosCompartilhados:
                            response.data.user.videosCompartilhados,
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
                emptyPosts,
                setEmptyPosts,
                error,
                userInfo,
                setUserInfo,
                setError,
                updatePosts,
                updateUserData,
                updateUserInfo,
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}
