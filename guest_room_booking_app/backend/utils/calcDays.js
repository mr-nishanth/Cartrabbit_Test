exports.calcDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
    console.log({ days });
    return days;
};
