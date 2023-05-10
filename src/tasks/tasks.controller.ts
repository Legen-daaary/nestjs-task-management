import { Controller, Get, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common';
import { Body, Delete, Param, Patch, Query, UsePipes } from '@nestjs/common/decorators';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './tasks.entity';
import { TaskStatus } from './tasks-status.enum';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getTasks(@Query(ValidationPipe) getTaskFilterDto: GetTaskFilterDto): Promise<Task[]> {
        return this.tasksService.getTasks(getTaskFilterDto);
    }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }

    @Patch('/:id/status')
    updateTask(
        @Param('id', ParseIntPipe) id: number, 
        @Body('status', TaskStatusValidationPipe) status: TaskStatus
    ): Promise<Task> {
        return this.tasksService.updateTask(id, status);
    }

    @Delete('/:id')
    async deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.tasksService.deleteTask(id);
    }
}
