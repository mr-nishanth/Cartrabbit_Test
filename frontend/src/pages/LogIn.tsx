import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import useAuthStore from '../store/useAuthStore';
import Input from '../components/Input';
import { toast } from 'react-hot-toast';
import loginSchema from '../schemas/loginSchema';
import { shallow } from 'zustand/shallow';
const initialValue: LogIn = {
    email: '',
    password: '',
};

const inputTypes: InputTypes[] = [
    {
        id: 'email',
        label: 'Email Address',
        type: 'email',
    },
    {
        id: 'password',
        label: 'Password',
        type: 'password',
    },
];
const LogIn = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isLoading },
    } = useForm<FieldValues>({
        defaultValues: initialValue,
        resolver: zodResolver(loginSchema),
    });

    const [isAuthenticated, login] = useAuthStore(
        (state) => [state.isAuthenticated, state.login],
        shallow
    );
    console.log({ isAuthenticated });
    if (isAuthenticated) {
        navigate('/dashboard');
        return;
    }

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const { email, password } = data;
        toast.loading('Authenticating... ⌛', { id: '1' });

        const result = await login(email, password);
        console.log({ LOGIN: result });

        if (result?.success) {
            const message = result?.message ?? 'User login successfully 🚀';
            toast.success(message, { id: '1' });

            navigate('/dashboard');
        } else {
            let message;
            if (!result.message) {
                message = result;
            } else {
                message = result?.message ?? 'Error in while login user 🥲';
            }

            toast.error(message, {
                id: '1',
            });
        }
    };

    return (
        <div className='h-[83vh] flex items-center justify-center bg-white px-4 py-10 sm:px-6 sm:py-16 lg:px-8'>
            <div className='bg-slate-100 px-4 py-8 shadow-xl xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md'>
                <h2 className='text-2xl font-bold leading-tight text-black'>
                    Log in to your account
                </h2>
                <p className='mt-2text-sm text-gray-600 '>
                    Don&apos;t have an account?{' '}
                    <Link
                        to={'/sign-up'}
                        className='font-semibold text-black transition-all duration-200 hover:underline'
                    >
                        Create a free account
                    </Link>
                </p>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='mt-8'
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
                            <button
                                type='submit'
                                className='inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80'
                            >
                                Get started{' '}
                                <ArrowRight
                                    className='ml-2'
                                    size={16}
                                />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LogIn;
