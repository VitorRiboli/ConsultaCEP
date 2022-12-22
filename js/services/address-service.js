import * as requestService from './request-service.js'
import Address from '../models/address.js';

export async function findByCep(cep) {
  const url = `https://viacep.com.br/ws/${cep}/json/`;

  const result = await requestService.getJson(url);

  const address = new Address(result.cep, result.logradouro, null, result.localidade);

  return address;
}

//Função de validação de campos
export function getErrors(address) {
  const errors = {}; //Objeto Vazio

  if(!address.cep || address.cep == "") {  //testar CEP
    errors.cep = "Campo Requirido";
  }

  if(!address.number || address.number == "") {  //testar Number
    errors.number = "Campo Requirido";
  }

  return errors;
}