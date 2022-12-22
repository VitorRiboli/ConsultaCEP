//Responsável por controlar o formulário
//Camada Controller é responsável por controlar as interações com o usuário
//Na camada Service tem os serviços, como o serviço de requisição

import Address from '../models/address.js';
import * as addressService from '../services/address-service.js';
import * as listController from './list-controller.js';

function State() {

  this.address = new Address();

  this.btnSave = null;
  this.btnClear = null;

  this.inputCep = null;
  this.inputStreet = null;
  this.inputNumber = null;
  this.inputCity = null;

  this.errorCep = null;
  this.errorNumber = null;
}

const state = new State();

export function init() {

  state.inputCep = document.forms.newAddress.cep;
  state.inputStreet = document.forms.newAddress.street;
  state.inputNumber = document.forms.newAddress.number;
  state.inputCity = document.forms.newAddress.city;

  state.btnSave = document.forms.newAddress.btnSave;
  state.btnClear = document.forms.newAddress.btnClear;

  state.errorCep = document.querySelector('[data-error="cep"]');
  state.errorNumber = document.querySelector('[data-error="number"]');

  state.inputNumber.addEventListener('change', handleInputNumberChange);
  state.inputNumber.addEventListener('keyup', handleInputNumberKeyUp);
  state.inputCep.addEventListener('change', handleInputCepChange);
  state.btnClear.addEventListener('click', handleBtnClearClick);
  state.btnSave.addEventListener('click', handleBtnSaveClick);

}

//Função para capturar o CEP
async function handleInputCepChange(e) {
  const cep = e.target.value;

  try {
    const address = await addressService.findByCep(cep);
    state.inputCity.value = address.city;
    state.inputStreet.value = address.street;
    state.address = address;

    setFormError("cep", "");
    state.inputNumber.focus();
  }
  catch (e) {
    state.inputCity.value = "";
    state.inputStreet.value = "";
    state.inputNumber.value = "";
    setFormError("cep", "Informe um CEP válido")
  }
}

//Função para capturar o valor do Input do Numero
function handleInputNumberKeyUp(e) {
  state.address.number = e.target.value;
}


//Função para salvar e fazer requisição 
async function handleBtnSaveClick(e) {
  e.preventDefault();

  const errors = addressService.getErrors(state.address); //Instanciar Função para verificar erros
  const keys = Object.keys(errors); //Array com os campos que tem erros

  if(keys.length > 0) {
    //Função de alta ordem
    keys.forEach(key => {
      setFormError(key, errors[key]);
    })

    /* //Outra maneira de percorrer
    for(let i = 0; i < keys.length; i++) {
      setFormError(keys[i], errors[keys[i]]);
    }*/
  }
  else {
    listController.addCard(state.address);
    clearForm();
  }
}

//Função para tratar a mudança do campo Number
function handleInputNumberChange(e) {
  if (e.target.value == "") {
    setFormError("number", "Campo requerido!")
  } else {
    setFormError("number", "")
  }
}

//Função para limpar formulário
function handleBtnClearClick(e) {
  e.preventDefault();
  clearForm();
}

//Função auxiliar para limpar formulário, será chamada em outra função
function clearForm() {
  state.inputCep.value = "";
  state.inputStreet.value = "";
  state.inputNumber.value = "";
  state.inputCity.value = "";

  setFormError("cep", "");
  setFormError("number", "");

  state.address = new Address(); //Criar novo objeto vazio

  state.inputCep.focus();
}

//Fução para escrever mensagem de erro
function setFormError(key, value) {
  const element = document.querySelector(`[data-error="${key}"]`);
  element.innerHTML = value;
}

