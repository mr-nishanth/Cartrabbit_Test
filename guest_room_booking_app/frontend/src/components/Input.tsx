import clsx from 'clsx';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputProps {
    label: string;
    id: string;
    type?: string;
    disabled?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
    label,
    id,
    type,
    disabled,
    register,
    errors,
}) => {
    return (
        <div>
            <label
                className='text-base font-medium text-gray-900'
                htmlFor={id}
            >
                {label}
            </label>
            <div className='mt-1'>
                <input
                    id={id}
                    type={type}
                    autoComplete={id}
                    disabled={disabled}
                    {...register(id, {
                        required: `${id} is required`,
                    })}
                    className={clsx(
                        `                        
                        flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50
                    `,
                        errors[id] && 'focus:ring-rose-500',
                        disabled && 'opacity-50 cursor-default'
                    )}
                    placeholder={`Enter your ${id}`}
                />
                {errors?.[id] && (
                    <span className='text-red-400 text-sm leading-6'>
                        {errors?.[id]?.message}
                    </span>
                )}
            </div>
        </div>
    );
};

export default Input;
