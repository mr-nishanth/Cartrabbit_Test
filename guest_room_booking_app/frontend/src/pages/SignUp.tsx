import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import {
    useForm,
    FieldValues,
    SubmitHandler,
    Controller,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import useAuthStore from '../store/useAuthStore';
import Input from '../components/Input';
import registerSchema from '../schemas/registerSchema';
import { shallow } from 'zustand/shallow';

const initialValue: SignUp = {
    name: '',
    email: '',
    mobile: '',
    password: '',
    role: '',
};

const inputTypes: InputTypes[] = [
    {
        id: 'name',
        label: 'User Name',
        type: 'text',
    },
    {
        id: 'email',
        label: 'Email Address',
        type: 'email',
    },
    {
        id: 'mobile',
        label: 'Mobile Number',
        type: 'tel',
    },
    {
        id: 'password',
        label: 'Password',
        type: 'password',
    },
];

const SignUp = () => {
    const navigate = useNavigate();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isLoading },
    } = useForm<FieldValues>({
        defaultValues: initialValue,
        resolver: zodResolver(registerSchema),
    });

    const [user, isAuthenticated, registerUser] = useAuthStore(
        (state) => [state.user, state.isAuthenticated, state.register],
        shallow
    );
    console.log({ isAuthenticated });
    if (isAuthenticated) {
        navigate('/dashboard');
        return;
    }
    console.log({ user });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const { name, password, email, mobile, role } = data;
        toast.loading('Registering User ⌛', { id: '1' });

        const result = await registerUser(name, password, email, mobile, role);

        // console.log({ REGISTER: result });
        console.log({ isAuthenticated });

        if (result?.success) {
            const message =
                result?.message ?? 'User registered successfully 🚀';
            toast.success(message, { id: '1' });
            navigate('/login');
        } else {
            let message;
            if (!result?.message) {
                message = result;
            } else {
                message =
                    result?.message ?? 'Error in while Registering user 🥲';
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
                    Sign up to create account
                </h2>
                <p className='mt-2 text-base text-gray-600'>
                    Already have an account?{' '}
                    <Link
                        to='/login'
                        className='font-medium text-black transition-all duration-200 hover:underline'
                    >
                        Log In
                    </Link>
                </p>
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

                        <div>
                            <label className='text-base font-medium text-gray-900'>
                                Role
                            </label>
                            <Controller
                                name='role'
                                control={control}
                                defaultValue=''
                                render={({ field }) => (
                                    <select
                                        {...field}
                                        className='mt-1 flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
                                    >
                                        <option value=''>Select a role</option>
                                        <option value='owner'>Owner</option>
                                        <option value='customer'>
                                            Customer
                                        </option>
                                    </select>
                                )}
                            />
                            {errors.role && (
                                <span className='text-red-400 text-sm leading-6'>
                                    Role Either Customer or Owner
                                </span>
                            )}
                        </div>
                        <button
                            type='submit'
                            className='inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80'
                        >
                            Create Account{' '}
                            <ArrowRight
                                className='ml-2'
                                size={16}
                            />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
