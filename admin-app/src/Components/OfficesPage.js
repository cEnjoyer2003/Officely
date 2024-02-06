import OfficeItem from "./OfficeItem";
import SearchForm from "./SearchForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useOutletContext } from 'react-router-dom';

export default function OfficesPage() {
    const navigate = useNavigate();
    const { offices } = useOutletContext();
    return (
        <div className="columns">
            <div className="column is-one-quarter">
                <SearchForm booking={false} />
                <button className="button is-link m-2" onClick={e => navigate('/main/offices/new')}>
                    <span className="icon-text">
                        <span className="icon">
                            <FontAwesomeIcon icon={faPlus} />
                        </span>
                        <span>Add new office</span>
                    </span>
                </button>
            </div>
            <div className="column">{offices.map(office => <OfficeItem key={office.officeId} office={office} />)}</div>
        </div>
    );
}