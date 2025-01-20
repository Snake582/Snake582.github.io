// Sélection des éléments
const addExpenseButton = document.getElementById('addExpenseButton');
const expenseModal = document.getElementById('expenseModal');
const saveExpenseButton = document.getElementById('saveExpense');
const cancelExpenseButton = document.getElementById('cancelExpense');
const expenseTable = document.getElementById('expenseTable');
const addRevenuButton = document.getElementById('addRevenuButton');
const revenusModal = document.getElementById('revenusModal');
const saveRevenuButton = document.getElementById('saveRevenu');
const cancelRevenuButton = document.getElementById('cancelRevenu');
const revenuTable = document.getElementById('revenuTable');

// Charger les dépenses dans le localStorage
const loadExpenses = () => {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.forEach(expense => {
        addExpenseToTable(expense.title, expense.amount);
    });
};

// Sélection des éléments
const budgetTotalElement = document.getElementById('budgetTotal');
const budgetDepensesElement = document.getElementById('budgetDepenses');
const budgetSoldeElement = document.getElementById('budgetSolde');

// Fonction pour charger et afficher les informations
const updateBudget = () => {
    // Charger les dépenses et les revenus depuis le localStorage
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const revenus = JSON.parse(localStorage.getItem('revenus')) || [];

    // Calculer le total des dépenses
    const totalDepenses = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);

    // Calculer le total des revenus
    const totalRevenus = revenus.reduce((acc, revenu) => acc + parseFloat(revenu.amount), 0);

    // Calculer le solde (revenus - dépenses)
    const solde = totalRevenus - totalDepenses;

    // Afficher les résultats dans les éléments HTML
    budgetTotalElement.textContent = ` ${totalRevenus.toFixed(2)}`;
    budgetDepensesElement.textContent = ` ${totalDepenses.toFixed(2)}`;
    budgetSoldeElement.textContent = ` ${solde.toFixed(2)}`;
};

// Appeler la fonction pour mettre à jour le budget au démarrage
updateBudget();

// Ajouter des écouteurs d'événements pour mettre à jour le budget lors de l'ajout de dépenses ou de revenus
document.getElementById('saveExpense').addEventListener('click', updateBudget);
document.getElementById('saveRevenu').addEventListener('click', updateBudget);

// Sauvegarder les dépenses dans le localStorage
const saveExpenses = () => {
    const expenses = [];
    document.querySelectorAll('#expenseTable tr').forEach((row, index) => {
        if (index > 0) {
            const title = row.cells[0].textContent;
            const amount = row.cells[1].textContent;
            expenses.push({ title, amount });
        }
    });
    localStorage.setItem('expenses', JSON.stringify(expenses));
};

// Ajouter une nouvelle dépense à la table
const addExpenseToTable = (title, amount) => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${title}</td>
        <td>${amount}</td>
        <td><button class="btn-delete">Supprimer</button></td>
    `;
    expenseTable.appendChild(row);
    addDeleteEvent(row.querySelector('.btn-delete'), 'expense');
};

// Charger les revenus dans le localStorage
const loadRevenus = () => {
    const revenus = JSON.parse(localStorage.getItem('revenus')) || [];
    revenus.forEach(revenu => {
        addRevenuToTable(revenu.title, revenu.amount);
    });
};

// Sauvegarder les revenus dans le localStorage
const saveRevenus = () => {
    const revenus = [];
    document.querySelectorAll('#revenuTable tr').forEach((row, index) => {
        if (index > 0) {
            const title = row.cells[0].textContent;
            const amount = row.cells[1].textContent;
            revenus.push({ title, amount });
        }
    });
    localStorage.setItem('revenus', JSON.stringify(revenus));
};

// Ajouter un nouveau revenu à la table
const addRevenuToTable = (title, amount) => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${title}</td>
        <td>${amount}</td>
        <td><button class="btn-delete">Supprimer</button></td>
    `;
    revenuTable.appendChild(row);
    addDeleteEvent(row.querySelector('.btn-delete'), 'revenu');
};

// Ajouter un événement de suppression pour les dépenses ou les revenus
const addDeleteEvent = (button, type) => {
    button.addEventListener('click', (e) => {
        e.target.parentElement.parentElement.remove();
        if (type === 'expense') {
            saveExpenses(); // Sauvegarder les dépenses après suppression
        } else if (type === 'revenu') {
            saveRevenus(); // Sauvegarder les revenus après suppression
        }
    });
};

// Ouvrir la modale pour les dépenses
addExpenseButton.addEventListener('click', () => {
    expenseModal.style.display = 'flex';
});

// Ouvrir la modale pour les revenus
addRevenuButton.addEventListener('click', () => {
    revenusModal.style.display = 'flex';
});

// Fermer la modale pour les dépenses
cancelExpenseButton.addEventListener('click', () => {
    expenseModal.style.display = 'none';
});

// Fermer la modale pour les revenus
cancelRevenuButton.addEventListener('click', () => {
    revenusModal.style.display = 'none';
});

// Ajouter une nouvelle dépense
saveExpenseButton.addEventListener('click', () => {
    const title = document.getElementById('expenseTitle').value;
    const amount = document.getElementById('expenseAmount').value;

    if (title && amount) {
        addExpenseToTable(title, amount);
        expenseModal.style.display = 'none';
        document.getElementById('expenseTitle').value = '';
        document.getElementById('expenseAmount').value = '';
        saveExpenses(); // Sauvegarder les dépenses après ajout
    } else {
        alert('Veuillez remplir tous les champs.');
    }
});

// Ajouter un nouveau revenu
saveRevenuButton.addEventListener('click', () => {
    const titleRevenue = document.getElementById('revenueTitle').value;
    const amountRevenue = document.getElementById('revenueAmount').value;

    if (titleRevenue && amountRevenue) {
        addRevenuToTable(titleRevenue, amountRevenue);
        revenusModal.style.display = 'none';
        document.getElementById('revenueTitle').value = '';
        document.getElementById('revenueAmount').value = '';
        saveRevenus(); // Sauvegarder les revenus après ajout
    } else {
        alert('Veuillez remplir tous les champs.');
    }
});

// Charger les dépenses au démarrage
loadExpenses();
// Charger les revenus au démarrage
loadRevenus();
