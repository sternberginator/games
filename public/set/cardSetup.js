const cards = ["red", "green", "purple"].map(val => {
  return [
    { color: val, shape: "oval" },
    { color: val, shape: "diamond" },
    { color: val, shape: "squiggle" },
  ];
}).reduce((res, elt) => res.concat(elt)).map(val => {
  return [
    Object.assign({ fill: "solid" }, val),
    Object.assign({ fill: "shaded" }, val),
    Object.assign({ fill: "none" }, val),
  ];
}).reduce((res, elt) => res.concat(elt)).map(val => {
  return [
    Object.assign({ num: [5] }, val),
    Object.assign({ num: [3, 7] }, val),
    Object.assign({ num: [2, 5, 8] }, val),
  ];
}).reduce((res, elt) => res.concat(elt));

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

const pickCards = (numCards) => {
  const chosen = new Set();
  while (chosen.size < numCards) {
    chosen.add(getRandomInt(cards.length));
  }
  return Array.from(chosen.keys()).map(i => cards[i]);
};

const validate = (col1, col2, col3) => {
  if (col1 === col2) return col2 === col3;
  return col1 !== col3 && col2 !== col3;
};

const verifySet = (c1, c2, c3) => {
  return validate(c1.color, c2.color, c3.color) && validate(c1.shape, c2.shape, c3.shape)
    && validate(c1.fill, c2.fill, c3.fill) && validate(c1.num.length, c2.num.length, c3.num.length);
};
