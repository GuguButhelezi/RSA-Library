let books;

async function renderBooks(filter) {
  const booksWrapper = document.querySelector(".books");

  booksWrapper.classList+= ' books__loading'

  if(!books){
    books = await getBooks();
  }

  booksWrapper.classList.remove('books__loading') 

  if (filter === "Low_to_high") {
    books.sort((a, b) => (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice));
  } else if (filter === "High_to_low") {
    books.sort((a, b) => (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice));
  } else if (filter === "Rating") {
    books.sort((a, b) => b.rating - a.rating);
  }

  const booksHtml = books
    .map((book) => {
      return `<div class="book">
    <figure class="book__img--wrapper">
      <img class="book__img" src="${book.url}" alt="">
    </figure>
    <div class="book__title">
      ${book.title}
    </div>
    <div class="book__ratings">
      ${ratingsHTML(book.rating)}
    </div>
    <div class="book__price">
      ${priceHTML(book.originalPrice, book.salePrice)}
    </div>
  </div>
</div>`;
    })
    .join("");

  booksWrapper.innerHTML = booksHtml;
  
}

function priceHTML(originalPrice, salePrice){
  if(!salePrice){
    return `R${(originalPrice.toFixed(2))}`
  }
  else{
        return `<label class="book__price--normal">R${originalPrice.toFixed(2)}</label> R${salePrice.toFixed(2)}`
  }
}

function ratingsHTML(rating) {
  let ratingHTML = "";

  for (let i = 0; i < Math.floor(rating); i++) {
    ratingHTML += '<i class="fas fa-star"></i>\n';
  }
  if (!Number.isInteger(rating)) {
    ratingHTML += '<i class="fas fa-star-half-alt"></i>\n';
  }
  console.log(rating);
  return ratingHTML;
}

function filerBooks(event) {
  renderBooks(event.target.value);
}

setTimeout(() => {
  renderBooks();
});

// FAKE DATA
function getBooks() {
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve([
        {
          id: 1,
          title: "Crack the Coding Interview",
          url: "https://github.com/GuguButhelezi/Week-4.0/blob/main/crack%20the%20coding%20interview.png?raw=true",
          originalPrice: 750,
          salePrice: 150,
          rating: 4.5,
        },
        {
          id: 2,
          title: "Atomic Habits",
          url: "https://github.com/GuguButhelezi/Week-4.0/blob/main/atomic%20habits.jpg?raw=true",
          originalPrice: 590,
          salePrice: null,
          rating: 5,
        },
        {
          id: 3,
          title: "Deep Work",
          url: "https://github.com/GuguButhelezi/Week-4.0/blob/main/deep%20work.jpeg?raw=true",
          originalPrice: 440,
          salePrice: 180,
          rating: 5,
        },
        {
          id: 4,
          title: "The 10X Rule",
          url: "https://github.com/GuguButhelezi/Week-4.0/blob/main/book-1.jpeg?raw=true",
          originalPrice: 660,
          salePrice: 290,
          rating: 4.5,
        },
        {
          id: 5,
          title: "Be Obsessed Or Be Average",
          url: "https://github.com/GuguButhelezi/Week-4.0/blob/main/book-2.jpeg?raw=true",
          originalPrice: 480,
          salePrice: 250,
          rating: 2.5,
        },
        {
          id: 6,
          title: "Rich Dad Poor Dad",
          url: "https://github.com/GuguButhelezi/Week-4.0/blob/main/book-3.jpeg?raw=true",
          originalPrice: 1050,
          salePrice: 190,
          rating: 5,
        },
        {
          id: 7,
          title: "Cashflow Quadrant",
          url: "https://github.com/GuguButhelezi/Week-4.0/blob/main/book-4.jpeg?raw=true",
          originalPrice: 165,
          salePrice: 150,
          rating: 4,
        },
        {
          id: 8,
          title: "48 Laws of Power",
          url: "https://github.com/GuguButhelezi/Week-4.0/blob/main/book-5.jpeg?raw=true",
          originalPrice: 570,
          salePrice: 270,
          rating: 4.5,
        },
        {
          id: 9,
          title: "The 5 Second Rule",
          url: "https://github.com/GuguButhelezi/Week-4.0/blob/main/book-6.jpeg?raw=true",
          originalPrice: 530,
          salePrice: null,
          rating: 4,
        },
        {
          id: 10,
          title: "Your Next Five Moves",
          url: "https://github.com/GuguButhelezi/Week-4.0/blob/main/book-7.jpg?raw=true",
          originalPrice: 600,
          salePrice: null,
          rating: 4,
        },
        {
          id: 11,
          title: "Mastery",
          url: "https://github.com/GuguButhelezi/Week-4.0/blob/main/book-8.jpeg?raw=true",
          originalPrice: 450,
          salePrice: null,
          rating: 4.5,
        },
      ])
    }, 1000)
  })
  
}
