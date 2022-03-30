/* eslint-disable linebreak-style */
function add(a, b = "") {
  if (b !== "") {
    return a + b;
  }
  return function (b) {
    return a + b;
  };
}

function sub(a, b = "") {
  if (b !== "") {
    return a - b;
  }
  return function (b) {
    return b - a;
  };
}

function mul(a, b = "") {
  if (b !== "") {
    return a * b;
  }
  return function (b) {
    return a * b;
  };
}

function div(a, b = "") {
  if (b !== "") {
    return a / b;
  }
  return function (b) {
    return b / a;
  };
}

function pipe(...theArgs) {
  return function (a) {
    let res = a;
    theArgs.forEach((element) => {
      res = element(res);
    });
    return res;
  };
}

// const a = add(1, 2); // 3
// const b = mul(a, 10); // 30
// const sub1 = sub(1);
// const c = sub1(b); // 29
// const d = mul(sub(a, 1))(c); // 58
// console.log(`a:${a} b:${b} c:${c} d:${d}`);
// const doSmth = pipe(add(d), sub(c), mul(b), div(a));
// const result = doSmth(0);
// console.log(result);
// console.log(pipe(add(1), mul(2))(3)); // 8
