import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowUpAZ } from '@fortawesome/free-solid-svg-icons';
import UserItem from "./UserItem";
import { useOutletContext } from "react-router-dom";
import { useAdminContext } from "./Context";

export default function UsersPage() {
    const { users, setUsers } = useOutletContext();
    const [email, setEmail] = useState('');
    const { token } = useAdminContext();
    async function search() {
        if (email.length === 0) {
            try {
                const res = await fetch("https://officelyapp.azurewebsites.net/api/user/all-users", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await res.json();
                if (res.ok) {
                    setUsers([data]);
                }
            }
            catch (e) {
                console.log(e);
            }
            return;
        }
        try {
            const res = await fetch(`https://officelyapp.azurewebsites.net/api/user/email-search/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await res.json();
            if (res.ok) {
                setUsers([data]);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    return (
        <div className="columns">
            <div className="column is-one-quarter">
                <input className="input is-info m-2" onChange={e => setEmail(e.target.value)} placeholder='User email' type="text" />
                <div className="buttons m-2">
                    <button className='button is-info' onClick={search}>
                        <span className="icon-text">
                            <span className="icon">
                                <FontAwesomeIcon icon={faSearch} />
                            </span>
                            <span>Search</span>
                        </span>
                    </button>
                    <button className='button is-info' onClick={e => {
                        setUsers(prev => [...prev].sort((u1, u2) => {
                            const firstNameA = u1.firstName.toLowerCase();
                            const firstNameB = u2.firstName.toLowerCase();

                            if (firstNameA < firstNameB) {
                                return -1;
                            }
                            if (firstNameA > firstNameB) {
                                return 1;
                            }
                            return 0;
                        }))
                    }}>
                        <span className="icon-text">
                            <span className="icon">
                                <FontAwesomeIcon icon={faArrowUpAZ} />
                            </span>
                            <span>Sort by name</span>
                        </span>
                    </button>
                </div>
            </div>
            <div className="column">{users.map(user => <UserItem key={user.email} user={user} />)}</div>
        </div>
    );
}