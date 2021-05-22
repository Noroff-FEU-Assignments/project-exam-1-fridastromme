const teamUrl = 'https://mageknip.no/wp-json/wc/store/products?category=20';

const teamContainer = document.querySelector ('.team');

async function getTeam () {
  try {
    const response = await fetch (teamUrl);
    const data = await response.json ();
    console.log (data);

    teamContainer.innerHTML = '';

    for (let i = 0; i < data.length; i++) {
      const nameContainer = data[i].name;

      const imageContainer = data[i].images[0].src;

      if (
        window.location.pathname === '/viewer-profile.html' ||
        (window.location.pathname === '/producer-profile.html' && i === 3)
      ) {
        break;
      }

      teamContainer.innerHTML += `<div class="team__card">
                <img src="${imageContainer}" alt="${nameContainer}" class="team__image"/>
			    <h3 class="name">${nameContainer}</h3>
                </div>
		        </div>`;
    }
  } catch (error) {
    console.log ('Something went wrong when calling the API.');
    teamContainer.innerHTML = `<h1 class="details-name">Can't load team members. Please try again later.</h1>`;
  }
}

getTeam ();
