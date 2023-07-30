import { useEffect } from 'react';
import useRoomStore from '../store/useRoomStore';
import RoomCard from './RoomCard';
import { shallow } from 'zustand/shallow';

const Customer = () => {
    const [getAllRoomsForCustomer, rooms, searchString] = useRoomStore(
        (state) => [
            state.getAllRoomsForCustomer,
            state.rooms,
            state.searchString,
        ],
        shallow
    );
    useEffect(() => {
        getAllRoomsForCustomer();
    }, [getAllRoomsForCustomer]);

    console.log({ searchString });
    return (
        <div className='w-full flex items-center justify-around flex-wrap space-x-3 space-y-3'>
            {rooms?.length ? (
                rooms?.map((room) => {
                    console.log({ room });
                    console.log({ OWNER: room?.ownerId?.name });

                    if (
                        searchString &&
                        !room?.name
                            .toLowerCase()
                            .includes(searchString.toLowerCase())
                    )
                        return null;
                    return (
                        <RoomCard
                            room={room}
                            key={room._id}
                        />
                    );
                })
            ) : (
                <div className='text-center p-10'>
                    <p>Whoops! No room available</p>
                </div>
            )}
        </div>
    );
};

export default Customer;
