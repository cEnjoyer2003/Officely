import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faLocationDot, faCalendar, faSackDollar, faUser, faGear } from '@fortawesome/free-solid-svg-icons';
import { useOutletContext } from "react-router-dom";
import { useAdminContext } from "./Context";

export default function BookingItem({ booking }) {
    const startDate = booking.startDateTime.substring(0, booking.startDateTime.indexOf("T"));
    const startTime = booking.startDateTime.substring(booking.startDateTime.indexOf("T") + 1, booking.startDateTime.length);
    const endDate = booking.endDateTime.substring(0, booking.endDateTime.indexOf("T"));
    const endTime = booking.endDateTime.substring(booking.endDateTime.indexOf("T") + 1, booking.endDateTime.length);
    const { token } = useAdminContext();
    const { setBookings } = useOutletContext();
    async function deleteItem(id) {
        try {
            const res = await fetch(`https://officelyapp.azurewebsites.net/api/booking/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ id }),
            })
            if (res.ok) {
                setBookings(prev => prev.filter(b => b.bookingId !== id));
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    return (
        <div className="box">
            <div className="media">
                <div className="media-left">
                    <figure className="image is-128x128 is-square">
                        <img
                            src={booking.officeImage}
                            alt={`Office`}
                        />
                    </figure>
                </div>
                <div className="media-content">
                    <p className="title is-5">{booking.office.officeName}</p>
                    <p className="subtitle is-6">
                        <span className="icon-text">
                            <span className="icon">
                                <FontAwesomeIcon icon={faGear} />
                            </span>
                            <span>{booking.origin === "officely" ? 'Officely' : 'Flatly'}</span>
                        </span>
                    </p>
                    <p className="subtitle is-6">
                        <span className="icon-text">
                            <span className="icon">
                                <FontAwesomeIcon icon={faLocationDot} />
                            </span>
                            <span>{booking.office.city}</span>
                        </span>
                    </p>
                    <p className="subtitle is-6">
                        <span className="icon-text">
                            <span className="icon">
                                <FontAwesomeIcon icon={faCalendar} />
                            </span>
                            <span>{startTime}, {startDate} - {endTime}, {endDate}</span>
                        </span>
                    </p>
                    <p className="subtitle is-6">
                        <span className="icon-text">
                            <span className="icon">
                                <FontAwesomeIcon icon={faUser} />
                            </span>
                            <span>{booking.user.email}, {booking.user.firstName} {booking.user.lastName}</span>
                        </span>
                    </p>
                    <p className="subtitle is-6">
                        <span className="icon-text">
                            <span className="icon">
                                <FontAwesomeIcon icon={faSackDollar} />
                            </span>
                            <span>{booking.office.price}$</span>
                        </span>
                    </p>
                </div>
                <div className="media-right">
                    <p className="title is-5 fa-hover" onClick={e => document.getElementById('delete-booking').showModal()}><FontAwesomeIcon icon={faTrash} /></p>
                </div>
            </div>
            <dialog id="delete-booking">
                <h3>Do you want to delete this booking?</h3>
                <p className="title is-5">{booking.office.officeName}</p>
                <p className="subtitle is-6">City: {booking.office.city}</p>
                <p className="subtitle is-6">Dates: {startTime}, {startDate} - {endTime}, {endDate}</p>
                <p className="subtitle is-6">Price: {booking.office.price}$</p>
                {/*<input className='input is-primary' type='text' placeholder='Comment for user' />*/}
                <div className='is-flex is-justify-content-space-between'>
                    <button className='button is-primary' onClick={e => document.getElementById('delete-booking').close()}>Cancel</button>
                    <button className='button is-danger' onClick={e => deleteItem(booking.bookingId)}>Delete</button>
                </div>
            </dialog>
        </div>
    );
}