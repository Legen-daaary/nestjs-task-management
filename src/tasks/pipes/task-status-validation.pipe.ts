import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common"
import { TaskStatus } from "../tasks.model"

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
        throw new BadRequestException(`${value} is not a valid task status!`);
    }
}