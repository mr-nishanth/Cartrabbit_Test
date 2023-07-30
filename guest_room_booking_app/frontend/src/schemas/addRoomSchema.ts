import * as z from 'zod';

const roomSchema = z.object({
    name: z.string().nonempty('Room name is required.'),
    numBeds: z.string().nonempty('Number of Beds is required.'),
    minStay: z.string().nonempty('Minimum Stay is required.'),
    maxStay: z.string().nonempty('Maximum Stay is required.'),
    rentPerDay: z.string().nonempty('Rent Per Day is required.'),
});

export default roomSchema;
