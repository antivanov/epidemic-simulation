import { State } from '../../../common/common';

export const stateColors: { [K in keyof typeof State]: string } = {
  [State.Healthy]: "#006600",
  [State.Exposed]: "#776600",
  [State.Infected]: "#cc6600",
  [State.Contagious]: "#cc0000",
  [State.Accute]: "#ff00ff",
  [State.IntensiveCare]: "#ffd9e3",
  [State.Immune]: "#0000ff",
  [State.Dead]: "#b2b2b2"
};
