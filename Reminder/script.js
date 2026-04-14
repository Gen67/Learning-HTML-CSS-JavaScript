const addReminder = document.querySelector('.reminder-input'); 
const reminderInput = document.querySelector('.reminder-form');
const reminderList = document.querySelector('.reminder-items');
const counter = document.querySelector('.counter');
const clearBTN = document.getElementById('delete-btn');



reminderInput.addEventListener('submit', event =>{
    event.preventDefault();

    const reminderText = addReminder.value.trim();

    if(addReminder.value.trim() !== ''){
       const addItem = document.createElement('p');


        addItem.textContent = `~${reminderText}`;
        addItem.classList.add('reminder-item');
        reminderList.appendChild(addItem);
        addReminder.value = '';


        counter.style = 'display: block';
        counter.textContent = ` Task:${reminderList.children.length}`;
    } else{ 
        alert('Please enter a reminder');
    }

    

}); 

clearBTN.addEventListener('click', () => {
    reminderList.innerHTML = '';
    counter.style = 'display: none';
});
