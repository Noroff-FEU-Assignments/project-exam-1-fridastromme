const storyContainer = document.querySelector(".story");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);

const id = params.get("id");
console.log(id);

if (id === null) {
    location.href = "/";
}

const url = "https://mageknip.no/wp-json/wp/v2/posts/" + id + "?_embed";

async function fetchStory() {

    try {

        const response = await fetch(url);
        const details = await response.json();

        console.log(details);

        const featuredImage = details._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
        const storyContent = details.content.rendered.match(/\<p>.*?<\/p>|https.*?\.jpg/g);
    
            storyContainer.innerHTML =
                `<div class="story-content">
                <img src="${featuredImage}" alt="${details.title}" class="story__image"/>
                <h1 class="story__title">${details.title.rendered}</h1>
                <h2>${details.modified}</h2>
                <p>${storyContent}</p>
                </div>`;

    } catch (error) {
        console.log("Something went wrong when calling the API.");
    }

}

fetchStory();