// Selecting elements from the DOM
let expenseBtn = document.getElementById('expenseBtn');
let reportBtn = document.getElementById('reportBtn');
let entryDiv = document.getElementById('entryDiv');
let statsDiv = document.getElementById('statsDiv');
let dateTxt = document.getElementById('dateTxt');
let todayExpenseTxt = document.getElementById('todayExpenseTxt');
let popupEle = document.getElementById('popupDiv');
let overlayEle = document.getElementById('overlay');
// Getting the current date
const fullDate = new Date();
let todayDate = fullDate.getDate();
let todayMonth = fullDate.getMonth() + 1;
let todayYear = fullDate.getFullYear();

// Displaying the current date
dateTxt.innerText = `${todayDate} / ${todayMonth} / ${todayYear}`;
// Function to switch to report view
function toReport() {
  expenseBtn.classList.remove('active');
  reportBtn.classList.add('active');
  entryDiv.style.display = 'none';
  statsDiv.style.display = 'none';
}
// Function to switch to entry view
function toEntry() {
  expenseBtn.classList.add('active');
  reportBtn.classList.remove('active');
  entryDiv.style.display = 'flex';
  statsDiv.style.display = 'block';
}
// Initializing or retrieving data array from localStorage
let dataArr = JSON.parse(localStorage.getItem('dataArr')) || [
  {
    date: 24,
    month: 6,
    year: 2024,
    totalDayExpense: 30,
    dayExpensesArray: [
      { amount: 10, message: 'sugarcane juice' },
      { amount: 20, message: 'badam milk' }
    ]
  },
  {
    date: 25,
    month: 6,
    year: 2024,
    totalDayExpense: 30,
    dayExpensesArray: [
      { amount: 20, message: 'bourbon' },
      { amount: 10, message: 'bread' }
    ]
  }
];

// Saving the initialized data to localStorage if not already present
if (!localStorage.getItem('dataArr')) {
  localStorage.setItem('dataArr', JSON.stringify(dataArr));
}

// Function to save a new expense
function saveExpense() {
  let amount = parseFloat(document.getElementById('amountInp').value);
  let message = document.getElementById('messageInp').value;

  if (!amount || !message) {
    alert('Please enter both amount and message.');
    return;
  }

  let found = false;
  for (let entry of dataArr) {
    if (entry.date === todayDate && entry.month === todayMonth && entry.year === todayYear) {
      entry.dayExpensesArray.push({ amount, message });
      entry.totalDayExpense += amount;
      found = true;
      break;
    }
  }

  if (!found) {
    dataArr.push({
      date: todayDate,
      month: todayMonth,
      year: todayYear,
      totalDayExpense: amount,
      dayExpensesArray: [{ amount, message }]
    });
  }

  localStorage.setItem('dataArr', JSON.stringify(dataArr));
  todayExpenseTxt.innerText = ` ₹${calculateDayExpense(todayDate, todayMonth, todayYear)}`;

  document.getElementById('amountInp').value = '';
  document.getElementById('messageInp').value = '';
}

// Function to calculate total expense for a given day
function calculateDayExpense(date, month, year) {
  let expense = 0;
  for (let entry of dataArr) {
    if (entry.date === date && entry.month === month && entry.year === year) {
      for (let expenseItem of entry.dayExpensesArray) {
        expense += expenseItem.amount;
      }
      break;
    }
  }
  return expense;
}

// Displaying today's total expense
todayExpenseTxt.innerText = ` ₹${calculateDayExpense(todayDate, todayMonth, todayYear)}`;

function resetData() {
  let response = popup();
}

function popup(){
  popupEle.style.display = 'flex';
  overlayEle.style.display = 'flex';
  
}
function closePopup() {
  popupEle.style.display = 'none';
  overlayEle.style.display = 'none';
}