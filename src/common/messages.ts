import { World } from './common';

export const enum MessageType {
  WorldStateMessage = "WorldStateMessage",
  StartSimulation = "StartSimulation",
  StopSimulation = "StopSimulation"
}

export class Message {
  constructor(public readonly type: MessageType) { }
}

export class WorldStateMessage extends Message {

  constructor(public readonly world: World) {
    super(MessageType.WorldStateMessage);
  }
}

export const StartSimulation = new Message(MessageType.StartSimulation);

export const StopSimulation = new Message(MessageType.StopSimulation);