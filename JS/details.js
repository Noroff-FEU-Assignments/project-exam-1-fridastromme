const storyContainer = document.querySelector(".story");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);

const id = params.get("id");
console.log(id);

const fetchUrl = "https://mageknip.no/wp-json/wp/v2/posts?_embed/" + id;

async function fetchStory() {

    try {

        const response = await fetch(fetchUrl);
        const details = await response.json();

        console.log(details);

        storyContainer.innerHTML =
            `<img src="${details.images[0].src}" alt="${details.name}"/ class="details-image">
            <div class="details-text">
            <h1 class="details-title">${details.name}</h1>
            <h2 class="details-name">${details.short_description}</h2>
            <p class="details-description">${details.description}</p>
            <h3 class="details-price">Price: $${details.prices.price}
            </div>`;

    } catch (error) {
        console.log("Something went wrong when calling the API.")
        storyContainer.innerHTML = `<h1>The story you're looking for doesn't exist.</h1>`;
    }
}

fetchStory();