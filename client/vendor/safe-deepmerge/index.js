"use strict";

const UNSAFE_KEYS = new Set(["__proto__", "constructor", "prototype"]);

function isPlainObject(value) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function merge(target, source) {
  const output = isPlainObject(target) ? { ...target } : {};
  if (!isPlainObject(source)) {
    return output;
  }

  for (const key of Object.keys(source)) {
    if (UNSAFE_KEYS.has(key)) {
      continue;
    }
    const sourceValue = source[key];
    const targetValue = output[key];
    if (Array.isArray(sourceValue)) {
      output[key] = sourceValue.slice();
    } else if (isPlainObject(sourceValue) && isPlainObject(targetValue)) {
      output[key] = merge(targetValue, sourceValue);
    } else if (isPlainObject(sourceValue)) {
      output[key] = merge({}, sourceValue);
    } else {
      output[key] = sourceValue;
    }
  }

  return output;
}

function all(values) {
  return values.reduce((accumulator, value) => merge(accumulator, value), {});
}

merge.all = all;
module.exports = merge;
module.exports.default = merge;
module.exports.all = all;
