import { useState } from "react";
import { useNavigate, useOutletContext, useLocation } from 'react-router-dom';
import { useAdminContext } from "./Context";

export default function NewOfficeForm() {
    const { state } = useLocation();
    const office = state ? state.office : null;
    const [name, setName] = useState(office ? office.officeName : '');
    const [address, setAddress] = useState(office ? office.officeAddress : '');
    const [city, setCity] = useState(office ? office.city : '');
    const [img, setImg] = useState(office ? office.image : '');
    const [contactInfo, setContactInfo] = useState(office ? office.contactInfo : '');
    const [facilities, setFacilities] = useState(office ? office.facilities : '');
    const [price, setPrice] = useState(office ? office.price : 0);
    const [capacity, setCapacity] = useState(office ? office.capacity : 0);
    const { setOffices } = useOutletContext();
    const navigate = useNavigate();
    const { token } = useAdminContext();
    async function handleSubmit(e) {
        if (office) {
            try {
                const res = await fetch(`https://officelyapp.azurewebsites.net/api/office/${office.officeId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        officeName: name,
                        officeAddress: address,
                        facilities: facilities,
                        contactInfo: contactInfo,
                        price: price,
                        city: city,
                        image: img,
                        wifi: document.getElementById('wifi').сhecked,
                        capacity: capacity
                    }),
                });
                if (res.ok) {
                    const resp = await fetch("https://officelyapp.azurewebsites.net/api/office", {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const offices = await resp.json();
                    setOffices(offices);
                    navigate('/main/offices');
                }
            }
            catch (e) {
                console.log(e);
            }
        } else {
            console.log(token)
            try {
                const res = await fetch(`https://officelyapp.azurewebsites.net/api/office`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        officeName: name,
                        officeAddress: address,
                        facilities: facilities,
                        contactInfo: contactInfo,
                        price: price,
                        city: city,
                        image: img,
                        wifi: document.getElementById('wifi').checked,
                        capacity: capacity
                    }),
                });
                if (res.ok) {
                    const resp = await fetch("https://officelyapp.azurewebsites.net/api/office", {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const offices = await resp.json();
                    setOffices(offices);
                    navigate('/main/offices');
                }
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    return (
        <div className="container">
            <h2 className="title is-3 has-text-centered m-2">{office ? office.officeName : "New office"}</h2>
            <input className="input is-primary m-2" onChange={e => setName(e.target.value)} value={name} type="text" placeholder="Office name..." />
            <input className="input is-primary m-2" onChange={e => setAddress(e.target.value)} value={address} type="text" placeholder="Office address..." />
            <input className="input is-primary m-2" onChange={e => setCity(e.target.value)} value={city} type="text" placeholder="City..." />
            <input className="input is-primary m-2" onChange={e => setImg(e.target.value)} value={img} type="text" placeholder="Image url" />
            <textarea className="textarea is-primary m-2" onChange={e => setFacilities(e.target.value)} value={facilities} placeholder="Facilities"></textarea>
            <input className="m-2" type="checkbox" id="wifi" defaultChecked={office ? office.wifi : false} /> WiFi
            <textarea className="textarea is-primary m-2" onChange={e => setContactInfo(e.target.value)} value={contactInfo} placeholder="Contact info"></textarea>
            <p className="m-2">Price per day:</p>
            <input className="input is-primary m-2" onChange={e => setPrice(e.target.value)} value={price} type="number" placeholder="Price per day" min={0} />
            <p className="m-2">Capacity:</p>
            <input className="input is-primary m-2" onChange={e => setCapacity(e.target.value)} value={capacity} type="number" placeholder="Capacity" min={0} />
            <div className="m-2 is-flex is-justify-content-space-between is-flex m-2">
                <button className="button is-danger" onClick={e => navigate('/main/offices')}>Cancel</button>
                <button className="button is-success" type="button" onClick={handleSubmit}>{office ? "Edit" : "Add"}</button>
            </div>
        </div>
    );
}