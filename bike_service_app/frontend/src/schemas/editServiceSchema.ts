import * as z from 'zod';
const editServiceSchema = z.object({
    name: z
        .string()
        .min(5, { message: 'Name must be at least 5 characters long' })
        .max(64, { message: 'Name must not exceed 64 characters' }),
    description: z
        .string()
        .min(5, { message: 'Description must be at least 5 characters long' })
        .max(256, { message: 'Description must not exceed 256 characters' }),
    price: z.string().nonempty({ message: 'Price must not be empty' }),
});

export default editServiceSchema;
