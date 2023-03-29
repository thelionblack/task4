import React, {createContext, Dispatch, SetStateAction, useState} from "react";

type Table = {
    id: number
    email: string
    name: string
    status: string
    createdAt: string
    updatedAt: string
    password: string
    isChecked: boolean
}

interface IUserTable {
    table: Array<Table>
    setTable: Dispatch<SetStateAction<Array<Table>>>
}
interface IIsAuth {
    isAuth: boolean
    setIsAuth: Dispatch<SetStateAction<boolean>>
}

const defaultState = {
    table: [{}],
    setTable: (table: Array<Table>) => {}
} as IUserTable

const defaultStateIsAuth = {
    isAuth: false,
    setIsAuth: (isAuth: boolean) => {}
} as IIsAuth


export const UserContext = createContext<IUserTable>(defaultState)
export const isAuthContext = createContext<IIsAuth>(defaultStateIsAuth)

type Props = {
    children: React.ReactNode
}

export const UserProvider = ({children} : Props) => {
    const [isAuth, setIsAuth] = useState<boolean>(defaultStateIsAuth.isAuth)
    const [table, setTable] = useState<Array<Table>>(defaultState.table)

    return (
        <isAuthContext.Provider value={{isAuth, setIsAuth}}>
            <UserContext.Provider value={{ table, setTable }}>
                {children}
            </UserContext.Provider>
        </isAuthContext.Provider>
    )
}