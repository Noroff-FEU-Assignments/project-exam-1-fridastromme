const carouselUrl = "https://mageknip.no/wp-json/wp/v2/";
const carouselContainer = document.querySelector(".carousel-container");

let length = 1;
let offset = 0;

const buttonPrevious = document.querySelector("#prev");
const buttonNext = document.querySelector("#next");

async function fetchApi(url) {

    try {
        const response = await fetch(url + `posts?per_page=${length}&offset=${offset}&_embed`);
        const carouselData = await response.json();

        console.log(carouselData);

                function showHTML() {

                const imageTitle = carouselData[0].title.rendered;
                const carouselImage = carouselData[0]._embedded["wp:featuredmedia"][0].source_url;
        
                carouselContainer.innerHTML +=
                `<div class="carousel__slider">
                <a href="story.html?id=${carouselData[0].id}" class="carousel__slider">
                <div class="carousel__title">
                <h2 class="carousel__title">${imageTitle}<h2>
                </div>
                <img src="${carouselImage}" alt="${imageTitle}" class="carousel__image"/>
                </a>
                </div>`;

                }

                showHTML();

        if (offset === 0) {
            buttonPrevious.style.display = "none";
        } else {
            buttonPrevious.style.display = "block";
        }
        if ((i++) === (carouselData.length)) {
            buttonNext.style.display = "block";
        } else {
            buttonNext.style.display = "none";
        }


    } catch (error) {
        console.log("Something went wrong when calling the API.");
    }
}

buttonPrevious.addEventListener("click", () => {
    if (offset >= 1) {
        offset -= 1;
    }
    fetchApi(carouselUrl);
});

buttonNext.addEventListener("click", () => {
    offset += 1;
    fetchApi(carouselUrl);
});

fetchApi(carouselUrl);