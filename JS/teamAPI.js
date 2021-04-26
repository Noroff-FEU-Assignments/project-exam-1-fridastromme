const teamUrl = "https://mageknip.no/wp-json/wc/store/products?category=20";

const teamContainer = document.querySelector(".team");

async function getTeam() {

    try {
        const response = await fetch(teamUrl);
        const data = await response.json();
        console.log(data);

        teamContainer.innerHTML = "";

        for (let i = 0; i < data.length; i++) {
            const nameContainer = data[i].name;

            const imageContainer = data[i].images[0].src;

            if ((window.location.pathname === '/viewer-profile.html') || (window.location.pathname === '/producer-profile.html')  && (i === 3)) {
                break;
            }

            teamContainer.innerHTML +=
                `<a href="purchase-movie.html?id=${data[i].id}">
                <div class="team-card">
                <img src="${imageContainer}" alt="${nameContainer}" class="team-image"/>
			    <h3 class="name">${nameContainer}</h3>
                </div>
		        </div>
                </a>`;
        }

    } catch (error) {
        console.log("Something went wrong when calling the API.")
        teamContainer.innerHTML = `<h1 class="details-name">Can't load titles. Please try again later.</h1>`;
    }
}

getTeam()
