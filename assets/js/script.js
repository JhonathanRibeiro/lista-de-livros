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

    static deletarLivro(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }
}


document.addEventListener('DOMContentLoaded', UI.exibirLivros);

document.querySelector('#book-form').addEventListener('submit', (e)=>{
    e.preventDefault();

    const titulo = document.querySelector('#title').value;
    const autor = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    
    const livro = new Livros(titulo, autor, isbn);

    UI.addLivroNaLista(livro);

});


//Evento: remover livro
document.querySelector('#book-list').addEventListener('click', (e)=>{
    e.preventDefault();
    
    UI.deletarLivro(e.target);

    console.log(e.target)
});




