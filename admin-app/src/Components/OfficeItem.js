import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faWifi, faPhone, faLocationDot, faStar, faBuilding, faSackDollar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useAdminContext } from "./Context";

export default function OfficeItem({ office }) {
    console.log(office)
    const navigate = useNavigate();
    const { setOffices } = useOutletContext();
    const { token } = useAdminContext();
    async function deleteItem(id) {
        try {
            const res = await fetch(`https://officelyapp.azurewebsites.net/api/office/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ id }),
            });
            if (res.ok) {
                setOffices(prev => prev.filter(o => o.officeId !== id));
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
                    <figure className="image is-128x128">
                        <img
                            src={office.image}
                            alt={`Office`}
                        />
                    </figure>
                </div>
                <div className="media-content">
                    <p className="title is-5">{office.officeName}</p>
                    <p className="subtitle is-6">
                        <span className="icon-text">
                            <span className="icon">
                                <FontAwesomeIcon icon={faLocationDot} />
                            </span>
                            <span>{office.officeAddress}, {office.city}</span>
                        </span>
                    </p>
                    <p className="subtitle is-6">
                        <span className="icon-text">
                            <span className="icon">
                                <FontAwesomeIcon icon={faStar} />
                            </span>
                            <span>{office.rating}/5</span>
                        </span>
                    </p>
                    <p className="subtitle is-6">
                        <span className="icon-text">
                            <span className="icon">
                                <FontAwesomeIcon icon={faBuilding} />
                            </span>
                            <span>{office.facilities}</span>
                        </span>
                    </p>
                    {office.wifi && <p>
                        <span className="icon-text">
                            <span className="icon">
                                <FontAwesomeIcon icon={faWifi} />
                            </span>
                            <span>Free wifi</span>
                        </span>
                    </p>}
                    <p className="subtitle is-6">
                        <span className="icon-text">
                            <span className="icon">
                                <FontAwesomeIcon icon={faPhone} />
                            </span>
                            <span>{office.contactInfo}</span>
                        </span>
                    </p>
                    <p className="subtitle is-6">
                        <span className="icon-text">
                            <span className="icon">
                                <FontAwesomeIcon icon={faSackDollar} />
                            </span>
                            <span>Price per day: {office.price}$</span>
                        </span>
                    </p>
                    <p className="subtitle is-6">Capacity: {office.capacity}</p>
                </div>
                <div className="media-right">
                    <p className="title is-5 fa-hover" onClick={e => navigate('/main/offices/edit', { state: { office } })}><FontAwesomeIcon icon={faEdit} /></p>
                    <p className="title is-5 fa-hover" onClick={e => document.getElementById(`delete-office-${office.officeId}`).showModal()}><FontAwesomeIcon icon={faTrash} /></p>
                </div>
            </div>
            <dialog id={`delete-office-${office.officeId}`}>
                <h3>Do you want to delete this office?</h3>
                <p className="title is-5">{office.officeName}</p>
                <p className="subtitle is-6">Address: {office.officeAddress}, {office.city}</p>
                <p className="subtitle is-6">Rating: {office.rating}/5</p>
                <p className="subtitle is-6">Price per day: {office.price}$</p>
                <div className='is-flex is-justify-content-space-between'>
                    <button className='button is-primary' onClick={e => document.getElementById(`delete-office-${office.officeId}`).close()}>Cancel</button>
                    <button className='button is-danger' onClick={e => deleteItem(office.officeId)}>Delete</button>
                </div>
            </dialog>
        </div>
    );
}