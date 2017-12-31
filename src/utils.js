import _ from 'lodash';

export const writeToDebugFile = (data, postfix = 0) => {
  // eslint-disable-next-line
  const fs = require('fs');
  fs.writeFileSync(`/Users/user/Desktop/pdf-lib/debug${postfix}`, data);
};

export const isInt = num => num % 1 === 0;

export const charCode = char => {
  if (char.length !== 1) {
    throw new Error('"char" must be exactly one character long');
  }
  return char.charCodeAt(0);
};

export const isString = val => typeof val === 'string';

export const isObject = val =>
  Object.prototype.toString.call(val) === '[object Object]';

export const mergeUint8Arrays = (...arrs) => {
  const totalLength = _.sum(arrs.map(a => a.length));
  const newArray = new Uint8Array(totalLength);

  let offset = 0;
  arrs.forEach(a => {
    newArray.set(a, offset);
    offset += a.length;
  });

  return newArray;
};

export const charCodes = str => str.split('').map(c => c.charCodeAt(0));

export const arrayToString = (arr, startAt = 0, stopAt) => {
  const stopIdx =
    stopAt === undefined || stopAt >= arr.length ? arr.length : stopAt;
  return Array.from(arr.subarray(startAt, stopIdx))
    .map(n => String.fromCharCode(n))
    .join('');
};

export const arrayCharAt = (arr, idx) => String.fromCharCode(arr[idx]);

export const trimArray = arr => {
  let idx = 0;
  while (String.fromCharCode(arr[idx]).match(/^[\ \n\r]/)) idx++;
  return arr.subarray(idx);
};

export const arraysAreEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
};

export const arrayIndexOf = (arr, targetStr, startFrom = 0) => {
  const targetArr = targetStr.split('').map(c => c.charCodeAt(0));
  let currIdx = startFrom;

  while (
    !arraysAreEqual(
      arr.subarray(currIdx, currIdx + targetStr.length),
      targetArr,
    )
  ) {
    currIdx++;
    if (currIdx >= arr.length) return undefined;
  }

  return currIdx;
};

export const arrayFindIndexOf = (arr, predicate, startFrom = 0) => {
  let currIdx = startFrom;

  while (!predicate(arr.subarray(currIdx, currIdx + 1)[0])) {
    currIdx += 1;
    if (currIdx >= arr.length) return undefined;
  }

  return currIdx;
};

export const arrayFindIndexOfByChar = (arr, predicate, startFrom = 0) =>
  arrayFindIndexOf(
    arr,
    byte => predicate(String.fromCharCode(byte)),
    startFrom,
  );
