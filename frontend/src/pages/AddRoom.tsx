import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import Input from '../components/Input';
import { useNavigate } from 'react-router-dom';
import roomSchema from '../schemas/addRoomSchema';
import useAuthStore from '../store/useAuthStore';
import { ChangeEvent, useState } from 'react';
import useRoomStore from '../store/useRoomStore';

const initialValue: AddRoom = {
    name: '',
    numBeds: '',
    minStay: '',
    maxStay: '',
    rentPerDay: '',
};

const inputTypes: InputTypes[] = [
    {
        id: 'name',
        label: 'Room Name',
        type: 'text',
    },
    {
        id: 'numBeds',
        label: 'Number of Beds',
        type: 'number',
    },
    {
        id: 'minStay',
        label: 'Min Stay',
        type: 'number',
    },
    {
        id: 'maxStay',
        label: 'Max Stay',
        type: 'number',
    },
    {
        id: 'rentPerDay',
        label: 'Rent Per Day',
        type: 'number',
    },
];

const AddRoom = () => {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const {
        register,

        handleSubmit,
        formState: { errors, isDirty, isValid },
    } = useForm<FieldValues>({
        defaultValues: initialValue,
        resolver: zodResolver(roomSchema),
    });

    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const addRooms = useRoomStore((state) => state.addRooms);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setSelectedImage(file ?? null);
    };
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (isDirty && isValid) {
            setLoading(true);
        }
        console.log({ data });
        const { name, numBeds, minStay, maxStay, rentPerDay } = data;
        toast.loading('Adding Room details ⌛', { id: '1' });
        if (!selectedImage) {
            console.error('Please select an image.');
            return;
        }
        const result = await addRooms(
            name,
            numBeds,
            minStay,
            maxStay,
            rentPerDay,
            selectedImage
        );

        console.log({ ADD_ROOM: result });
        console.log({ isAuthenticated });

        if (result?.success) {
            const message = result?.message ?? 'Room added successfully 🚀';
            toast.success(message, { id: '1' });
            navigate('/dashboard');
        } else {
            let message;
            if (!result?.message) {
                message = result;
            } else {
                message =
                    result?.message ??
                    'Error occurs while adding room details 🥲';
            }

            toast.error(message, {
                id: '1',
            });
        }
    };

    return (
        <div className='h-[83vh] flex items-center justify-center bg-white px-4 py-10 sm:px-6 sm:py-16 lg:px-8'>
            <div className='bg-slate-100 px-4 py-8 shadow-xl sm:rounded-lg sm:px-10 xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md'>
                <h2 className='text-2xl font-bold leading-tight text-black'>
                    Add Room
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
                                disabled={loading}
                            />
                        ))}

                        <div>
                            <label
                                htmlFor='formFile'
                                className='text-base font-medium text-gray-900'
                            >
                                Upload Image
                            </label>

                            <input
                                className='relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-500 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary'
                                type='file'
                                accept='.jpg, .jpeg, .png, .webp'
                                id='formFile'
                                onChange={handleImageChange}
                            />
                        </div>
                        <button
                            type='submit'
                            className='inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80'
                            disabled={loading}
                        >
                            Add Room{' '}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddRoom;
