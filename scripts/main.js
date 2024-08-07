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
const reportDiv = document.getElementById('reportDiv');
const tbody = document.getElementById('tBody');
const dayReportDiv = document.getElementById('dayReportDiv')
const dayReportDivDate = document.getElementById('dayReportDiv-date')
const dayReportDivTbody = document.getElementById('dayReportDiv-tbody')


dayReportDiv.style.display = 'none';
reportDiv.style.display = 'none';
dateTxt.innerText = `${todayDate} / ${todayMonth} / ${todayYear}`;

function toReport() {
  expenseBtn.classList.remove('active');
  reportBtn.classList.add('active');
  entryDiv.style.display = 'none';
  reportDiv.style.display = 'flex';
  renderTable();
}

function toEntry() {
  expenseBtn.classList.add('active');
  reportBtn.classList.remove('active');
  entryDiv.style.display = 'flex';
  reportDiv.style.display = 'none';
  dayReportDiv.style.display = 'none';
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
  if (!amount || !message) {
    alert('Please enter both amount and message.');
    return;
  }
  let ans = prompt('Enter PIN:');
  if (ans==='sai') {
    
  
  
  
  let data = JSON.parse(localStorage.getItem('dataArr'));
  

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
  else {
    alert('Wrong PIN !')
    document.getElementById('amountInp').value = '';
  document.getElementById('messageInp').value = ''; 
  }
}

console.log(JSON.parse(localStorage.getItem('dataArr')));

function calculateDayExpense(date, month, year) {
  let data = JSON.parse(localStorage.getItem('dataArr'));

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
      if (entry.month === month) {
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
  let data = [
    {
      date: todayDate,
      month: todayMonth,
      year: todayYear,
      totalDayExpense: 0,
      dayExpensesArray: []
    }
  ];
  localStorage.setItem('dataArr', JSON.stringify(data));
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

function renderTable() {
  let data = JSON.parse(localStorage.getItem('dataArr'));
  let innerHtml = '';
  let html = '';
  for (let day of data) {
    html = `<tr>
          <td>${day.date}/${day.month}/${day.year}</td>
          <td>₹ ${day.totalDayExpense}/-</td>
          <td><button onclick="renderDayTable(${day.date}, ${day.month}, ${day.year})" class="viewBtn">View >></button></td>
        </tr>`;
    innerHtml += html;
  }
  tbody.innerHTML = innerHtml;
}

function renderDayTable(date, month, year) {
  dayReportDiv.style.display = 'flex';
  reportDiv.style.display = 'none';
  dayReportDivDate.innerHTML = `${date}/${month}/${year}`;  
  
  let data = JSON.parse(localStorage.getItem('dataArr'));
  let innerHtml = '';
  let html = '';
  
  for (let day of data) {
    if (day.date === date && day.month === month && day.year === year) {
      for (let expense of day.dayExpensesArray) {
        html = `
          <tr>
           <td>₹ ${expense.amount}/-</td>
           <td>${expense.message}</td>
         </tr>
        `;
        innerHtml += html;
      }
      break; // Break after finding the matching day
    }
  }
  dayReportDivTbody.innerHTML = innerHtml;
}