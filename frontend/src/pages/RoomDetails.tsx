import React, { useState, useEffect } from 'react';
import DatePicker from 'react-tailwindcss-datepicker';
import { addDays, format, formatISO } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';
import useRoomStore from '../store/useRoomStore';
import { shallow } from 'zustand/shallow';
import { ro } from 'date-fns/locale';
import Datepicker from 'react-tailwindcss-datepicker';
import { toast } from 'react-hot-toast';

const RoomDetailsPage = () => {
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

    // Replace these values with your backend data
    const minStay = roomDetails?.minStay;
    const maxStay = roomDetails?.maxStay;

    // Calculate min and max dates based on today's date
    const today = new Date();
    const minDate = today;
    const maxDate = addDays(today, maxStay!);

    const handleValueChange = (newValue: any) => {
        console.log('newValue:', newValue);
        setValue(newValue);
    };

    const handleBookNow = async () => {
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
                {/* Room Availability Calendar */}
                <div className='mb-4'>
                    <Datepicker
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

export default RoomDetailsPage;
