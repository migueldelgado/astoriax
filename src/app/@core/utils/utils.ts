export function numberWithCommas(number){
    return number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : 0;
}

export function valuePrepareFunction(val) {
    return Number.isInteger(val) ? '$ ' + numberWithCommas(val) : '-';
}