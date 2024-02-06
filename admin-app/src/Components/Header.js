import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faCalendarDays, faCircleUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useAdminContext } from "./Context";

export default function Header() {
    const { token, setToken } = useAdminContext();
    const [bookings, setBookings] = useState([]);
    const [users, setUsers] = useState([]);
    const [offices, setOffices] = useState([]);
    const navigate = useNavigate();
    async function fetchData() {
        try {
            const resp1 = await fetch("https://officelyapp.azurewebsites.net/api/booking/all-bookings", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            });
            if (resp1.ok) {
                const bookingsList = await resp1.json();
                setBookings(bookingsList);
            }
            const resp2 = await fetch("https://officelyapp.azurewebsites.net/api/office", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (resp2.ok) {
                const officesList = await resp2.json();
                setOffices(officesList);
            }
            const resp3 = await fetch("https://officelyapp.azurewebsites.net/api/user/all-users", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (resp3.ok) {
                const usersList = await resp3.json();
                setUsers(usersList);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    if (!token) {
        return (
            <div className="container is-flex is-justify-content-center is-flex-direction-column is-align-self-center is-align-content-center">
                <h1 className='title is-2 has-text-danger-dark has-text-centered'>You don't have access to this page. Please log in with administrator credentials.</h1>
                <a className='title link has-text-centered has-text-link is-4' href='/'>Log in</a>
            </div>
        );
    }
    return (
        <div>
            <div className='navbar is-info'>
                <div className='navbar-menu'>
                    <div className='navbar-start'>
                        <NavLink className="navbar-item" to="/main/offices">
                            <span className="icon-text">
                                <span className="icon">
                                    <FontAwesomeIcon icon={faBriefcase} />
                                </span>
                                <span>View/manage offices</span>
                            </span>
                        </NavLink>
                        <NavLink className="navbar-item" to="/main/bookings">
                            <span className="icon-text">
                                <span className="icon">
                                    <FontAwesomeIcon icon={faCalendarDays} />
                                </span>
                                <span>View/manage bookings</span>
                            </span>
                        </NavLink>
                        <NavLink className="navbar-item" to="/main/users">
                            <span className="icon-text">
                                <span className="icon">
                                    <FontAwesomeIcon icon={faCircleUser} />
                                </span>
                                <span>View/manage users</span>
                            </span>
                        </NavLink>
                    </div>
                    <div className='navbar-end'>
                        <NavLink className="navbar-item is-right" onClick={e => { setToken(''); navigate('/') }}>
                            <span className="icon-text">
                                <span className="icon">
                                    <FontAwesomeIcon icon={faRightFromBracket} />
                                </span>
                                <span>Sign out</span>
                            </span>
                        </NavLink>
                    </div>
                </div></div>
            <Outlet context={{ bookings, offices, users, setBookings, setUsers, setOffices }} />
        </div>
    );
}