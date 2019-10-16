module.exports = function check(str, bracketsConfig) {
  var openingBrackets = [];
  var closingBrackets = [];
  var sameBrackets = [];

  for (var i = 0; i < bracketsConfig.length; i++) {
    if (bracketsConfig[i][0] === bracketsConfig[i][1]) {
      sameBrackets.push(bracketsConfig[i][0]);
    }
    else {
      openingBrackets.push(bracketsConfig[i][0]);
      closingBrackets.push(bracketsConfig[i][1]);
    }
  }

  for (var i = 0; i < sameBrackets.length; i++) {
    var tempStr = str; // new str without same brackets which are situated near each other
    do {
      tempStr = str;
      str = str.replace(sameBrackets[i] + sameBrackets[i], '');
    } while(str !== tempStr);
    
  }

  var stack = [];
  var addedSameBrackets = []; //for keeping under control that the next same bracket is a closing bracket
  for (var index = 0; index < str.length; index++) {
    if (sameBrackets.includes(str[index])) {
      if(!addedSameBrackets.includes(str[index])) { // if bracket isn't added, add it
      stack.push(str[index]);
      addedSameBrackets.push(str[index]);
      }
      else{
        if (str[index] === stack[stack.length-1]) { // bracket at the top of the stack ?= the next bracket
          stack.pop();
          addedSameBrackets.pop();
        } 
        else {
          stack.push(str[index]); // if there is no the same bracket at the top of stack, this is opening bracket
          addedSameBrackets.push(str[index]);
        }
      }
    }
    else {
    if (openingBrackets.includes(str[index])){ // if it's opening bracket, we'll push it in the stack
      stack.push(str[index]);
     }
    else if (closingBrackets.includes(str[index])){ // if we meet closing bracket and there is an opening bracket the same type at the top of the stack
      if (openingBrackets[closingBrackets.indexOf(str[index])] === stack.pop()) { // pop means !remove! and return the last element from the array and return it
      } 
      else {
        return false;
      }
    }
    else {
      return false;
      }
    }
  }

  if(stack.length !== 0){
    return false;
  }
  
  return true;
}