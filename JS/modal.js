const modal = document.querySelector(".modal");
const modalImage = document.querySelector(".modal__image");
const content = document.querySelector(".content");
const close = document.getElementsByClassName("close")[0];


async function openModal() {

        const response = await fetch(url);
        const details = await response.json();

        console.log(details);

        const featuredImage = details._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
        const title = details.title.rendered;



storyImage.onclick = function(){
    modal.style.display = "inline-block";
    modalImage.src = featuredImage;
    modalImage.alt = title;

}


close.onclick = function() {
    modal.style.display = "none";
  }
}


openModal();

function closeModal(event) {
    if (event.target == storyImage) {
        modal.style.display = "none";
    }
}

content.addEventListener("click", closeModal);
