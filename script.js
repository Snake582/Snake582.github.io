// Sélection des éléments
const addExpenseButton = document.getElementById('addExpenseButton');
const expenseModal = document.getElementById('expenseModal');
const saveExpenseButton = document.getElementById('saveExpense');
const cancelExpenseButton = document.getElementById('cancelExpense');
const expenseTableBody = document.getElementById('expenseTbody');

const addRevenuButton = document.getElementById('addRevenuButton');
const revenusModal = document.getElementById('revenusModal');
const saveRevenuButton = document.getElementById('saveRevenu');
const cancelRevenuButton = document.getElementById('cancelRevenu');
const revenuTableBody = document.getElementById('revenuTbody');

const budgetTotalElement = document.getElementById('budgetTotal');
const budgetDepensesElement = document.getElementById('budgetDepenses');
const budgetSoldeElement = document.getElementById('budgetSolde');

// Fonction pour charger et afficher les informations
const updateBudget = () => {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const revenus = JSON.parse(localStorage.getItem('revenus')) || [];

    const totalDepenses = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
    const totalRevenus = revenus.reduce((acc, revenu) => acc + parseFloat(revenu.amount), 0);
    const solde = totalRevenus - totalDepenses;

    budgetTotalElement.textContent = `${totalRevenus.toFixed(2)} €`;
    budgetDepensesElement.textContent = `${totalDepenses.toFixed(2)} €`;
    budgetSoldeElement.textContent = `${solde.toFixed(2)} €`;
};

// Sauvegarder les dépenses dans le localStorage
const saveExpenses = () => {
    const expenses = [];
    expenseTableBody.querySelectorAll('tr').forEach(row => {
        const title = row.cells[0].textContent;
        const amount = row.cells[1].textContent;
        expenses.push({ title, amount });
    });
    localStorage.setItem('expenses', JSON.stringify(expenses));
};

// Sauvegarder les revenus dans le localStorage
const saveRevenus = () => {
    const revenus = [];
    revenuTableBody.querySelectorAll('tr').forEach(row => {
        const title = row.cells[0].textContent;
        const amount = row.cells[1].textContent;
        revenus.push({ title, amount });
    });
    localStorage.setItem('revenus', JSON.stringify(revenus));
};

// Ajouter une ligne de dépense
const addExpenseToTable = (title, amount) => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${title}</td>
        <td>${amount}</td>
        <td><button class="btn-delete">Supprimer</button></td>
    `;
    expenseTableBody.appendChild(row);
    addDeleteEvent(row.querySelector('.btn-delete'), 'expense');
};

// Ajouter une ligne de revenu
const addRevenuToTable = (title, amount) => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${title}</td>
        <td>${amount}</td>
        <td><button class="btn-delete">Supprimer</button></td>
    `;
    revenuTableBody.appendChild(row);
    addDeleteEvent(row.querySelector('.btn-delete'), 'revenu');
};

// Gestion suppression
const addDeleteEvent = (button, type) => {
    button.addEventListener('click', (e) => {
        e.target.closest('tr').remove();
        if (type === 'expense') {
            saveExpenses();
        } else if (type === 'revenu') {
            saveRevenus();
        }
        updateBudget();
    });
};

// Chargement des dépenses depuis le backend
const loadExpenses = () => {
  fetch('http://localhost:3000/budgets', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log('Dépenses récupérées:', data);
      data.forEach(expense => {
        if (expense.type === 'expense') {
          addExpenseToTable(expense.title, expense.amount);
        }
      });
      updateBudget();
    })
    .catch(error => console.error('Erreur:', error));
};


// Chargement des revenus
const loadRevenus = () => {
  fetch('http://localhost:3000/revenus', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log('Revenus récupérés:', data);
      data.forEach(revenu => {
        addRevenuToTable(revenu.title, revenu.amount);
      });
      updateBudget(); // met à jour les totaux après affichage
    })
    .catch(error => console.error('Erreur lors du chargement des revenus:', error));
};


// Ouverture/fermeture des modales
addExpenseButton.addEventListener('click', () => expenseModal.style.display = 'flex');
cancelExpenseButton.addEventListener('click', () => expenseModal.style.display = 'none');
addRevenuButton.addEventListener('click', () => revenusModal.style.display = 'flex');
cancelRevenuButton.addEventListener('click', () => revenusModal.style.display = 'none');

// Ajout dépense
saveExpenseButton.addEventListener('click', () => {
    const title = document.getElementById('expenseTitle').value;
    const amount = document.getElementById('expenseAmount').value;

    fetch('http://localhost:3000/budgets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title,
      amount: parseInt(amount),
      type: 'expense'
    })
  })
  .then(res => res.json())
  .then(data => console.log('Dépense ajoutée:', data))
  .catch(error => console.error('Erreur:', error));
    if (title && amount) {
        addExpenseToTable(title, amount);
        document.getElementById('expenseTitle').value = '';
        document.getElementById('expenseAmount').value = '';
        expenseModal.style.display = 'none';
        saveExpenses();
        updateBudget();
    } else {
        alert("Veuillez remplir tous les champs.");
    }
});

// Ajout revenu
saveRevenuButton.addEventListener('click', () => {
    const title = document.getElementById('revenueTitle').value;
    const amount = document.getElementById('revenueAmount').value;

     fetch('http://localhost:3000/revenus', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title,
      amount:  parseInt(amount),
      type: 'revenu'
    })
  })
    .then(res =>  res.json())
    .then(data => console.log('Revenu ajouté:', data))
    .catch(error => console.error('Erreur:', error));
    if (title && amount) {
        addRevenuToTable(title, amount);
        document.getElementById('revenueTitle').value = '';
        document.getElementById('revenueAmount').value = '';
        revenusModal.style.display = 'none';
        saveRevenus();
        updateBudget();
    } else {
        alert("Veuillez remplir tous les champs.");
    }
});

// Initialisation
loadExpenses();
loadRevenus();
updateBudget();
