import React, {useContext, useEffect, useState} from 'react';
import {OverlayTrigger, Table} from "react-bootstrap";
import {isAuthContext, UserContext} from "../components/Context";
import jwtDecode from "jwt-decode";
import {useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";

const Auth = () => {
    const {table, setTable} = useContext(UserContext)
    const {isAuth, setIsAuth} = useContext(isAuthContext)
    const [check, setCheck] = useState(false)
    const [countAction, setCountAction] = useState(false)
    const navigate = useNavigate()

    const deletePerson = async (event: React.MouseEvent) => {
        event.preventDefault()
        const response = await fetch(`https://task4server-wwgb.onrender.com/api/auth/delete`, {
            method: 'delete',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                table,
                email: localStorage.getItem('email')
            }),
        })
        const data = await response.json()
        console.log(data)
        if (data.status !== 200) return
        if (data.token) {
            localStorage.removeItem('token')
            setIsAuth(false)

        }

        for (let i = 0; i < data.table.length; i++) {
            if (data.table[i].isChecked) {
                data.table.splice(i, 1)
                i = i - 1
            }
        }
        setTable(data.table)
        if (countAction) {
            navigate('/')
            setIsAuth(false)
        }
        else setCountAction(true)
    }

    const onToggleCheck = (event: React.ChangeEvent<HTMLInputElement>, i: any) => {
        setTable(prev => prev.map(item => {
            if(item.id===i){
                return {...item, isChecked: !item.isChecked}
            }
            return item
        }))
        if (countAction) {
            navigate('/')
            setIsAuth(false)
        }
    }
    const onToggleCheckALl = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheck(!check)
        setTable(prev => prev.map(item => {
            return {...item, isChecked: !check}
        }))
        if (countAction) {
            navigate('/')
            setIsAuth(false)
        }
    }
    const onBlock = () => {
        setTable(prev => prev.map(item => {
            if(item.isChecked){
                if(item.email === localStorage.getItem('email')) setIsAuth(false);

                const fetchReq = async (item: { id: any; email?: string; name?: string; status: any; createdAt?: string; updatedAt?: string; password?: string; isChecked?: boolean; }) => {

                    if (!item) return
                    const {status, id} = item
                    const response = await fetch(`https://task4server-wwgb.onrender.com/api/auth/update`, {
                        method: 'Put',
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify({
                            status: 'Block',
                            id: id
                        })
                    })
                    const data = await response.json()
                }
                fetchReq(item)
                if (countAction) navigate('/')
                else setCountAction(true)
                return {...item, status: 'Block'}
            }
            return item
        }))
        if (countAction) {
            navigate('/')
            setIsAuth(false)
        }
        else setCountAction(true)
    }
    const onUnBlock = () => {
        setTable(prev => prev.map(item => {
            if(item.isChecked){
                const fetchReq = async (item: { id: any; email?: string; name?: string; status: any; createdAt?: string; updatedAt?: string; password?: string; isChecked?: boolean; }) => {

                    if (!item) return
                    const {status, id} = item
                    const response = await fetch(`https://task4server-wwgb.onrender.com/api/auth/update`, {
                        method: 'Put',
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify({
                            status: 'UnBlock',
                            id: id
                        })
                    })
                    const data = await response.json()
                }
                fetchReq(item)
                return {...item, status: 'UnBlock'}
            }
            return item
        }))
        if (countAction) {
            navigate('/')
            setIsAuth(false)
        }
    }



    return (
        <>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>
                        <input
                            className="form-check-input-lg"
                            type="checkbox"
                            checked={check}
                            id="checkboxNoLabel"
                            aria-label="..."
                            onChange={onToggleCheckALl}
                        />
                    </th>
                    <th>id</th>
                    <th>name</th>
                    <th>email</th>
                    <th>createdAt</th>
                    <th>updatedAt</th>
                    <th>status</th>
                </tr>
                </thead>
                <tbody>
                {table.map((e,i) => {
                    return (

                        <tr key={i}>
                            <td>
                                <input className="form-check-input-lg"
                                       type="checkbox"
                                       checked={Boolean(e.isChecked)}
                                       id="checkboxNoLabel"
                                       aria-label="..."
                                       onChange={(event) => onToggleCheck(event, e.id)}
                                />
                            </td>
                            <td>{e.id}</td>
                            <td>{e.name}</td>
                            <td>{e.email}</td>
                            <td>{e.createdAt}</td>
                            <td>{e.updatedAt}</td>
                            <td>{e.status}</td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
            <div className='mb-4' style={{textAlign: "center"}}>
                <Button
                    className='me-4'
                    onClick={onBlock}
                    variant='outline-danger'
                >
                    Block
                </Button>
                <Button
                    className='me-4'
                    onClick={onUnBlock}
                    variant='outline-danger'
                >
                    UnBlock
                </Button>
                <Button
                    onClick={deletePerson}
                    variant='outline-danger'
                >
                    Delete
                </Button>
            </div>
        </>
    );
};

export default Auth;