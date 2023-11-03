/*const currentDateTime = new Date();
const formattedDateTime = currentDateTime.toLocaleString();
const aformattedDateTime = currentDateTime.toISOString().slice(0, 10);
console.log(currentDateTime);
console.log(formattedDateTime);
console.log(aformattedDateTime);*/
const currentDateTime = new Date();
const day = currentDateTime.getDate();
const month = currentDateTime.getMonth() + 1; // Months are zero-based, so add 1
const year = currentDateTime.getFullYear();

// Create the formatted date string in "dd-mm-yyyy" format
const formattedDate = `${day}-${month}-${year}`;
console.log(formattedDate);
