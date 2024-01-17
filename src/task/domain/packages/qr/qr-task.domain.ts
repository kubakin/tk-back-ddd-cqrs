import { TaskDomain } from '../../task.domain';
import { QrTaskAnswer } from './qr-task.answer';

export class QrTaskDomain extends TaskDomain {
  __validate(data: unknown) {
    QrTaskAnswer.validate(data);
  }
}
