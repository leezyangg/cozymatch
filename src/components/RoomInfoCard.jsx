/* eslint-disable react/prop-types */
import { BiBed, BiBath } from 'react-icons/bi';
import { AiOutlineCar } from 'react-icons/ai';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function RoomInfoCard(props) {
    return (
        <Link to={`/room_detail/${props.Room_ID}`} className="flex shadow-xl mx-20 rounded-xl items-center bg-slate-300 space-x-8 py-5 px-5">
            <div className=" h-[110px] w-[110px]">
                {/* <img src="src/assets/room.jpg" alt="roomlist" className="h-full rounded-xl" /> */}
                <img
                    src={props.image[0] ? `http://localhost:3000/uploads/${props.image[0]}` : "src/assets/room.jpg"}
                    alt="roomlist"
                    className="h-full w-full rounded-xl object-cover"
                />
            </div>
            <div className="w-48">
                <h4 className="font-bold">Address:</h4>
                <p className="text-sm">{props.address}</p>
            </div>
            <div className="w-48 flex flex-col items-center">
                <h4 className="font-bold">Property Type:</h4>
                <p className="text-sm">{props.type}</p>
            </div>
            <div className="w-48 flex flex-col items-center">
                <h4 className="font-bold">Posted Date:</h4>
                <p className="text-sm">{props.postedDate}</p>
            </div>
            <div className="w-48 flex flex-col items-center">
                <h4 className="font-bold">Rent Per Month:</h4>
                <p className="text-sm">RM{props.rentalFee}</p>
            </div>
            <div className='w-48 flex items-center space-x-4'>
                <div className='flex items-center'>
                    <BiBed />
                    {props.bedroom}
                </div>
                <div className='flex items-center'>
                    <BiBath />
                    {props.bathroom}
                </div>
                <div className='flex items-center'>
                    <AiOutlineCar />
                    {props.parking}
                </div>
            </div>
            <div className={props.availability ? 'text-green-500' : 'text-red-500'}>
                {props.availability ? 'Available' : 'Unavailable'}
            </div>
        </Link>
    );
}

RoomInfoCard.propTypes = {
    //img: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    postedDate: PropTypes.string.isRequired,
    rentalFee: PropTypes.number.isRequired,
    bedroom: PropTypes.number.isRequired,
    bathroom: PropTypes.number.isRequired,
    parking: PropTypes.number.isRequired,
    availability: PropTypes.bool.isRequired,
};
