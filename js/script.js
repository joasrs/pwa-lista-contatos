class ContatoCard extends HTMLElement {
    constructor() {
        super();
        const template = document.getElementById('contato-card-template').content;
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.cloneNode(true));

        this.toggleButton = shadowRoot.getElementById('toggle-details');
        this.details = shadowRoot.querySelector('.details');

        this.toggleButton.addEventListener('click', () => {
            this.details.classList.toggle('show');
            this.toggleButton.textContent = this.details.classList.contains('show') ? 'Ocultar Detalhes' : 'Mostrar Detalhes';
        });
    }
}

customElements.define('contato-card', ContatoCard);

const contatos = [
    {nome:'João da Silva', telefone: '47 98798-12518', endereco: 'Rua XV de novembro, 531', cidade: 'Itajaí', uf: 'SC'},
    {nome:'Mario da Silva', telefone: '47 98798-48154', endereco: 'Rua XV de outubro, 15', cidade: 'Balneário Camboriú', uf: 'SC'},
    {nome:'João de Souza', telefone: '48 97887-68154', endereco: 'Rua 13 de julho, 48', cidade: 'Florianópolis', uf: 'SC'},
    {nome:'João Maria', telefone: '45 99978-78125', endereco: 'Rua 7 de setembro, 654', cidade: 'Curitiba', uf: 'PR'},
    {nome:'Maria João', telefone: '11 97987-58125', endereco: 'Rua 21 de abril, 654', cidade: 'São Paulo', uf: 'SP'},
    {nome:'Silva e Souza', telefone: '47 99997-65484', endereco: 'Rua 01 de abril, 21', cidade: 'Itajaí', uf: 'SC'},
    {nome:'Jacinto Filho', telefone: '85 99914-12184', endereco: 'Rua 25 de dezembro, 151', cidade: 'Rio Branco', uf: 'AC'},
    {nome:'Telêmaco Borba', telefone: '51 97487-88429', endereco: 'Rua Marechal Rondom, 315', cidade: 'Porto Alegre', uf: 'RS'},
    {nome:'Hugo Chaves', telefone: '47 94156-98781', endereco: 'Rua Candido Mariano, 651', cidade: 'Blumenau', uf: 'SC'},
    {nome:'Evita Perón', telefone: '47 98748-61258', endereco: 'Avenida Afonso Pena, 2316', cidade: 'Camboriú', uf: 'SC'}
];

const container = document.getElementById('contatos-container');

function renderContatos(filteredContatos) {
    container.innerHTML = '';
    filteredContatos.forEach(contato => {
        const card = document.createElement('contato-card');

        const nomeSlot = document.createElement('span');
        nomeSlot.slot = 'nome';
        nomeSlot.textContent = contato.nome;

        const telefoneSlot = document.createElement('span');
        telefoneSlot.slot = 'telefone';
        telefoneSlot.textContent = contato.telefone;

        const enderecoSlot = document.createElement('span');
        enderecoSlot.slot = 'endereco';
        enderecoSlot.textContent = contato.endereco;

        const cidadeSlot = document.createElement('span');
        cidadeSlot.slot = 'cidade';
        cidadeSlot.textContent = contato.cidade;

        const ufSlot = document.createElement('span');
        ufSlot.slot = 'uf';
        ufSlot.textContent = contato.uf;

        card.appendChild(nomeSlot);
        card.appendChild(telefoneSlot);
        card.appendChild(enderecoSlot);
        card.appendChild(cidadeSlot);
        card.appendChild(ufSlot);

        container.appendChild(card);
    });
}

renderContatos(contatos);

document.getElementById('apply-filters').addEventListener('click', () => {
    const name = document.getElementById('search-name').value.toLowerCase();
    const uf = document.getElementById('filter-uf').value;

    const filteredContatos = contatos.filter(contato => {
        return (!name || contato.nome.toLowerCase().includes(name)) &&
               (!uf || contato.uf === uf);
    });

    renderContatos(filteredContatos);
});

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("../service-worker.js")
        .then(res => console.log("service worker registrado"))
        .catch(err => console.log("service worker não registrado", err))
    })
}
