module.exports.getDateTomorrow = () => {
    const today = new Date();
    const tomorrow = today;

    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0,0,0,0);
    return tomorrow;
}