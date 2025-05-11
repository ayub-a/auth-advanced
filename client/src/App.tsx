import { useContext, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"

import LoginForm from "./components/LoginForm"
import { UserService } from "./services/UserService"
import { StoreContext } from "."

import { IUser } from "./models/IUser"


const App = () => {

    const { store } = useContext(StoreContext)
    const [users, setUsers] = useState<IUser[]>([])

    
    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])


    const getUsers = async () => {
        try {
            const response = await UserService.fetchUsers()
            setUsers(response.data)
        } catch (error) {
            console.log(error)
        }
    }


    if (store.isLoading) return <div>Loading..</div>

    if (!store.isAuth) {
        return <div>
            <div>Auth Advanced</div>
            <LoginForm/>
            <button onClick={getUsers}>Get users</button>
            
            {
                users.length
                ?
                    <ul>
                        {
                            users.map(user => <li key={user.id}>{user.email}</li>)
                        }
                    </ul>
                : null
            }
        </div>
    }


    return <div>
        <div>Auth Advanced</div>

        <h3>{ store.user.isActivated ? 'Verified' : 'Verify your account!' }</h3>
        <h2>{ store.isAuth ? `User is authorized: ${store.user.email}` : 'Login' }</h2>

        <button onClick={() => store.logout()}>Exit</button>
        <button onClick={getUsers}>Get users</button>

       {
        users.length
            ?
            <ul>
                {
                    users.map(user => <li key={user.id}>{user.email}</li>)
                }
            </ul>
            : null
       }
    </div>
}


export default observer(App)
