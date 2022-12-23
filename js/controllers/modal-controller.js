function State() {
  this.container = null;
  this.btnClose = null;
}

const state = new State();


export function init(){
  state.container = document.querySelector("#modal-contact");
  state.btnClose = document.getElementById("modal-contact-close");

  state.btnClose.addEventListener('click', handleBtnCloseClick);
  state.container.addEventListener("click", handleContainerClick);
}

export function showModal() {
  state.container.classList.add("active");
}

export function closeModal() {
  state.container.classList.remove("active");
}


function handleBtnCloseClick(e) {
  e.preventDefault();
  closeModal();
}

function handleContainerClick(e) {
  e.preventDefault();
  if(this == e.target) {
    closeModal();
  }
}
