import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { randomUUID } from 'crypto';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return [...this.tasks];
    }

    getTasksWithFillters(filterDto: GetTaskFilterDto): Task[] {
        let result = this.getAllTasks();

        const {status} = filterDto;
        let {search} = filterDto;

        if (status) {
            result = result.filter(task => task.status === status);
        }

        if (search) {
            search = search.toLowerCase();
            result = result.filter(task => 
                task.title.toLowerCase().includes(search) 
                || 
                task.description.toLowerCase().includes(search)
            );
        }

        return result;
    }

    getTaskById(id: string): Task {
        const result: Task = this.tasks.find(task => task.id === id);

        if (!result) {
            throw new NotFoundException(`A task with id ${id} is not existing.`);
        }

        return result;
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const result: Task = {
            id: randomUUID(),
            ...createTaskDto,
            status: TaskStatus.OPEN
        };

        this.tasks.push(result);

        return result;
    }

    updateTask(id: string, status: TaskStatus): Task {
        const result: Task = this.getTaskById(id);
        result.status = status;
        return result;
    }

    deleteTask(id: string): void {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }
}
