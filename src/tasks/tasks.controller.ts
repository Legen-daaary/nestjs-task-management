import { Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { Body, Delete, Param, Patch, Query, UsePipes } from '@nestjs/common/decorators';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Task[] {
        return Object.keys(filterDto).length ? 
        this.tasksService.getTasksWithFillters(filterDto)
        :
        this.tasksService.getAllTasks();
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(createTaskDto);
    }

    @Patch('/:id/status')
    updateTask(
        @Param('id') id: string, 
        @Body('status', TaskStatusValidationPipe) status: TaskStatus
    ): Task {
        return this.tasksService.updateTask(id, status);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        this.tasksService.deleteTask(id);
    }
}
