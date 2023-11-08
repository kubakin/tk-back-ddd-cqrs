import { Attempt } from './attempt.domain';

export class AttemptRepository {
  save: (attempt: Attempt) => Promise<void>;
  findById: (id: string) => Promise<Attempt | null>;
}
