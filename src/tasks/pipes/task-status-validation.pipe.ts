import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common"
import { TaskStatus } from "../tasks-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly validStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
    ];

    transform(value: any, metadata: ArgumentMetadata) {
        if (this.validStatuses.includes(value)) {
            return value;
        }
        throw new BadRequestException(`status must be one of the following values: ${this.validStatuses.join(', ')}`);
    }
}