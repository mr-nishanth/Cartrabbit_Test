import { formatISO } from 'date-fns';

// Utility function to convert ISO date string to 'YYYY-MM-DD' format
function formatDate(isoString: any) {
    return isoString
        ? formatISO(new Date(isoString), { representation: 'date' })
        : '';
}

export default formatDate;
