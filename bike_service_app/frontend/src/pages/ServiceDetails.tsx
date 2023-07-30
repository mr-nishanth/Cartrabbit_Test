import { useState, useEffect } from 'react';
import { addDays, format, formatISO, startOfDay } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';
import useRoomStore from '../store/useServiceStore';
import { shallow } from 'zustand/shallow';
import Datepicker from 'react-tailwindcss-datepicker';
import { toast } from 'react-hot-toast';
import disableBookedDate from '../utils/disableBookedDate';

const ServiceDetails = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState({
        startDate: null,
        endDate: null,
    });
    const { id } = useParams();
    const [roomDetails, setRoomDetails] = useState<Room | undefined>();

    const [getRoomById, roomBooing] = useRoomStore(
        (state) => [state.getRoomById, state.roomBooing],
        shallow
    );

    useEffect(() => {
        const getRoomData = async () => {
            const result = await getRoomById(id!);
            console.log(result?.success);
            console.log(result?.room);
            if (result?.room) {
                // Set the form values after data is fetched
                setRoomDetails(result?.room);
            }
        };
        getRoomData();
    }, [getRoomById, id]);

    const minStay = roomDetails?.minStay; // Minimum stay duration in days (e.g., 1)
    const maxStay = roomDetails?.maxStay; // Maximum stay duration in days (e.g., 10)
    // Calculate min and max dates based on today's date
    const today = startOfDay(new Date()); // Set time to midnight (00:00:00)
    const minDate = today;
    const maxDate = addDays(today, maxStay! - 1);
    console.log('Minimum Stay Date:', minDate);
    console.log('Maximum Stay Date:', maxDate);

    const handleValueChange = (newValue: any) => {
        console.log('newValue:', newValue);
        setValue(newValue);
    };

    const handleBookNow = async () => {
        if (!value.startDate || !value.endDate) {
            toast.error('Please select the date first', { id: '2' });
            return;
        }

        toast.loading('Booking Room  ⌛', { id: '1' });

        const result = await roomBooing(id!, value.startDate!, value.endDate!);

        console.log({ BOOKING_ROOM: result });

        if (result?.success) {
            const message = result?.message ?? 'Room Booking successfully 🚀';
            toast.success(message, { id: '1' });
            navigate('/dashboard');
        } else {
            let message;
            if (!result?.message) {
                message = result;
            } else {
                message = result?.message ?? 'Error occurs In Room Booking 🥲';
            }

            toast.error(message, {
                id: '1',
            });
        }
    };

    const bookedDate = disableBookedDate(roomDetails?.bookingId);
    console.log({ bookedDate });

    const [isChecked, setIsChecked] = useState(false);
    const [singleDate, setSingleDate] = useState(false);

    const handleToggle = () => {
        console.log({ isChecked });
        setIsChecked(!isChecked);
        setSingleDate(!singleDate);
        setValue({ startDate: null, endDate: null });
    };

    return (
        <div className='flex flex-wrap w-11/12 p-14 shadow-lg m-14 rounded-md'>
            {/* Left side - Room Image */}
            <div className='w-full md:w-1/2'>
                <img
                    src={`${roomDetails?.photos}`}
                    alt='Room Image'
                    className='w-full h-auto  rounded-md object-cover'
                />
            </div>

            {/* Right side - Room Details */}
            <div className='w-full md:w-1/2 p-4'>
                <label className='flex items-center space-x-2 m-2'>
                    <input
                        type='checkbox'
                        className='form-checkbox w-6 h-6'
                        checked={isChecked}
                        onChange={handleToggle}
                    />
                    <span className='mr-2 text-sm'>One Day</span>
                </label>
                {/* Room Availability Calendar */}
                <div className='mb-4'>
                    <Datepicker
                        asSingle={singleDate}
                        disabledDates={bookedDate}
                        showFooter={true}
                        startFrom={minDate}
                        value={value}
                        displayFormat={'DD/MM/YYYY'}
                        minDate={minDate}
                        maxDate={maxDate}
                        onChange={handleValueChange}
                    />
                </div>

                {/* Room Details */}
                <div>
                    <h2 className='text-2xl font-semibold mb-2'>
                        Room Name : {roomDetails?.name}
                    </h2>
                    <p className='text-lg mb-2'>
                        Price per day: {roomDetails?.rentPerDay}
                    </p>
                    <p className='mb-2'>
                        Number of Beds: {roomDetails?.numBeds}
                    </p>
                    <p className='mb-2'>Min Stay: {roomDetails?.minStay} Day</p>
                    <p className='mb-4'>Max Stay: {roomDetails?.maxStay} Day</p>

                    <button
                        className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded'
                        onClick={handleBookNow}
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetails;
