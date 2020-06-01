/**
 * Calculates the mean of all the numbers in the array.
 *
 * @param {number[]} arr - Flat array containing numbers.
 *
 * @returns {number}
 *
 */
export const meanFromArray = arr => {
  const total = arr.reduce((acc, val) => acc + val, 0)

  return total / arr.length
}

/**
 * Calculates the median from all the numbers in the array.
 *
 * @param {number[]} arr - Flat array containing numbers.
 *
 * @returns {number}
 *
 */
export const medianFromArray = arr => {
  const middlePoint = Math.floor(arr.length / 2)
  const numbers = [...arr].sort((a, b) => a - b)

  return arr.length % 2 !== 0 ? numbers[middlePoint] : (numbers[middlePoint - 1] + numbers[middlePoint]) / 2
}

/**
 * Returns an array of decreasing numbers starting from given value and decreases by the provided steps or defaults to one.
 *
 * @param {number} start - Start the returned array from this number.
 * @param {number} [step=1] - Decrease each step by this value.
 * @param {number[]} [arr=[]] - You can use an already existing array to add the numbers to.
 *
 * @returns {number[]}
 *
 */
export const decreasingNumbersArray = (start, step = 1, arr = []) => {
  for (i = start; i > 0; i = i - step) arr.push(i)
  return [...arr]
}
/**
 * To be used by Array.prototype.sort to sort an two-dimensional array on the first item in the array.
 *
 */

export const sort2DArray = (a, b) => {
  if (a[0] === b[0]) {
    return 0
  } else {
    return a[0] < b[0] ? -1 : 1
  }
}
