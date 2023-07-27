import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import Input from '../components/Input';
import { toast } from 'react-hot-toast';

import useAuthStore from '../store/useAuthStore';
import editProfileSchema from '../schemas/editProfileSchema';

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
];

export function EditProfile() {
    const [user, updateProfile] = useAuthStore((state) => [
        state.user,
        state.updateProfile,
    ]);
    console.log({ user });
    const initialValue: EditProfile = {
        name: user?.name,
        email: user?.email,
        mobile: user?.mobile,
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isLoading },
    } = useForm<FieldValues>({
        defaultValues: initialValue,
        resolver: zodResolver(editProfileSchema),
    });
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const { name, email, mobile } = data;
        toast.loading('Updating User Profile ⌛', { id: '1' });
        const result = await updateProfile(name, email, mobile);

        console.log({ updateProfile: result });

        if (result.success) {
            toast.success('Profile update successfully 🚀', { id: '1' });
        } else {
            toast.error('Error in while update user profile 🥲', {
                id: '1',
            });
        }
    };

    return (
        <div className='flex-col justify-start items-center m-6 w-64'>
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
                            className='rounded-md bg-teal-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600'
                        >
                            Save Profile
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
