function boxtitleToEquation(arrBox, isTop) {
  let EqX = 0;
  let EqConst = 0;
  for (const box in arrBox) {
    if (arrBox[box].substring(0, 1) === "-") {
      arrBox[box] = arrBox[box].substring(1);
    }

    switch (arrBox[box]) {
      case "X^2":
        EqX += 1;
        break;
      case "X ":
        isTop ? (EqX += 1) : (EqConst += 1);
        break;
      case "X":
        !isTop ? (EqX += 1) : (EqConst += 1);
        break;
      case "1":
        EqConst += 1;
        break;
      default:
        break;
    }
  }
  return { EqX, EqConst };
}
function getEquationTitleFromArr(arr, isTop) {
  let result = [];
  const tempItem = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (isTop) {
      if (tempItem.top === arr[i].top) {
        result.push(arr[i].title);
      }
    } else {
      if (tempItem.left === arr[i].left) {
        result.push(arr[i].title);
      }
    }
  }
  return result;
}
function splitPlusMinus(arr, isMin = false) {
  let arrPlus = [];
  let arrMin = [];
  for (const key in arr) {
    if (arr.hasOwnProperty(key)) {
      if (arr[key].title.substring(0, 1) === "-") {
        arrMin.push(arr[key]);
      } else {
        arrPlus.push(arr[key]);
      }
    }
  }
  if (isMin) {
    return arrMin;
  }
  return arrPlus;
}
export function getEquation(arr) {
  const plusArr = splitPlusMinus(arr);
  const minArr = splitPlusMinus(arr, true);
  const findTopPlus = plusArr.sort((a, b) => a.top - b.top);
  const findLeftPlus = plusArr.sort((a, b) => a.left - b.left);
  const firstEqPlus = boxtitleToEquation(
    getEquationTitleFromArr(findTopPlus, true),
    true
  );
  const secondEqPlus = boxtitleToEquation(
    getEquationTitleFromArr(findLeftPlus, false),
    false
  );

  const findTopMinus = [...minArr].sort((a, b) => a.top - b.top); // ascending sort using top component
  const findLeftMinus = [...minArr].sort((a, b) => a.left - b.left); // ascending sort using left component
  const firstEqMinus = boxtitleToEquation(
    getEquationTitleFromArr(findTopMinus, true),
    true
  );
  const secondEqMinus = boxtitleToEquation(
    getEquationTitleFromArr(findLeftMinus, false),
    false
  );
  const EqX = firstEqPlus.EqX;
  const EqConst = firstEqPlus.EqConst - firstEqMinus.EqConst;
  const EqX2 = secondEqPlus.EqX;
  const isThereIsMinusInMostLeft =
    findLeftPlus.length > 0 && findLeftMinus.length > 0
      ? findLeftPlus[0].left == findLeftMinus[0].left
      : false;
  const EqConst2 = isThereIsMinusInMostLeft
    ? secondEqPlus.EqConst - secondEqMinus.EqConst
    : secondEqPlus.EqConst;
  return { EqX, EqConst, EqX2, EqConst2 };
}
export function getEquationPenjabaran(EqX, EqX2, EqConst, EqConst2) {
  const constantaX = EqX * EqConst2 + EqX2 * EqConst;
  const constanta = EqConst * EqConst2;
  const constantaXString =
    constantaX >= 0
      ? `+ ${constantaX}`
      : constantaX == -1
      ? "- "
      : `${constantaX.toString().split("").join(" ")}`;
  const constantaString =
    constanta >= 0
      ? `+ ${constanta}`
      : `${constanta.toString().split("").join(" ")}`;
  console.log(constantaXString);
  console.log(constantaString);
  return `${
    EqX * EqX2 > 1 ? EqX * EqX2 : ""
  }x^2 ${constantaXString}x ${constantaString}`;
}
export function getPenjabaran(EqX, EqX2, EqConst, EqConst2) {
  let penjabaran = "";
  penjabaran += "( ";
  if (EqX != 0) {
    penjabaran += `${EqX}X`;
  }
  if (EqConst != 0) {
    penjabaran += EqConst > 0 ? `+ ${EqConst}` : `${EqConst}`;
  }
  penjabaran += " ) ( ";
  if ((EqX2 = 0)) {
    penjabaran += `${EqX2}X`;
  }
  if (EqConst2 != 0) {
    penjabaran += EqConst2 > 0 ? `+ ${EqConst2}` : `${EqConst2}`;
  }
  penjabaran += " )";
  return penjabaran;
}
