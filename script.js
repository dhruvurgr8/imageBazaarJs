const container = document.querySelector(".container");
const input = document.querySelector(".search_input");
const searchBtn = document.querySelector(".search_btn");
let pagination = false;
let imageData = [];
let pageNumber = 1;
let searchQuery = "toys";
fetchData();
async function fetchData() {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=${pageNumber}&query=${searchQuery}&client_id=vcvJ9rWOI4mI4QJQ_kMAaD6hOccNZ720NSyf8SGqfas`
    );
    const data = await response.json();
    imageData = data.results;
    console.log(imageData);
    renderImages();
  } catch (error) {
    console.error(error);
  }
}

console.log(imageData);
// showing data
function renderImages() {
  if (pagination == false) {
    container.innerHTML = "";
  }

  imageData.forEach((image) => {
    const card = document.createElement("card");
    card.classList.add("card", "custom_card");
    card.innerHTML = `
           
          <img class="card-img-top image" src=${
            image.urls.regular
          } alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${image.alt_description.slice(0, 30)}</h5>
    
            <a href=${
              image.urls.regular
            } class="btn btn-outline-success" download="image.jpg">View Image</a>
          </div>
        
            `;
    container.appendChild(card);
  });
}

// Pagination
// const pageBtn = document.querySelector(".page");
// pageBtn.addEventListener("click", () => {
//   pagination = true;
//   pageNumber++;
//   fetchData();
// });

// Pagination Function
function isBottomOfPage() {
  return window.innerHeight + window.scrollY >= document.body.offsetHeight - 1;
}

window.addEventListener("scroll", () => {
  if (isBottomOfPage()) {
    pagination = true;
    pageNumber++;
    fetchData();
  }
});

//Search Functionality
searchBtn.addEventListener("click", () => {
  pagination = false;
  pageNumber = 1;
  searchQuery = input.value;
  fetchData();
});
