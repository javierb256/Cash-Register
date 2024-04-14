/* 
In the shift cipher letters are shifted by a set amount
In this case shift letters by 13 spaces

Go through the entire string and transform each character by the key
Watch out if the value goes over 26 you need to loop back to the beginning
Do not transform non-alphabetic characters - ( ?!.)

*/

// function rot13(str) {
//   let encryptedStr = "";
//   // Go through the entire string
//   for (let i = 0; i < str.length; i++) {
//     //Only convert letters leave everything as is
//     if (/[A-Z]/.test(str[i]) == true) {
//       //Get the character code for the current letter
//       let charCode = str[i].charCodeAt(0);
//       //Shift the letter by 13
//       // Z is charCode 90 so move cutoff to 91
//       let shifted = (charCode + 13) % 91;
//       //If shifted is < 65 add the value to 65 else keep value as is
//       let newLetter = shifted < 65 ? 65 + shifted : shifted;

//       encryptedStr += String.fromCharCode(newLetter);
//     }
//     //for non alphabetical values
//     else {
//       encryptedStr += str[i];
//     }
//   }
//   return encryptedStr;
// }

//Decode cipher string
function caesarCipher(str, shift) {

  let encryptedStr = "";
  //Go through the entire string
  for (let i = 0; i < str.length; i++) {
      let charCode = str[i].charCodeAt(0);
    //Look for uppercase letters
    if (/[A-Z]/.test(str[i]) == true) {
      //Get the character code for the current letter
      //Shift the letter by 13
      // Z is charCode 90 so move cutoff to 91
      let shifted = (charCode + shift) % 91;
      //If shifted is < 65 add the value to 65 else keep value as is
      let newLetter = shifted < 65 ? 65 + shifted : shifted;

      encryptedStr += String.fromCharCode(newLetter);
    }
    //If letter is lowercase
    else if(/[a-z]/.test(str[i]) == true) {
      //a = 97
      //z = 122
      let shifted = (charCode + shift) % 123;
      let newLetter = shifted < 97 ? 97 + shifted : shifted;
      encryptedStr += String.fromCharCode(newLetter);
    }
    //for non alphabetical values
    else {
      encryptedStr += str[i];
    }
  }
  return encryptedStr;
}

// caesarCipher("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.", 13);
// console.log(caesarCipher("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.", 13))
console.log(caesarCipher("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.", 13))