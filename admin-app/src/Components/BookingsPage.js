import SearchForm from "./SearchForm";
import BookingItem from "./BookingItem";
import { useOutletContext } from "react-router-dom";

export default function BookingsPage() {
    const { bookings } = useOutletContext();
    return (
        <div className="columns">
            <div className="column is-one-quarter">
                <SearchForm booking={true} />
            </div>
            <div className="column">{bookings.map(booking => <BookingItem key={booking.bookingId} booking={booking} />)}</div>
        </div>
    );
}