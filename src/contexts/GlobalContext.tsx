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

    const updatePosts = () => {
        const previousPosts: IPost[] = []

        axios
            .get(import.meta.env.VITE_API_URL + '/posts', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: import.meta.env.VITE_API_KEY,
                },
            })
            .then((response) => {
                response.data.posts.forEach((post: IPost) => {
                    previousPosts.push(post)
                })

                previousPosts.forEach((post) => {
                    if (!post.proprietario.match(/(\w{8}(-\w{4}){3}-\w{12}?)/g))
                        return

                    axios
                        .get(
                            import.meta.env.VITE_API_URL +
                                '/users/' +
                                post.proprietario,
                            {
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: import.meta.env.VITE_API_KEY,
                                },
                            }
                        )
                        .then((response) => {
                            previousPosts.forEach((prevPost) => {
                                if (prevPost._id === post._id) {
                                    prevPost.proprietario =
                                        response.data.user.nome
                                    prevPost.proprietarioId =
                                        response.data.user._id
                                }
                                return prevPost
                            })
                        })
                })

                previousPosts.forEach((post) => {
                    post.respostas.forEach((answer) => {
                        if (answer.userName) return

                        axios
                            .get(
                                import.meta.env.VITE_API_URL +
                                    '/users/' +
                                    answer.userId,
                                {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: import.meta.env
                                            .VITE_API_KEY,
                                    },
                                }
                            )
                            .then((response) => {
                                previousPosts.forEach((prevPost) => {
                                    if (prevPost._id === post._id) {
                                        prevPost.respostas.forEach(
                                            (prevAnswer) => {
                                                if (
                                                    prevAnswer._id ===
                                                    answer._id
                                                ) {
                                                    prevAnswer.userName =
                                                        response.data.user.nome
                                                }
                                                return prevAnswer
                                            }
                                        )
                                    }
                                    return prevPost
                                })
                            })
                    })
                })

                setTimeout(() => {
                    setPosts(previousPosts)
                }, 1000)
            })
    }

    return (
        <GlobalContext.Provider
            value={{ user, setUser, posts, setPosts, updatePosts }}
        >
            {children}
        </GlobalContext.Provider>
    )
}
