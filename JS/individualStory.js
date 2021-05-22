const storyContainer = document.querySelector ('.story');
const storyImage = document.querySelector ('.story__image');
const queryString = document.location.search;
const params = new URLSearchParams (queryString);
const headTitle = document.getElementsByTagName ('title')[0];
const metaDescription = document.getElementsByTagName ('meta');

const id = params.get ('id');
console.log (id);

if (id === null) {
  location.href = '/';
}

const url = 'https://mageknip.no/wp-json/wp/v2/posts/' + id + '?_embed';

async function fetchStory () {
  try {
    const response = await fetch (url);
    const details = await response.json ();

    console.log (details);

    const featuredImage =
      details._embedded['wp:featuredmedia'][0].media_details.sizes.full
        .source_url;
    const title = details.title.rendered;
    const storyContent = details.content.rendered;
    const excerpt = details.excerpt.rendered;

    metaDescription.description.content = `${excerpt}`;

    headTitle.innerHTML = 'ByWay | ' + `${title}`;

    storyImage.innerHTML = `<img src="${featuredImage}" alt="${title}"/>`;

    storyContainer.innerHTML = `<div class="story__content">
                <h1 class="story__title">${details.title.rendered}</h1>
                <p>${storyContent}</p>
            </div>`;
  } catch (error) {
    console.log ('Something went wrong when calling the API.');
    storyContainer.innerHTML = `<h2 class="details-name">Sorry, we can't find the story. Please try again later.</h2>`;
  }
}

fetchStory ();
