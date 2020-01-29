var months = [
    'Enero', 
    'Febrero', 
    'Marzo', 
    'Abril', 
    'Mayo', 
    'Junio', 
    'Julio', 
    'Agosto', 
    'Septiembre', 
    'Octubre', 
    'Noviembre', 
    'Diciembre'
];

export function getMonthNames() {
    return months;
}

export function getMonthNameByMonthNumber(monthNumber: number): any {
    var idx: number = monthNumber - 1;
    return months[idx];
}

export function getDateStringByDate(jsDate: Date): String {
    const monthStr: String = (jsDate.getMonth() + 1 ).toString();
    const dayStr: String = jsDate.getDate().toString();

    const year: String = jsDate.getFullYear().toString();
    const month: String = (monthStr.length == 1) ? ('0' + monthStr) : monthStr;
    const day: String = (dayStr.length == 1) ? ('0' + dayStr) : dayStr;

    return year + '-' + month + '-' + day;
}

export function getFirstDateOfByYear(year: Number): Date {
    return new Date('01/01/' + year);
}