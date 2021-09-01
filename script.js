const searceField = document.getElementById('input-field')
const displayBooks = document.getElementById('display-books')

// searce books

const searceBook = () => {
    const searceText = searceField.value;
    searceField.value = '';

    if(searceText === '') {
        console.log('empty')
    }
    else{
        fetch(`http://openlibrary.org/search.json?q=${searceText}`)
            .then(res => res.json())
            .then(data => showBooks(data))
    }

}

const showBooks = (books) => {
    console.log(books)
    displayBooks.innerText = '';
    const allBooks = books.docs
    allBooks.forEach(book => {
        console.log(book)
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
        <div class="card h-100">
            <img src= "https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
        </div>
        `
        displayBooks.appendChild(div)

    });
}