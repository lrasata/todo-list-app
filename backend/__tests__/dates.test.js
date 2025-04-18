const {getDateTomorrow} = require("../src/util/dates");

test('get date of tomorrow', () => {
    expect(getDateTomorrow()).toBeTruthy();
});