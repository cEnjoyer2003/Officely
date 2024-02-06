import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "./Context";

export default function Login() {
    const { setToken } = useAdminContext();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    async function login() {
        if (!email || !password) return;
        try {
            const res = await fetch(`https://officelyapp.azurewebsites.net/api/auth/authenticate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (res.ok) {
                const token = await res.json();
                setToken(token.token);
                navigate('/main');
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    return (
        <div className="container is-flex is-justify-content-center is-flex-direction-column is-align-self-center is-align-content-center m-5">
            <h1 className="title is-2 has-text-centered m-2">Log in</h1>
            <input className="input is-primary m-2" onChange={e => setEmail(e.target.value)} type="text" placeholder="Email" />
            <input className="input is-primary m-2" onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
            <button className="button is-primary has-text-centered m-2" onClick={login}>Log in</button>
        </div>
    );
}