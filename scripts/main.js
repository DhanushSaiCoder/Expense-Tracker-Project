let expenseBtn = document.getElementById('expenseBtn');
let reportBtn = document.getElementById('reportBtn');

function toReport(){
  expenseBtn.classList.remove('active');
  reportBtn.classList.add('active')
}
function toEntry() {
  expenseBtn.classList.add('active');
  reportBtn.classList.remove('active')
}