let expenseBtn = document.getElementById('expenseBtn');
let reportBtn = document.getElementById('reportBtn');
let entryDiv = document.getElementById('entryDiv');
let statsDiv = document.getElementById('statsDiv');
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