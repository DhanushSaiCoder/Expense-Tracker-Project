let expenseBtn = document.getElementById('expenseBtn');
let reportBtn = document.getElementById('reportBtn');
let entryDiv = document.getElementById('entryDiv');
let statsDiv = document.getElementById('statsDiv');
let dateTxt = document.getElementById('dateTxt');
const date = new Date()
dateTxt.innerText = `${date.getDate()} / ${date.getMonth()} / ${date.getFullYear()}`;
function toReport(){
  expenseBtn.classList.remove('active');
  reportBtn.classList.add('active');
  entryDiv.style.display='none';
  statsDiv.style.display='none';
}
function toEntry() {
  expenseBtn.classList.add('active');
  reportBtn.classList.remove('active');
  entryDiv.style.display='flex';
  statsDiv.style.display='block';
}
function saveExpense() {
  
}