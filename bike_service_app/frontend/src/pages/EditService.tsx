import { useForm, FieldValues, SubmitHandler, get } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import Input from '../components/Input';
import { useNavigate, useParams } from 'react-router-dom';

import useAuthStore from '../store/useAuthStore';
import { shallow } from 'zustand/shallow';
import useRoomStore from '../store/useServiceStore';
import { useEffect } from 'react';
import editServiceSchema from '../schemas/editServiceSchema';

const inputTypes: InputTypes[] = [
    {
        id: 'name',
        label: 'Service Name',
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
        type: 'text',
    },
];
const EditService = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const [updateService, getServiceById] = useRoomStore(
        (state) => [state.updateService, state.getServiceById],
        shallow
    );

    const {
        register,
        handleSubmit,
        formState: { errors, isLoading },
        reset,
    } = useForm<FieldValues>({
        resolver: zodResolver(editServiceSchema),
    });

    useEffect(() => {
        const getServiceData = async () => {
            const result = await getServiceById(id!);
            console.log(result?.service);
            if (result?.service) {
                // Set the form values after data is fetched
                reset({
                    name: result?.service?.name,
                    description: result?.service?.description,
                    price: Number(result?.service?.price),
                });
            }
        };
        getServiceData();
    }, [getServiceById, id, reset]);
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log({ data });
        const { name, description, price } = data;
        toast.loading('Service updating ⌛', { id: '1' });

        const result = await updateService(name, description, price, id!);

        console.log({ UPDATE_SERVICE: result });
        console.log({ isAuthenticated });

        if (result?.success) {
            const message =
                result?.message ?? 'Service updated successfully 🚀';
            toast.success(message, { id: '1' });
            navigate('/dashboard');
        } else {
            let message;
            if (!result?.message) {
                message = result;
            } else {
                message =
                    result?.message ?? 'Error occurs in service updating 🥲';
            }

            toast.error(message, {
                id: '1',
            });
        }
    };

    return (
        <div className='h-[83vh] w-full flex items-center justify-center bg-white px-4 py-10 sm:px-6 sm:py-16 lg:px-8'>
            <div className='bg-slate-100 w-full px-4 py-8 shadow-xl sm:rounded-lg sm:px-10 xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md'>
                <h2 className='text-2xl font-bold leading-tight text-black text-center'>
                    Edit Service
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
                            Edit Service{' '}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditService;
