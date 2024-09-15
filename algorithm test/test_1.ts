const word = "NEGIE1";

const reverser = (word: string): string => {
  let reversedWord = "";
  let number = "";
  for (let index = word.length - 1; index >= 0; index--) {
    const aplh = word[index];
    if (isNaN(parseFloat(aplh))) {
      reversedWord += aplh;
    } else {
      number += aplh;
    }
  }
  return reversedWord + number;
};

console.log(reverser(word));
