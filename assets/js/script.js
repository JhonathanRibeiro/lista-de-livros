class Livros {
    constructor(titulo, autor, isbn) {
        this.titulo = titulo;
        this.autor = autor;
        this.isbn = isbn;
    }
}

class UI {
    static exibirLivros() {
        const lista = [
            {
                titulo: 'Livro um',
                autor: 'Jhonatan Ribeiro',
                isbn: '323536'
            },
            {
                titulo: 'Livro dois',
                autor: 'Jhonatan Ribeiro',
                isbn: '323536'
            }
        ];

        const livros = lista;

        livros.forEach((livro) => UI.addLivroNaLista(livro));
    }

    static addLivroNaLista(livro) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${livro.titulo}</td>
            <td>${livro.autor}</td>
            <td>${livro.isbn}</td>
            <td>
                <a href="#" class="btn btn-danger btn-sm delete">X</a>
            </td>
        `;

        list.appendChild(row);
    }

    static  clearFields() {
        document.querySelector('#title') = '';
        document.querySelector('#author') = '';
        document.querySelector('#isbn') = '';
    }

    static showAlert(msg, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(msg));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        //remove o alert em 3 segundos
        setTimeout(()=> document.querySelector('.alert').remove(),3000);
    }

    static deletarLivro(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

}

//Store Class
class Store {
    static getLivros(){

    }
    static addLivro(livro) {

    }
    static removeLivro(isbn){

    }
}

document.addEventListener('DOMContentLoaded', UI.exibirLivros);

document.querySelector('#book-form').addEventListener('submit', (e)=>{
    e.preventDefault();

    const titulo = document.querySelector('#title').value;
    const autor = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    
    //Validação
    if (titulo === '' || autor === '' || isbn === '') {
        UI.showAlert('Por favor preencha todos os campos obrigatórios!', 'danger');
    } else {
        //Instanciando o livro
        const livro = new Livros(titulo, autor, isbn);
        //adicionando um livro na lista        
        UI.addLivroNaLista(livro);
        //exibe a mensahem de sucesso
        UI.showAlert('Livro adicionado com sucesso!','success');
        //limpando campos
        UI.clearFields();
    }
});


//Evento: remover livro
document.querySelector('#book-list').addEventListener('click', (e)=>{
    e.preventDefault();
    
    UI.deletarLivro(e.target);

      //exibe a mensahem de sucesso
      UI.showAlert('Livro removido com sucesso!','success');
    console.log(e.target)
});




