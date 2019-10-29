function checkPhone(phone){

  if(!(/^1\d{10}$/.test(phone))){
    return false;
  }
  return true
}
export default {
  checkPhone
}