import { useContext, useState } from "react"
import { observer } from "mobx-react-lite"

import { StoreContext } from ".."


const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { store } = useContext(StoreContext)

    const loginHandler = () => store.login(email, password)

    const registrationHandler = () => store.registration(email, password)

    return <div>
        <div>
            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" value={email} />
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" value={password} />
            <button onClick={loginHandler}>Login</button>
            <button onClick={registrationHandler}>Registration</button>
        </div>

        {
            store.error
            ? <div>{store.error}</div>
            : null
        }
    </div>
}


export default observer(LoginForm)
