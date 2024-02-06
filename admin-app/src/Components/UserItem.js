import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useOutletContext } from "react-router-dom";
import { useAdminContext } from "./Context";

export default function UserItem({ user }) {
    const { token } = useAdminContext();
    const { setUsers } = useOutletContext();
    const dialogId = `delete-user-${user.email.replace(/[@.]/g, '-')}`;
    async function deleteItem(user) {
        try {
            const res = await fetch(`https://officelyapp.azurewebsites.net/api/user/delete-admin/${user.email}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ email: user.email }),
            })
            if (res.ok) {
                setUsers(prev => prev.filter(u => u.email !== user.email));
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    return (
        <div className="box">
            <div className="media">
                <div className="media-content">
                    <p className="title is-5">
                        <span className="icon-text">
                            <span className="icon">
                                <FontAwesomeIcon icon={faUser} />
                            </span>
                            <span>{user.firstName} {user.lastName}</span>
                        </span>
                    </p>
                    <p className="subtitle is-6">
                        <span className="icon-text">
                            <span className="icon">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </span>
                            <span>{user.email}</span>
                        </span>
                    </p>
                </div>
                <div className="media-right">
                    <p className="title is-5 fa-hover" onClick={e => document.getElementById(dialogId).showModal()} ><FontAwesomeIcon icon={faTrash} /></p>
                </div>
            </div>
            <dialog id={dialogId}>
                <h3 className='title is-4 has-text-danger-dark'>Do you want to delete this user?</h3>
                <p className="title is-5">{user.firstName} {user.lastName}</p>
                <p className="subtitle is-6">{user.email}</p>
                {/*<input className='input is-primary' type='text' placeholder='Comment for user' />*/}
                <div className='is-flex is-justify-content-space-between'>
                    <button className='button is-primary' onClick={e => document.getElementById(dialogId).close()}>Cancel</button>
                    <button className='button is-danger' onClick={e => deleteItem(user)}>Delete</button>
                </div>
            </dialog>
        </div>
    );
}