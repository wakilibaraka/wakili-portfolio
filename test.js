const vW = 375;
const scale = vW / 896; // 0.418526
const innerWidth = 896;
const innerHeight = 100 / scale; // 238.93 vh
console.log(`Scaled width: ${innerWidth * scale}px`);
console.log(`Scaled height: ${innerHeight * scale}vh`);
