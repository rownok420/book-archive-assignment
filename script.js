const searceField = document.getElementById('input-field');
const displayBooks = document.getElementById('display-books');
const spinner = document.getElementById('spinner');
spinner.style.display = 'none';
const foundResult = document.getElementById('found-result');
const errorMessage1 = document.getElementById('error1');
const errorMessage2 = document.getElementById('error2');

// searce books

const searceBook = () => {
    const searceText = searceField.value;
    searceField.value = '';

    if(searceText === '') {
        // error handle 1 
        errorMessage1.style.display = 'block';
        // clear display
        displayBooks.innerText = '';
        foundResult.style.display = 'none';
        errorMessage2.style.display = 'none';

    }
    else{
        // add spinner
        spinner.style.display = 'block';
        // clear display
        displayBooks.innerText = '';
        foundResult.style.display = 'none';
        errorMessage1.style.display = 'none';
        errorMessage2.style.display = 'none';

        // fetch data
        fetch(`https://openlibrary.org/search.json?q=${searceText}`)
            .then(res => res.json())
            .then(data => showBooks(data))
    }

}

const showBooks = (books) => {
    // found result 
    foundResult.style.display = 'none';
    foundResult.innerHTML = `
    <h2 class="text-center fw-bold text-info"> Showing <span class="fst-italic text-success">${books.docs.length}</span> of <span class="fst-italic text-success">${books.numFound}</span> found items </h2> 
    `
    // error handle 2
    if(books.docs.length === 0){
        errorMessage2.style.display = 'block';
    }else if(books.docs.length > 0){
        foundResult.style.display = 'block';
        errorMessage2.style.display = 'none';
    }
  
    // spinner
    spinner.style.display = 'none';

    displayBooks.innerText = '';
    const allBooks = books.docs;
    allBooks.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src= "https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top w-100 mb-5" style="height: 250px; object-fit: cover;">
            <div class="card-body">
                <h3 class="card-title"><span class="text-info">Name :</span> ${book.title ? book.title : 'Not found'}</h3>
                 <h5><span class="text-info">Author name :</span> ${book.author_name ? book.author_name[0] : 'Not found' }</h5>
                <h5><span class="text-info">Publisher :</span> ${book.publisher ? book.publisher[0] : 'Not found' }</h5>
                <h5><span class="text-info">First publish in :</span> ${book.first_publish_year ? book.first_publish_year : 'Not found' }</h5>
            </div>
        </div>
        `
        displayBooks.appendChild(div);

    });
}