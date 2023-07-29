import { useForm, FieldValues, SubmitHandler, get } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import Input from '../components/Input';
import { useNavigate, useParams } from 'react-router-dom';
import roomSchema from '../schemas/addRoomSchema';
import useAuthStore from '../store/useAuthStore';
import { shallow } from 'zustand/shallow';
import useRoomStore from '../store/useRoomStore';
import { useEffect } from 'react';

const inputTypes: InputTypes[] = [
    {
        id: 'name',
        label: 'Room Name',
        type: 'text',
    },
    {
        id: 'numBeds',
        label: 'Number of Beds',
        type: 'string',
    },
    {
        id: 'minStay',
        label: 'Min Stay',
        type: 'string',
    },
    {
        id: 'maxStay',
        label: 'Max Stay',
        type: 'string',
    },
    {
        id: 'rentPerDay',
        label: 'Rent Per Day',
        type: 'string',
    },
];

const EditRoom = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const [updateRoom, getRoomById] = useRoomStore(
        (state) => [state.updateRoom, state.getRoomById],
        shallow
    );

    const {
        register,
        handleSubmit,
        formState: { errors, isLoading },
        reset,
    } = useForm<FieldValues>({
        resolver: zodResolver(roomSchema),
    });

    useEffect(() => {
        const getRoomData = async () => {
            const result = await getRoomById(id!);
            console.log(result?.room);
            if (result?.room) {
                // Set the form values after data is fetched
                reset({
                    name: result.room.name,
                    numBeds: result.room.numBeds.toString(),
                    minStay: result.room.minStay.toString(),
                    maxStay: result.room.maxStay.toString(),
                    rentPerDay: result.room.rentPerDay.toString(),
                });
            }
        };
        getRoomData();
    }, [getRoomById, id, reset]);
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log({ data });
        const { name, numBeds, minStay, maxStay, rentPerDay } = data;
        toast.loading('Edit Room details ⌛', { id: '1' });

        const result = await updateRoom(
            name,
            numBeds,
            minStay,
            maxStay,
            rentPerDay,
            id!
        );

        console.log({ UPDATE_ROOM: result });
        console.log({ isAuthenticated });

        if (result?.success) {
            const message = result?.message ?? 'Room edit successfully 🚀';
            toast.success(message, { id: '1' });
            navigate('/dashboard');
        } else {
            let message;
            if (!result?.message) {
                message = result;
            } else {
                message =
                    result?.message ?? 'Error occurs room details editing 🥲';
            }

            toast.error(message, {
                id: '1',
            });
        }
    };

    return (
        <div className='h-[83vh] w-full flex items-center justify-center bg-white px-4 py-10 sm:px-6 sm:py-16 lg:px-8'>
            <div className='bg-slate-100 px-4 py-8 shadow-xl sm:rounded-lg sm:px-10 xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md'>
                <h2 className='text-2xl font-bold leading-tight text-black text-center'>
                    Edit Room
                </h2>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='mt-2'
                >
                    <div className='space-y-5'>
                        {inputTypes?.map((input) => (
                            <Input
                                key={input.id}
                                label={input.label}
                                id={input.id}
                                type={input.type}
                                register={register}
                                errors={errors}
                                disabled={isLoading}
                            />
                        ))}

                        <button
                            type='submit'
                            className='inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80'
                            disabled={isLoading}
                        >
                            Edit Room{' '}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditRoom;
