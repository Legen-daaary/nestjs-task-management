import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { Task } from './tasks.entity';
import { TasksRepository } from './tasks.repository';
import { TaskStatus } from './tasks-status.enum';

@Injectable()
export class TasksService {
    constructor(
        private tasksRepository: TasksRepository
    ) {}

    async getTasks(getTaskFilterDto: GetTaskFilterDto): Promise<Task[]> {
        return this.tasksRepository.getTasks(getTaskFilterDto);
    }

    async getTaskById(id: number): Promise<Task> {
        const result = await this.tasksRepository.findOneBy({id});

        if (!result) {
            throw new NotFoundException(`A task with id ${id} is not existing.`);
        }

        return result;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return await this.tasksRepository.createTask(createTaskDto);
    }

    async updateTask(id: number, status: TaskStatus): Promise<Task> {
        const task: Task = await this.getTaskById(id);

        await this.tasksRepository.updateTask(task, status);

        return task;
    }

    async deleteTask(id: number): Promise<void> {
        const deleteResult = await this.tasksRepository.delete(id);

        if (deleteResult.affected === 0) {
            throw new NotFoundException(`A task with id ${id} is not existing.`);
        }
    }
}
