import { useState, useEffect } from 'react';
import { addDays, format, formatISO, startOfDay } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';
import useServiceStore from '../store/useServiceStore';
import { shallow } from 'zustand/shallow';
import Datepicker from 'react-tailwindcss-datepicker';
import { toast } from 'react-hot-toast';
import disableBookedDate from '../utils/disableBookedDate';
import useBookingStore from '../store/useBookingStore';

const ServiceDetails = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState({
        startDate: null,
        endDate: null,
    });
    const { id } = useParams();
    const [serviceDetails, setServiceDetails] = useState<Service | undefined>();

    const [getServiceById] = useServiceStore(
        (state) => [state.getServiceById],
        shallow
    );

    const [serviceBooking] = useBookingStore((state) => [state.serviceBooking]);

    useEffect(() => {
        const getRoomData = async () => {
            const result = await getServiceById(id!);
            console.log(result?.success);
            console.log(result?.service);
            if (result?.service) {
                setServiceDetails(result?.service);
            }
        };
        getRoomData();
    }, [getServiceById, id]);

    const handleValueChange = (newValue: any) => {
        console.log('newValue:', newValue);
        setValue(newValue);
    };

    const handleBookNow = async () => {
        if (!value.startDate || !value.endDate) {
            toast.error('Please select the date first', { id: '2' });
            return;
        }

        toast.loading('Service Booking...  ⌛', { id: '1' });

        const result = await serviceBooking(id!, value.startDate);

        console.log({ BOOKING_ROOM: result });

        if (result?.success) {
            const message =
                result?.message ?? 'Service Booking successfully 🚀';
            toast.success(message, { id: '1' });
            navigate('/dashboard');
        } else {
            let message;
            if (!result?.message) {
                message = result;
            } else {
                message =
                    result?.message ?? 'Error occurs In Service Booking 🥲';
            }

            toast.error(message, {
                id: '1',
            });
        }
    };

    const today = startOfDay(new Date()); // Set time to midnight (00:00:00)
    const minDate = today;

    return (
        <div className='flex flex-wrap w-1/2 p-14 shadow-lg m-14 rounded-md'>
            {/* Right side - Room Details */}
            <div className='w-full md:w-10/12 p-4'>
                {/* Room Availability Calendar */}
                <div className='mb-4'>
                    <Datepicker
                        asSingle={true}
                        showFooter={true}
                        startFrom={minDate}
                        minDate={minDate}
                        value={value}
                        displayFormat={'DD/MM/YYYY'}
                        onChange={handleValueChange}
                    />
                </div>

                {/* Service Details */}
                <div>
                    <h2 className='text-2xl font-semibold mb-2'>
                        Service Name : {serviceDetails?.name}
                    </h2>
                    <p className='text-lg mb-2'>
                        Service Description : {serviceDetails?.description}
                    </p>
                    <p className='mb-2'>Price : {serviceDetails?.price}</p>

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
