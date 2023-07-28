import { useEffect } from 'react';
import useRoomStore from '../store/useRoomStore';
import RoomCard from './RoomCard';
import { shallow } from 'zustand/shallow';

const Customer = () => {
    const [getAllRoomsForCustomer, rooms] = useRoomStore(
        (state) => [state.getAllRoomsForCustomer, state.rooms],
        shallow
    );
    useEffect(() => {
        getAllRoomsForCustomer();
    }, [getAllRoomsForCustomer]);

    return (
        <div className='w-full flex items-center justify-around flex-wrap space-x-3 space-y-3'>
            {rooms?.length ? (
                rooms?.map((room) => (
                    <RoomCard
                        room={room}
                        key={room._id}
                    />
                ))
            ) : (
                <div className='text-center p-10'>
                    <p>Whoops! No room available</p>
                </div>
            )}
        </div>
    );
};

export default Customer;
