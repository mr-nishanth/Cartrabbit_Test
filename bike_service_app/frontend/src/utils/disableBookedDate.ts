import formatDate from './dateFormat';

function disableBookedDate(bookingIdArray: any) {
    return bookingIdArray?.map(({ startDate, endDate }) => ({
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
    }));
}

export default disableBookedDate;
