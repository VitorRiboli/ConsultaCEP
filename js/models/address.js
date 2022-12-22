//Modulo para especificar o tipo
//Função construtora para especificar o tipo de Address

export default function Address(cep, street, number, city) {
  this.cep = cep;
  this.street = street;
  this.number = number;
  this.city = city;
}