const INPUT = ["xc", "dz", "bbb", "dz"];
const QUERY = ["bbb", "ac", "dz"];

const hashMap: { [key: string]: number } = {};

for (const inp of INPUT) {
  if (!hashMap[inp]) {
    hashMap[inp] = 1;
    continue;
  }
  hashMap[inp] += 1;
}

console.log(
  QUERY.map((el) => {
    return hashMap[el] ?? 0;
  })
);
