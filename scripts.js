const API_URL = 'https://crudcrud.com/api/3866f5ff37254853bf029538c96eed3b/clientes';

const form = document.getElementById('formCliente');
const listaClientes = document.getElementById('listaClientes');

// LISTAR CLIENTES (GET)
function listarClientes() {
  fetch(API_URL)
    .then(response => response.json())
    .then(clientes => {
      listaClientes.innerHTML = '';

      clientes.forEach(cliente => {
        const li = document.createElement('li');
        li.innerHTML = `
          ${cliente.nome} - ${cliente.email}
          <button onclick="excluirCliente('${cliente._id}')">Excluir</button>
        `;
        listaClientes.appendChild(li);
      });
    })
    .catch(error => console.error('Erro ao listar clientes:', error));
}

// CADASTRAR CLIENTE (POST)
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;

  const cliente = { nome, email };

  fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cliente)
  })
    .then(() => {
      form.reset();
      listarClientes();
    })
    .catch(error => console.error('Erro ao cadastrar cliente:', error));
});

// EXCLUIR CLIENTE (DELETE)
function excluirCliente(id) {
  fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  })
    .then(() => listarClientes())
    .catch(error => console.error('Erro ao excluir cliente:', error));
}

// CARREGA AO ABRIR A PÁGINA
listarClientes();
