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
    // console.log(books)
    displayBooks.innerText = '';
    const allBooks = books.docs
    allBooks.forEach(book => {
        // console.log(book)
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
        <div class="card h-100">
            <img src= "https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top w-100 h-50" alt="...">
            <div class="card-body">
                <h3 class="card-title"><span class="text-info">Name :</span> ${book.title}</h3>
                <h5><span class="text-info">Author name :</span> ${book.author_name ? book.author_name : 'Not found' }</h5>
                <h5><span class="text-info">First publish year :</span> ${book.first_publish_year ? book.first_publish_year : 'Not found' }</h5>
                <h5><span class="text-info">Publisher :</span> ${book.publisher ? book.publisher : 'Not found' }</h5>
            </div>
        </div>
        `
        displayBooks.appendChild(div)

    });
}