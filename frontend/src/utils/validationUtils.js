// frontend/src/utils/validationUtils.js

export function validatePhoneNumber(phone) {
    const phoneRegex = /^(?:\+?\d{13}|\d{10})$/;
    return phoneRegex.test(phone);
  }
  
  export function validateIMEI(imei) {
    const imeiRegex = /^\d{15}$/;
    return imeiRegex.test(imei);
  }
  
  export function validatePrice(price) {
    return !isNaN(price) && Number(price) >= 0;
  }
  
  export function validateDeposit(deposit, price) {
    return validatePrice(deposit) && Number(deposit) <= Number(price);
  }
  
  export function validateName(name) {
    const nameRegex = /^[A-Za-z]+$/;
    return nameRegex.test(name);
  }
  
  export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  export function validateVAT(vat) {
    const vatRegex = /^\d{11}$/;
    return vatRegex.test(vat);
  }
  
  export function validateUniqueCode(code) {
    const codeRegex = /^[A-Za-z]{6}$/;
    return codeRegex.test(code);
  }
  
  export function validateProvince(province) {
    const provinceRegex = /^[A-Za-z]{2}$/;
    return provinceRegex.test(province);
  }
  
  export function validatePassword(password) {
    return password.length >= 8;
  }
  