
const amountInput = document.getElementById('amount');
const typeSelect = document.getElementById('type');
const descriptionInput = document.getElementById('description');
const noteInput = document.getElementById('note');
const addEntryButton = document.getElementById('addEntry');
const totalIncomeDisplay = document.getElementById('totalIncome');
const totalExpensesDisplay = document.getElementById('totalExpenses');
const balanceDisplay = document.getElementById('balance');
const entriesList = document.getElementById('entriesList');

// Initialize totals
let totalIncome = 0;
let totalExpenses = 0;

//options for descriptions
const presets = {
    income: ['Salary', 'Bonus', 'Gift', 'Investment'],
    expense: ['Rent', 'Groceries', 'Utilities', 'Entertainment']
};

// dropdown
typeSelect.addEventListener('change', () => {
    const selectedType = typeSelect.value;
    descriptionInput.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Optional Description';
    descriptionInput.appendChild(defaultOption);

    presets[selectedType].forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        descriptionInput.appendChild(optionElement);
    });
});


typeSelect.dispatchEvent(new Event('change'));

//  currency
function formatCurrency(amount) {
    return `$${amount.toFixed(2)}`;
}

// Add entry function
addEntryButton.addEventListener('click', () => {
    const amount = parseFloat(amountInput.value);
    const type = typeSelect.value;
    const description = descriptionInput.value;
    const note = noteInput.value;

    // Validation
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    // Create new list item
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <span>${type === 'income' ? '+' : '-'} ${formatCurrency(amount)}${description ? ` (${description})` : ''}${note ? ` - ${note}` : ''}</span>
        <button class="markComplete">Mark as Completed</button>
        <button class="delete">Delete</button>
    `;
    entriesList.appendChild(listItem);

    // Update totals
    if (type === 'income') {
        totalIncome += amount;
    } else {
        totalExpenses += amount;
    }
    updateSummary();

    // Clear inputs
    amountInput.value = '';
    descriptionInput.value = '';
    noteInput.value = '';
    typeSelect.dispatchEvent(new Event('change'));

    // Mark as completed functionality
    listItem.querySelector('.markComplete').addEventListener('click', () => {
        listItem.classList.toggle('completed');
    });

    // Delete functionality
    listItem.querySelector('.delete').addEventListener('click', () => {
        listItem.remove();
        if (listItem.classList.contains('completed')) {
            if (type === 'income') {
                totalIncome -= amount;
            } else {
                totalExpenses -= amount;
            }
            updateSummary();
        } else {
            alert("Please mark the entry as completed before deleting!");
        }
    });
});

// Update summary display
function updateSummary() {
    totalIncomeDisplay.textContent = formatCurrency(totalIncome);
    totalExpensesDisplay.textContent = formatCurrency(totalExpenses);
    balanceDisplay.textContent = formatCurrency(totalIncome - totalExpenses);
}
