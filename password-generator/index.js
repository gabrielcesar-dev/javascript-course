const lenght = 12;
const includeLowerCase = true;
const includeUpperCase = true;
const includeNumber = true;
const includeSymbol = true;

console.log(generator(lenght, includeLowerCase, includeUpperCase, includeNumber, includeSymbol));

function generator (length, includeLowerCase, includeUpperCase, includeNumber, includeSymbol){
    if (length < 1) {
        return "Password length must be at least one ";
    }

    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()';
    
    let password = '';
    const allChars = [];
    if (includeLowerCase) allChars.push(lowercase);
    if (includeUpperCase) allChars.push(uppercase);
    if (includeNumber) allChars.push(numbers);
    if (includeSymbol) allChars.push(symbols);

    if(allChars.length === 0) return "at least one set of character need to be selected";
    
    while (password.length < length) {
      const charSet = allChars[Math.floor(Math.random() * allChars.length)];
      password += charSet[Math.floor(Math.random() * charSet.length)];
    }

    return password;
} 
