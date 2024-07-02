const fullDate = new Date();
const todayDate = fullDate.getDate();
const todayMonth = fullDate.getMonth() + 1;
const todayYear = fullDate.getFullYear();
const todayExpenseTxt = document.getElementById('todayExpenseTxt');
const monthExpenseTxt = document.getElementById('monthExpenseTxt');

todayExpenseTxt.innerText = ` ₹${calculateDayExpense(todayDate, todayMonth, todayYear)}`;
monthExpenseTxt.innerText = ` ₹${calculateMonthExpense(todayMonth)}`;

const expenseBtn = document.getElementById('expenseBtn');
const reportBtn = document.getElementById('reportBtn');
const entryDiv = document.getElementById('entryDiv');
const statsDiv = document.getElementById('statsDiv');
const dateTxt = document.getElementById('dateTxt');

const popupEle = document.getElementById('popupDiv');
const overlayEle = document.getElementById('overlay');


dateTxt.innerText = `${todayDate} / ${todayMonth} / ${todayYear}`;



function toReport() {
  expenseBtn.classList.remove('active');
  reportBtn.classList.add('active');
  entryDiv.style.display = 'none';
  statsDiv.style.display = 'none';
}

function toEntry() {
  expenseBtn.classList.add('active');
  reportBtn.classList.remove('active');
  entryDiv.style.display = 'flex';
  statsDiv.style.display = 'block';
}

let dataArr = JSON.parse(localStorage.getItem('dataArr')) || [
  {
    date: 24,
    month: 6,
    year: 2024,
    totalDayExpense: 100,
    dayExpensesArray: [
      { amount: 10, message: 'sugarcane juice' },
      { amount: 90, message: 'badam milk' }
    ]
  },
  {
    date: 25,
    month: 6,
    year: 2024,
    totalDayExpense: 0,
    dayExpensesArray: []
  }
];

if (!localStorage.getItem('dataArr')) {
  localStorage.setItem('dataArr', JSON.stringify(dataArr));
}

function saveExpense() {
  const amount = parseFloat(document.getElementById('amountInp').value);
  const message = document.getElementById('messageInp').value;
  let data = JSON.parse(localStorage.getItem('dataArr'))
  if (!amount || !message) {
    alert('Please enter both amount and message.');
    return;
  }

  let found = false;
  for (let entry of data) {
    if (entry.date === todayDate && entry.month === todayMonth && entry.year === todayYear) {
      entry.dayExpensesArray.push({ amount, message });
      entry.totalDayExpense += amount;
      found = true;
      break;
    }
  }

  if (!found) {
    data.push({
      date: todayDate,
      month: todayMonth,
      year: todayYear,
      totalDayExpense: amount,
      dayExpensesArray: [{ amount, message }]
    });
  }

  localStorage.setItem('dataArr', JSON.stringify(data));
  todayExpenseTxt.innerText = ` ₹${calculateDayExpense(todayDate, todayMonth, todayYear)}`;
  monthExpenseTxt.innerText = ` ₹${calculateMonthExpense(todayMonth)}`;
  
  document.getElementById('amountInp').value = '';
  document.getElementById('messageInp').value = '';
  console.log(JSON.parse(localStorage.getItem('dataArr')));
}

console.log(JSON.parse(localStorage.getItem('dataArr')));
function calculateDayExpense(date, month, year) {
  let data = JSON.parse(localStorage.getItem('dataArr'))

  let expense = 0;
  if (Array.isArray(data)) {
    for (let entry of data) {
      if (entry.date === date && entry.month === month && entry.year === year) {
        for (let expenseItem of entry.dayExpensesArray) {
          expense += expenseItem.amount;
        }
      }
    }
  }
  return expense;
}

function calculateMonthExpense(month) {
  let data = JSON.parse(localStorage.getItem('dataArr'));
  

  let expense = 0;
  if (Array.isArray(data)) {
    for (let entry of data) {
      if (entry.month === todayMonth) {
        for (let expenseItem of entry.dayExpensesArray) {
          expense += expenseItem.amount;
        }
      }
    }
  }
  return expense;
}

todayExpenseTxt.innerText = ` ₹${calculateDayExpense(todayDate, todayMonth, todayYear)}`;

function resetData() {
  let data =[
    
    {
      date: todayDate,
      month: todayMonth,
      year: todayYear,
      totalDayExpense: calculateDayExpense(todayDate,todayMonth,todayYear),
      dayExpensesArray: []
    }
    
  ];
  localStorage.setItem('dataArr',JSON.stringify(data));
  closePopup();
  window.location.reload();
}

function popup() {
  popupEle.style.display = 'flex';
  overlayEle.style.display = 'flex';
}

function closePopup() {
  popupEle.style.display = 'none';
  overlayEle.style.display = 'none';
  window.location.reload();
}
