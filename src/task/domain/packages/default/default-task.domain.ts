import { TaskDomain } from '../../task.domain';
import { DefaultTaskAnswer } from './default-task.answer';

export class DefaultTaskDomain extends TaskDomain {
  answer: DefaultTaskAnswer;
  __validate(data: unknown) {
    const answer = DefaultTaskAnswer.validate(data);
    const userAnswer = answer.value.trim().toLowerCase();
    const taskAnswer = this.answer.value.trim().toLowerCase();
    if (userAnswer !== taskAnswer) throw new Error('Not correct answer');
  }
}
