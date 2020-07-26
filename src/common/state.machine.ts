import * as _ from 'lodash';

import { State } from './common';
import { randomOfMagnitude } from './random';

//TODO: Would it be better for a transition to include both the start and end state rather than only the end state?
export class TransitionToState<S> {
  constructor(public readonly to: S) {}
}

export class RandomTransitionToState<S> extends TransitionToState<S> {
  // Base duration, the real duration is a random number based on the base duration
  constructor(to: S, public readonly probability: number, public readonly baseDuration: number) {
    super(to);
  }
}

export class ForcedTransitionToState<S> extends TransitionToState<S> {
  constructor(to: S) {
    super(to);
  }
}

export class TransitionsFromState<S> {
  constructor(public readonly from: S,
              public readonly randomTransitions: Array<RandomTransitionToState<S>>,
              public readonly forcedTransitions: Array<ForcedTransitionToState<S>> = []) {
    this.from = from;
    const totalProbability = _.sum(randomTransitions.map(t => t.probability))
    if (totalProbability !== 1.0 && randomTransitions.length > 0) {
      throw new Error(`Ìnvalid TransitionsFromState: probabilities of outgoing transitions should add up to 1.0`);
    }
    this.randomTransitions = randomTransitions;
  }
}

export class StateMachine {

  constructor(public readonly transitions: Partial<{ [K in keyof typeof State]: TransitionsFromState<State> }>) {}

  //TODO: Use Option? Express [State, number] as a separate type?
  nextState(currentState: State): [State, number] | null {
    const transitionsFromState = this.transitions[currentState]!.randomTransitions;

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
      //TODO: Should we handle the empty transition list uniformly, i.e. can we get rid of the enclosing if?
      const chosenTransition = transitionsFromState[transitionIndex - 1];
      const timeToCompleteTransition = randomOfMagnitude(Math.floor(chosenTransition.baseDuration / 3)) + chosenTransition.baseDuration;
      return [chosenTransition.to, timeToCompleteTransition];
    }
  }
}