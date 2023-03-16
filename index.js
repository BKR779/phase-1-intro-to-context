// Your code here
function createEmployeeRecord(arr) {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employeeRecords) {
  return employeeRecords.map((record) => createEmployeeRecord(record));
}

function createTimeInEvent(recordObj, timestamp) {
  const timeIn = handleTimeObj("TimeIn", timestamp);
  recordObj.timeInEvents.push(timeIn);
  return recordObj;
}

function createTimeOutEvent(recordObj, timestamp) {
  const timeOut = handleTimeObj("TimeOut", timestamp);
  recordObj.timeOutEvents.push(timeOut);
  return recordObj;
}

function handleTimeObj(typeString, timestamp) {
  const [date, time] = timestamp.split(" ");
  const timeObj = {
    type: typeString,
    hour: parseInt(time),
    date: date,
  };
  return timeObj;
}

function hoursWorkedOnDate(employeeObj, datestamp) {
  const timeIn = employeeObj.timeInEvents.find(
    (inEvent) => inEvent.date === datestamp
  );
  const timeOut = employeeObj.timeOutEvents.find(
    (outEvent) => outEvent.date === datestamp
  );
  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employeeObj, datestamp) {
  const timeIn = employeeObj.timeInEvents.find(
    (inEvent) => inEvent.date === datestamp
  );
  const timeOut = employeeObj.timeOutEvents.find(
    (outEvent) => outEvent.date === datestamp
  );
  const payRate = employeeObj.payPerHour;
  return [(timeOut.hour - timeIn.hour) / 100] * payRate;
}

function allWagesFor(employeeObj) {
  let hoursWorked = [];
  let totalHours;
  for (let i = 0; i < employeeObj.timeInEvents.length; i++)
    if (
      employeeObj.timeInEvents[i].date === employeeObj.timeOutEvents[i].date
    ) {
      hoursWorked.push(
        (employeeObj.timeOutEvents[i].hour - employeeObj.timeInEvents[i].hour) /
        100
      );
    }
  totalHours = hoursWorked.reduce((a, b) => {
    return a + b;
  });
  return totalHours * employeeObj.payPerHour;
}

function calculatePayroll(recordsArray) {
  let employeeWages = [];
  let payrollCost = recordsArray.forEach((element) =>
    employeeWages.push(allWagesFor(element))
  );
  payrollCost = employeeWages.reduce((total, wage) => {
    return total + wage;
  });
  return payrollCost;
}