const postUrl = 'https://mageknip.no/wp-json/wp/v2/';

const postContainer = document.querySelector ('.post');
const loadMore = document.querySelector ('.loadmore');

let perPage = 9;

async function getPosts () {
  try {
    const response = await fetch (postUrl + `posts?per_page=${perPage}&_embed`);
    const data = await response.json ();
    console.log (data);

    postContainer.innerHTML = '';

    for (let i = 0; i < data.length; i++) {
      const titleContainer = data[i].title.rendered;
      const imageContainer =
        data[i]._embedded['wp:featuredmedia'][0].source_url;

      postContainer.innerHTML += `<a href="story.html?id=${data[i].id}">
                <div class="post__card">
                <img src="${imageContainer}" alt="${titleContainer}" class="featured__image"/>
			    <h2 class="title">${titleContainer}</h2>
                </div>
		        </div>
                </a>`;
    }

    loadMore.addEventListener ('click', function () {
      perPage += 9;
      getPosts (postUrl);
    });
  } catch (error) {
    console.log ('Something went wrong when calling the API.');
    postContainer.innerHTML = `<h2 class="details-name">Sorry, we can't find the blog posts at the moment. Please try again later.</h2>`;
  }
}

getPosts ();
