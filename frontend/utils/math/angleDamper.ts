/* @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { TIME_MS } from '@/utils/math/time'

export const SETTLING_TIME = 10 * TIME_MS.second // plenty long enough
const MIN_DECAY_MILLISECONDS = 0.001
export const DECAY_MILLISECONDS = 50

/**
 * The Damper class is a generic second-order critically damped system that does
 * one linear step of the desired length of time. The only parameter is
 * DECAY_MILLISECONDS. This common parameter makes all states converge at the
 * same rate regardless of scale. xNormalization is a number to provide the
 * rough scale of cord, such that NIL_SPEED clamping also happens at roughly the
 * same convergence for all states.
 */
export class AngleDamper {
  private velocity: number = 0
  private naturalFrequency: number = 0

  constructor (decayMilliseconds: number = DECAY_MILLISECONDS) {
    this.setDecayTime(decayMilliseconds)
  }

  setDecayTime (decayMilliseconds: number) {
    this.naturalFrequency = 1 /
      Math.max(MIN_DECAY_MILLISECONDS, decayMilliseconds)
  }

  // Wrap angle to [-PI, PI]
  protected wrapAngle (angle: number): number {
    const pi2 = Math.PI * 2
    return ((((angle + Math.PI) % pi2) + pi2) % pi2) - Math.PI
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
    // Exact solution to a critically damped second-order system, where:
    // acceleration = this.naturalFrequency * this.naturalFrequency * (cordGoal
    // - cord) - 2 * this.naturalFrequency * this.velocity;
    const deltaX = this.wrapAngle(cord - cordGoal)
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
