const modal = document.querySelector(".modal");
const modalImg = document.querySelector(".modal__image");
const content = document.querySelector(".content");
const close = document.getElementsByClassName("close")[0];


async function openModal() {

        const response = await fetch(url);
        const details = await response.json();

        console.log(details);

        const featuredImage = details._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;


storyImage.onclick = function(){
    modal.style.display = "inline-block";
    modalImg.src = featuredImage;

}

close.onclick = function() {
    modal.style.display = "none";
  }


content.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

openModal();