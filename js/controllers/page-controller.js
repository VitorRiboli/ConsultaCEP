import * as modalController from "./modal-controller.js";

export function init(){

  const contactLink = document.querySelector("#contact");

  contactLink.addEventListener("click", handleContactLinkClick);


  console.log("Page controller iniciado")
}

function handleContactLinkClick(e){
  e.preventDefault();

  modalController.showModal();


}

