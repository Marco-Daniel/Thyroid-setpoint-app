import { fraction } from "mathjs"

/**
 * Used to calculate the multiplier for other calculations.
 * Returns an float.
 *
 * @param {number} tsh - real world tsh value.
 * @param {number} ft4 - real world ft4 value.
 * @param {number} slope - calculated by slope function.
 *
 */
export const multiplier = (tsh, ft4, slope) => tsh * Math.exp(-slope * ft4)

/**
 * Used to calculate the slope for other calculations.
 * Returns an float.
 *
 * @param {number[]} tsh - array containing two real world tsh values.
 * @param {number[]} ft4 - array containing two real world ft4 values.
 */
export const slope = (tsh, ft4) => (1 / (ft4[0] - ft4[1])) * Math.log(tsh[1] / tsh[0])

/**
 * Calculate the ft4 setpoint.
 * Returns an float.
 *
 * @param {number} slope - calculated by slope function.
 * @param {number} multiplier - calculated by multiplier function.
 */
export const calcFt4Setpoint = (slope, multiplier) => Math.log(-slope * multiplier * Math.sqrt(2)) / -slope

/**
 * Calculate the tsh setpoint.
 * Returns an float.
 *
 * @param {number} slope - calculated by slope function.
 */
export const calcTshSetpoint = slope => 1 / (-slope * Math.sqrt(2))

/**
 * Convert a ft4 value to its corresponding tsh value based on previous calculations.
 * Returns an float.
 *
 * @param {number} slope - calculated by slope function.
 * @param {number} multiplier - calculated by multiplier function.
 * @param {number} ft4 - real world ft4 value.
 */
export const ft4ToTSH = (slope, multiplier, ft4) => multiplier * Math.exp(slope * ft4)

export const calculateCurvature = (slope, multiplier, ft4 = 18) => {
  const posSlope = -1 * slope
  return (
    (posSlope ** 2 * multiplier * Math.exp(-(posSlope * ft4))) /
    (1 + (posSlope ** 2 * multiplier ** 2 * Math.exp(-2 * posSlope * multiplier)) ** fraction(3, 2))
  )
}
