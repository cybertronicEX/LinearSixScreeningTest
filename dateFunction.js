// 1.1
Date.prototype.daysTo = function (otherDate) {
    const millisecs = 1000 * 60 * 60 *24
    const date1 = Date.UTC(this.getFullYear(), this.getMonth(), this.getDate());
    const date2 = Date.UTC(otherDate.getFullYear(), otherDate.getMonth(), otherDate.getDate());
    return Math.floor((date2 - date1)/ millisecs);
};

const d1 = new Date("2021-11-01");
const d2 = new Date("2021-11-14");

console.log(d1.daysTo(d2));