class Livros {
    constructor(titulo, autor, isbn) {
        this.titulo = titulo;
        this.autor = autor;
        this.isbn = isbn;
    }
}

class UI {
    static exibirLivros() {
        const livros = Store.getLivros();

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
        let livros;
        if(localStorage.getItem('livros') === null) {
            livros = [];
        } else {
            livros = JSON.parse(localStorage.getItem('livros'));
        }
        return livros;
    }
    
    static addLivro(livro) {
        const livros = Store.getLivros();
        livros.push(livro);

        localStorage.setItem('livros', JSON.stringify(livros));
    }

    static removeLivro(isbn){
        const livros = Store.getLivros();

        livros.forEach((livro, index)=>{
            if(livro.isbn === isbn) {
                livros.splice(index,1);
            }
        });

        localStorage.setItem('livros', JSON.stringify(livros));
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

        //adiciona livro no localStorage
        Store.addLivro(livro);

        //exibe a mensahem de sucesso
        UI.showAlert('Livro adicionado com sucesso!','success');
        //limpando campos
        UI.clearFields();
    }
});


//Evento: remover livro
document.querySelector('#book-list').addEventListener('click', (e)=>{
    e.preventDefault();
    //remove o livro de UI
    UI.deletarLivro(e.target);

    //remove o livro do localStorage
    Store.removeLivro(e.target.parentElement.previousElementSibling.textContent);

      //exibe a mensahem de sucesso
      UI.showAlert('Livro removido com sucesso!','success');
    console.log(e.target)
});




