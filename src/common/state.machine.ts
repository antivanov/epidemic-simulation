import * as _ from 'lodash';

import { State } from './common';
import { randomOfMagnitude } from './random';

export class TransitionToState<S> {
  to: S;
  probability: number;
  // Base duration, the real duration is a random number based on the base duration
  baseDuration: number;
  constructor(to: S, probability: number, baseDuration: number) {
    this.to = to;
    this.probability = probability;
    this.baseDuration = baseDuration;
  }
}

export class TransitionsFromState<S> {
  from: S;
  transitionsFromState: Array<TransitionToState<S>>;
  constructor(from: S, transitionsFromState: Array<TransitionToState<S>>) {
    this.from = from;
    const totalProbability = _.sum(transitionsFromState.map(t => t.probability))
    if (totalProbability !== 1.0 && transitionsFromState.length > 0) {
      throw new Error(`Ìnvalid TransitionsFromState: probabilities of outgoing transitions should add up to 1.0`);
    }
    this.transitionsFromState = transitionsFromState;
  }
}

export class StateMachine {

  transitions: { [K in keyof typeof State]: TransitionsFromState<State> };

  constructor(transitions: { [K in keyof typeof State]: TransitionsFromState<State> }) {
    this.transitions = transitions;
  }

  nextState(currentState: State): [State, number] | null {
    const transitionsFromState = this.transitions[currentState].transitionsFromState;

    if (transitionsFromState.length === 0) {
      return null;
    } else {
      const randomNumber = Math.random();
      let totalProbability = 0;
      let transitionIndex = 0;
      while (totalProbability <= randomNumber && transitionIndex < transitionsFromState.length) {
        totalProbability += transitionsFromState[transitionIndex].probability;
        transitionIndex++;
      }
      const chosenTransition = transitionsFromState[transitionIndex - 1];
      const timeToCompleteTransition = randomOfMagnitude(Math.floor(chosenTransition.baseDuration / 3)) + chosenTransition.baseDuration;
      return [chosenTransition.to, timeToCompleteTransition];
    }
  }
}