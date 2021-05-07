const carousel = document.querySelector (".carousel");
const slider = document.querySelector(".carousel__slide");
const carouselUrl = "https://mageknip.no/wp-json/wp/v2/posts?_embed";
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

const carouselContainer = document.querySelector(".carousel__slide-container");

async function getCarousel() {

    try {
        const response = await fetch(carouselUrl);
        const image = await response.json();
        console.log(image);

        carouselContainer.innerHTML = "";

        for (let i = 0; i < image.length; i++) {
            const imageTitle = image[i].title.rendered;
            const carouselImage = image[i]._embedded["wp:featuredmedia"][0].source_url;

            if (i == 1) {
            break;
            }

            let allImages = Array.from(image);

            function nextImage() {

                i = i + 1;
                i = i % allImages.length;
                return allImages[i]
            }

            function prevImage() {
                if (i === 0) {
                    i = allImages.length;
                }
                i = i - 1;
                return allImages[i];
            }

            prev.addEventListener("click", function (event) {
                allImages = nextImage();
            })

            next.addEventListener("click", function (event) {
                allImages = prevImage();
            })


            carouselContainer.innerHTML +=
                `<div href="story.html?id=${image[i].id}" class="carousel__slide-list">
                <div class="carousel__title"><h2 class="carousel__title">${imageTitle}<h2></div>
                <img src="${carouselImage}" alt="${imageTitle}" class="carousel__image"/>
                </div>`;
        }

    } catch (error) {
        console.log("Something went wrong when calling the API.")
        carouselContainer.innerHTML = `<h2 class="details-name">Sorry, something went wrong. Please try again later.</h2>`;
    }
}

getCarousel()