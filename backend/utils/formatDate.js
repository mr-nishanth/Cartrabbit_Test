exports.formatDate = (isoString) => {
    const date = new Date(isoString);
    const formattedDate = new Intl.DateTimeFormat('en-IN').format(date);
    return formattedDate;
};
