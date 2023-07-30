import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import Input from '../components/Input';
import { useNavigate } from 'react-router-dom';

import useAuthStore from '../store/useAuthStore';
import { useState } from 'react';
import useServiceStore from '../store/useServiceStore';
import addServiceSchema from '../schemas/addServiceSchema';

const initialValue: AddService = {
    name: '',
    description: '',
    price: '',
};

const inputTypes: InputTypes[] = [
    {
        id: 'name',
        label: 'Room Name',
        type: 'text',
    },
    {
        id: 'description',
        label: 'Description',
        type: 'text',
    },
    {
        id: 'price',
        label: 'Price',
        type: 'number',
    },
];

const AddService = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
    } = useForm<FieldValues>({
        defaultValues: initialValue,
        resolver: zodResolver(addServiceSchema),
    });

    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const addService = useServiceStore((state) => state.addService);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (isDirty && isValid) {
            setLoading(true);
        }
        console.log({ data });
        const { name, description, price } = data;
        toast.loading('Adding Services details ⌛', { id: '1' });

        const result = await addService(name, description, price);

        console.log({ ADD_SERVICES: result });
        console.log({ isAuthenticated });

        if (result?.success) {
            const message = result?.message ?? 'Service added successfully 🚀';
            toast.success(message, { id: '1' });
            navigate('/dashboard');
        } else {
            let message;
            if (!result?.message) {
                message = result;
            } else {
                message =
                    result?.message ??
                    'Error occurs in Service details adding 🥲';
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
                    Add Service Details
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

                        <button
                            type='submit'
                            className='inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80'
                            disabled={loading}
                        >
                            Add Services{' '}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddService;
