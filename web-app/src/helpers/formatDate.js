function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

/**
 * @description It formats Data object to yyyy-mm-dd string
 * 
 * @returns (string) 
 */
export default function formatDate(date) {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-');
}
