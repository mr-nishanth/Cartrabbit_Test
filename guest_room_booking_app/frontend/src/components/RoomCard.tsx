import React from 'react';
import useRoomStore from '../store/useRoomStore';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

type RoomCardProps = {
    room: Room;
};

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
    const navigate = useNavigate();
    const deleteRoom = useRoomStore((state) => state.deleteRoom);
    const [user] = useAuthStore((state) => [state.user]);

    const handleDeleteRoom = async () => {
        toast.loading('Deleting Room... ⌛', { id: '1' });
        const result = await deleteRoom(room?._id);
        if (result.success) {
            toast.success('Room deletion successfully 🚀', { id: '1' });
        } else {
            toast.error('Error in  Room deletion 🥲', {
                id: '1',
            });
        }
    };

    const handleRoomEdit = () => {
        navigate(`/dashboard/edit/${room?._id}`);
        return;
    };

    const handleRoomDetails = () => {
        navigate(`/dashboard/room-details/${room?._id}`);
        return;
    };
    return (
        <div className='w-[300px] rounded-md border mt-1 shadow-lg hover:bg-slate-200'>
            <img
                src={room?.photos}
                className='h-[200px] w-full rounded-md object-cover'
            />
            <div className='p-4'>
                <h1 className='text-lg font-semibold'>{room?.name}</h1>
                <div className='mt-1 text-sm text-gray-600 flex items-center justify-between w-full flex-wrap'>
                    {user?.role === 'customer' && (
                        <div className='border border-gray-700 bg-slate-700 text-white rounded-md p-1'>
                            <span>Owner : </span>
                            <span>
                                {room?.ownerId?.name?.toLocaleUpperCase()}
                            </span>
                        </div>
                    )}
                    <div>
                        <span>No Of Beds : </span>
                        <span>{room?.numBeds}</span>
                    </div>
                    <div>
                        <span>Rent Per Day : </span>
                        <span>Rs {room?.rentPerDay}</span>
                    </div>
                </div>
                <div className='flex items-center justify-between'>
                    {user?.role === 'owner' ? (
                        <>
                            <button
                                type='button'
                                className='mt-2 rounded-md bg-blue-400 px-2.5 py-1 text-base font-semibold text-white shadow-sm hover:bg-blue-500/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
                                onClick={handleRoomEdit}
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDeleteRoom}
                                type='button'
                                className='mt-2 rounded-md bg-red-400 px-2.5 py-1 text-base font-semibold text-white shadow-sm hover:bg-red-500/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
                            >
                                Delete
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                type='button'
                                className='mt-2 mx-auto rounded-md bg-blue-400 px-2.5 py-1 text-base font-semibold text-white shadow-sm hover:bg-blue-500/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
                                onClick={handleRoomDetails}
                            >
                                View Details
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RoomCard;
