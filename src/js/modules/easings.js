/* EASINGS */
const easings = {
  linear(x) {
    return x;
  },
  sineIn(x) {
    return 1 - Math.cos((x * Math.PI) / 2);
  },
  sineOut(x) {
    return Math.sin((x * Math.PI) / 2);
  },
  sineInOut(x) {
    return -(Math.cos(Math.PI * x) - 1) / 2;
  },
  quadIn(x) {
    return x * x;
  },
  quadOut(x) {
    return 1 - (1 - x) * (1 - x);
  },
  quadInOut(x) {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
  },
  cubicIn(x) {
    return x * x * x;
  },
  cubicOut(x) {
    return 1 - Math.pow(1 - x, 3);
  },
  cubicInOut(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  },
  quartIn(x) {
    return x * x * x * x;
  },
  quartOut(x) {
    return 1 - Math.pow(1 - x, 4);
  },
  quartInOut(x) {
    return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
  },
  quintIn(x) {
    return x * x * x * x * x;
  },
  quintOut(x) {
    return 1 - Math.pow(1 - x, 5);
  },
  quintInOut(x) {
    return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
  },
  expoIn(x) {
    return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
  },
  expoOut(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  },
  expoInOut(x) {
    return x === 0
      ? 0
      : x === 1
      ? 1
      : x < 0.5
      ? Math.pow(2, 20 * x - 10) / 2
      : (2 - Math.pow(2, -20 * x + 10)) / 2;
  },
  circIn(x) {
    return 1 - Math.sqrt(1 - Math.pow(x, 2));
  },
  circOut(x) {
    return Math.sqrt(1 - Math.pow(x - 1, 2));
  },
  circInOut(x) {
    return x < 0.5
      ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
      : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
  },
  backIn(x) {
    return x * x * ((1.70158 + 1) * x - 1.70158);
  },
  backOut(x) {
    return 1 - --x * x * ((1.70158 + 1) * x + 1.70158);
  },
  backInOut(x) {
    return x < 0.5
      ? (x * x * ((7.189819 + 1) * 2 * x - 7.189819)) / 2
      : (1 - --x * x * ((7.189819 + 1) * 2 * x + 7.189819)) / 2;
  },
  elasticIn(x) {
    return x === 0
      ? 0
      : x === 1
      ? 1
      : -Math.pow(2, 10 * x - 10) *
        Math.sin(((x * 10 - 10.75) * (2 * Math.PI)) / 3.5);
  },
  elasticOut(x) {
    return x === 0
      ? 0
      : x === 1
      ? 1
      : Math.pow(2, -10 * x) *
          Math.sin(((x * 10 - 0.75) * (2 * Math.PI)) / 3.5) +
        1;
  },
  elasticInOut(x) {
    return x === 0
      ? 0
      : x === 1
      ? 1
      : x < 0.5
      ? -(
          Math.pow(2, 20 * x - 10) *
          Math.sin(((20 * x - 11.125) * (Math.PI * 2)) / 4.5)
        ) / 2
      : (Math.pow(2, -20 * x + 10) *
          Math.sin(((20 * x - 11.125) * (Math.PI * 2)) / 4.5)) /
          2 +
        1;
  },
  bounceIn(x) {
    return 1 - easings.bounceOut(1 - x);
  },
  bounceOut(x) {
    return x < 1 / 2.75
      ? 7.5625 * x * x
      : x < 2 / 2.75
      ? 7.5625 * (x -= 1.5 / 2.75) * x + 0.75
      : x < 2.5 / 2.75
      ? 7.5625 * (x -= 2.25 / 2.75) * x + 0.9375
      : 7.5625 * (x -= 2.625 / 2.75) * x + 0.984375;
  },
  bounceInOut(x) {
    return x < 0.5
      ? (1 - easings.bounceOut(1 - 2 * x)) / 2
      : (1 + easings.bounceOut(2 * x - 1)) / 2;
  },
};
