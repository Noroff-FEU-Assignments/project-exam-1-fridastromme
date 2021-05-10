// Get stories from Wordpress:
const postUrl = "https://mageknip.no/wp-json/wp/v2/";

const postContainer = document.querySelector(".post");

let length = 10;
let offset = 0;

const goBack = document.querySelector(".go-back");
const loadMore = document.querySelector(".load-more");

async function getPosts() {

    try {


        const response = await fetch(postUrl + `posts?per_page=${length}&offset=${offset}&_embed`);
        const data = await response.json();
        console.log(data);

        postContainer.innerHTML = "";

        for (let i = 0; i < data.length; i++) {
            const titleContainer = data[i].title.rendered;
            const imageContainer = data[i]._embedded["wp:featuredmedia"][0].source_url;

            postContainer.innerHTML +=
                `<a href="story.html?id=${data[i].id}">
                <div class="post__card">
                <img src="${imageContainer}" alt="${titleContainer}" class="featured__image"/>
			    <h2 class="title">${titleContainer}</h2>
                </div>
		        </div>
                </a>`;
        }

        if (offset === 0) {
            goBack.style.display = "none";
        } else {
            goBack.style.display = "block";
        }
        if (data.length < 1) {
            loadMore.style.display = "none";
        } else {
            loadMore.style.display = "block";
        }
        
        goBack.addEventListener("click", () => {
            if (offset >= 10) {
                offset -= 10;
            }
            getPosts(postUrl);
        });
        
        loadMore.addEventListener("click", () => {
            offset += 10;
            getPosts(postUrl);
        });

    } catch (error) {
        console.log("Something went wrong when calling the API.")
        postContainer.innerHTML = `<h2 class="details-name">Sorry, something went wrong. Please try again later.</h2>`;
    }
}

getPosts()