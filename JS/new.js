const carouselUrl = "https://mageknip.no/wp-json/wp/v2/";
const carouselContainer = document.querySelector(".carousel-container");

let length = 1;
let offset = 0;

const buttonPrevious = document.querySelector("#prev");
const buttonNext = document.querySelector("#next");

async function fetchApi(url) {
    try {


        const data = await fetch(
            url + `posts?per_page=${length}&offset=${offset}&_embed`
        );
        const json = await data.json();

        console.log(json);

                function showHTML() {

                const imageTitle = json[0].title.rendered;
                const carouselImage = json[0]._embedded["wp:featuredmedia"][0].source_url;
        
                carouselContainer.innerHTML +=
                `<div href="story.html?id=${json[0].id}" class="carousel__slider">
                <div class="carousel__title">
                <h2 class="carousel__title">${imageTitle}<h2>
                </div>
                <img src="${carouselImage}" alt="${imageTitle}" class="carousel__image"/>
                </div>`;

                }

                showHTML();


        // Validate Buttons visibility
        if (offset === 0) {
            buttonPrevious.style.display = "none";
        } else {
            buttonPrevious.style.display = "block";
        }
        if (json.length < 1) {
            buttonNext.style.display = "none";
        } else {
            buttonNext.style.display = "block";
        }


    } catch (error) {
        carouselContainer.innerHTML +=
        `<h1>No stories found</h1>`
        console.log("We couldn't load stories.");
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