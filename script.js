// Selecting DOM elements
const amountInput = document.getElementById('amount');
const typeSelect = document.getElementById('type');
const descriptionInput = document.getElementById('description');
const noteInput = document.getElementById('note'); // Note input field
const addEntryButton = document.getElementById('addEntry');
const totalIncomeDisplay = document.getElementById('totalIncome');
const totalExpensesDisplay = document.getElementById('totalExpenses');
const balanceDisplay = document.getElementById('balance');
const entriesList = document.getElementById('entriesList');

// Initialize totals
let totalIncome = 0;
let totalExpenses = 0;

// Preset options
const presets = {
    income: ['Salary', 'Bonus', 'Gift', 'Investment'],
    expense: ['Rent', 'Groceries', 'Utilities', 'Entertainment']
};

// Populate description options dynamically
typeSelect.addEventListener('change', () => {
    const selectedType = typeSelect.value;
    descriptionInput.innerHTML = ''; // Clear existing options

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

// Initialize with income options on page load
typeSelect.dispatchEvent(new Event('change'));

// Function to format numbers as currency
function formatCurrency(amount) {
    return `$${amount.toFixed(2)}`;
}

// Add entry function
addEntryButton.addEventListener('click', () => {
    const amount = parseFloat(amountInput.value);
    const type = typeSelect.value;
    const description = descriptionInput.value;
    const note = noteInput.value; // Get the note value

    // Validation
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    // Add entry to the list
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <span>${type === 'income' ? '+' : '-'} ${formatCurrency(amount)}${description ? `: ${description}` : ''}${note ? ` - ${note}` : ''}</span>
        <span class="delete" style="cursor: pointer;">❌</span>
    `;
    entriesList.appendChild(listItem);

    // Update totals
    if (type === 'income') {
        totalIncome += amount;
    } else {
        totalExpenses += amount;
    }

    updateSummary();

    // Clear input fields
    amountInput.value = '';
    descriptionInput.value = '';
    noteInput.value = ''; // Clear note field
    typeSelect.dispatchEvent(new Event('change'));

    // Add delete functionality
    listItem.querySelector('.delete').addEventListener('click', () => {
        listItem.remove();
        if (type === 'income') {
            totalIncome -= amount;
        } else {
            totalExpenses -= amount;
        }
        updateSummary();
    });
});

// Update summary display
function updateSummary() {
    totalIncomeDisplay.textContent = formatCurrency(totalIncome);
    totalExpensesDisplay.textContent = formatCurrency(totalExpenses);
    balanceDisplay.textContent = formatCurrency(totalIncome - totalExpenses);
}
