const sentence = "Saya sangat senang mengerjakan soal algoritma";

const longestWordFinder = (sentence: string): string => {
  const words = sentence.split(" ");
  const sortedWords = words.sort((a, b) => b.length - a.length);
  return sortedWords[0];
};

const longestword = longestWordFinder(sentence);
console.log(`${longestword} : ${longestword.length} character`);
