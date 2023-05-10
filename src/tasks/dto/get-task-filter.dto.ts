import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatusValidationPipe } from "../pipes/task-status-validation.pipe";
import { TaskStatus } from "../tasks-status.enum";

export class GetTaskFilterDto {
    @IsOptional()
    @IsIn(new TaskStatusValidationPipe().validStatuses)
    status: TaskStatus;
    @IsOptional()
    @IsNotEmpty()
    search: string;
}