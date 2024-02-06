import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowUpAZ, faArrowDown91 } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useAdminContext } from "./Context";

export default function SearchForm({ booking }) {
    const [officeName, setOfficeName] = useState('');
    const { setBookings, setOffices } = useOutletContext();
    const { token } = useAdminContext();
    async function search() {
        if (officeName.length === 0) {
            try {
                const res = booking ? await fetch("https://officelyapp.azurewebsites.net/api/booking/all-bookings", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
                    }
                }) : await fetch("https://officelyapp.azurewebsites.net/api/office", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await res.json();
                if (res.ok) {
                    booking ? setBookings(data) : setOffices(data);
                }
            }
            catch (e) {
                console.log(e);
            }
            return;
        }
        try {
            const res = booking ? await fetch(`https://officelyapp.azurewebsites.net/api/booking/offices/${officeName}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            }) : await fetch(`https://officelyapp.azurewebsites.net/api/office/searchByOfficeName/${officeName}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await res.json();
            if (res.ok) {
                booking ? setBookings(data) : setOffices(data);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    return (
        <div>
            <input className='input is-info m-2' onChange={e => setOfficeName(e.target.value)} placeholder='Office name' type="text" />
            <div className='buttons m-2'>
                <button className='button is-info' onClick={search}>
                    <span className="icon-text">
                        <span className="icon">
                            <FontAwesomeIcon icon={faSearch} />
                        </span>
                        <span>Search</span>
                    </span>
                </button>
                <button className='button is-info' onClick={e => {
                    if (booking) {
                        setBookings(prev => [...prev].sort((b1, b2) => {
                            const firstNameA = b1.office.officeName.toLowerCase();
                            const firstNameB = b2.office.officeName.toLowerCase();

                            if (firstNameA < firstNameB) {
                                return -1;
                            }
                            if (firstNameA > firstNameB) {
                                return 1;
                            }
                            return 0;
                        }))
                    } else {
                        setOffices(prev => [...prev].sort((o1, o2) => {
                            const firstNameA = o1.officeName.toLowerCase();
                            const firstNameB = o2.officeName.toLowerCase();

                            if (firstNameA < firstNameB) {
                                return -1;
                            }
                            if (firstNameA > firstNameB) {
                                return 1;
                            }
                            return 0;
                        }))
                    }
                }}>
                    <span className="icon-text">
                        <span className="icon">
                            <FontAwesomeIcon icon={faArrowUpAZ} />
                        </span>
                        <span>Sort by name</span>
                    </span>
                </button>
                {booking && <button className='button is-info' onClick={e => {
                    setBookings(prev => [...prev].sort((b1, b2) => {
                        const date1 = b1.startDateTime.toLowerCase();
                        const date2 = b2.startDateTime.toLowerCase();

                        if (date2 < date1) {
                            return -1;
                        }
                        if (date2 > date1) {
                            return 1;
                        }
                        return 0;
                    }))
                }}>
                    <span className="icon-text">
                        <span className="icon">
                            <FontAwesomeIcon icon={faArrowDown91} />
                        </span>
                        <span>Sort by date</span>
                    </span>
                </button>}
            </div>
        </div>
    );
}