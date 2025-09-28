import { TIME_MS } from '@/utils/math/time'

export const SETTLING_TIME = 10 * TIME_MS.second // plenty long enough
const MIN_DECAY_MILLISECONDS = 0.001
export const DECAY_MILLISECONDS = 50

export class Damper {
  private velocity: number = 0
  private naturalFrequency: number = 0

  constructor (decayMilliseconds: number = DECAY_MILLISECONDS) {
    this.setDecayTime(decayMilliseconds)
  }

  setDecayTime (decayMilliseconds: number) {
    this.naturalFrequency = 1 /
      Math.max(MIN_DECAY_MILLISECONDS, decayMilliseconds)
  }

  update (
    cord: number,
    cordGoal: number,
    timeStepMilliseconds: number,
    xNormalization: number
  ): number {
    const nilSpeed = 0.0002 * this.naturalFrequency

    if (cord === null || xNormalization === 0) {
      return cordGoal
    }
    if (cord === cordGoal && this.velocity === 0) {
      return cordGoal
    }
    if (timeStepMilliseconds < 0) {
      return cord
    }
    const deltaX = cord - cordGoal
    const intermediateVelocity = this.velocity + this.naturalFrequency * deltaX
    const intermediateX = deltaX + timeStepMilliseconds * intermediateVelocity
    const decay = Math.exp(-this.naturalFrequency * timeStepMilliseconds)
    const newVelocity =
      (intermediateVelocity - this.naturalFrequency * intermediateX) * decay
    const acceleration =
      -this.naturalFrequency * (newVelocity + intermediateVelocity * decay)
    if (
      Math.abs(newVelocity) < nilSpeed * Math.abs(xNormalization) &&
      acceleration * deltaX >= 0
    ) {
      // This ensures the controls settle and stop calling this function instead
      // of asymptotically approaching their goal.
      this.velocity = 0
      return cordGoal
    } else {
      this.velocity = newVelocity
      return cordGoal + intermediateX * decay
    }
  }
}
