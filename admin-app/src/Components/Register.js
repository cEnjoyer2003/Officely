import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "./Context";

export default function Register() {
    const { setToken } = useAdminContext();
    const [email, setEmail] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    async function register() {
        if (!email || !firstName || !lastName || !password) return;
        try {
            const res = await fetch(`https://officelyapp.azurewebsites.net/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, firstName, lastName }),
            });
            if (res.ok) {
                const token = res.json();
                setToken(token.token);
                navigate('/main');
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    return (
        <div>
            <input onChange={e => setEmail(e.target.value)} type="text" placeholder="Email" />
            <input onChange={e => setFirstName(e.target.value)} type="text" placeholder="First name" />
            <input onChange={e => setLastName(e.target.value)} type="text" placeholder="Last name" />
            <input onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
            <button onClick={register}>Register</button>
        </div>
    );
}