// Get stories from Wordpress:
const postUrl = "https://mageknip.no/wp-json/wp/v2/posts?per_page=100&_embed";

const postContainer = document.querySelector(".post");
const loadMore = document.querySelector(".load-more");

async function getPosts() {

    try {
        const response = await fetch(postUrl);
        const data = await response.json();
        console.log(data);

        postContainer.innerHTML = "";

        for (let i = 0; i < data.length; i++) {
            const titleContainer = data[i].title.rendered;
            const imageContainer = data[i]._embedded["wp:featuredmedia"][0].source_url;
            
            //if (i === 9) {
            //  break;
            //}

            postContainer.innerHTML +=
                `<a href="story.html?id=${data[i].id}">
                <div class="post__card">
                <img src="${imageContainer}" alt="${titleContainer}" class="featured__image"/>
			    <h2 class="title">${titleContainer}</h2>
                </div>
		        </div>
                </a>`;
        }

    } catch (error) {
        console.log("Something went wrong when calling the API.")
        postContainer.innerHTML = `<h2 class="details-name">Sorry, something went wrong. Please try again later.</h2>`;
    }
}

getPosts()