import { useEffect } from 'react';
import useRoomStore from '../store/useRoomStore';
import RoomCard from './RoomCard';
import { shallow } from 'zustand/shallow';
import { useNavigate } from 'react-router-dom';
const Owner = () => {
    const navigate = useNavigate();
    const [getAllRooms, rooms] = useRoomStore(
        (state) => [state.getAllRooms, state.rooms],
        shallow
    );
    useEffect(() => {
        getAllRooms();
    }, [getAllRooms]);

    const handleAddRoom = () => {
        navigate('/dashboard/add');
    };
    return (
        <div className='w-full flex items-center justify-around flex-wrap space-x-3 space-y-3'>
            <div className='flex bg-slate-600 w-full p-3'>
                <button
                    onClick={handleAddRoom}
                    className='px-2 py-1 bg-green-500 text-white rounded'
                >
                    Add Room
                </button>
            </div>
            {rooms?.length ? (
                rooms?.map((room) => (
                    <RoomCard
                        room={room}
                        key={room._id}
                    />
                ))
            ) : (
                <div className='text-center p-10'>
                    <p>Please create your first property</p>
                </div>
            )}
        </div>
    );
};

export default Owner;
