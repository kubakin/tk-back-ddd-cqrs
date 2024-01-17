export enum GameInstanceStatusEnum {
  Created = 'Created',
  Started = 'Started',
  Finished = 'Finished',
  Released = 'Released',
  Approved = 'Approved',
}

export type GameInstanceStatus = GameInstanceStatusEnum | string;
