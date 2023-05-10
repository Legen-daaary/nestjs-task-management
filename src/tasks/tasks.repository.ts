import { DataSource, Repository } from "typeorm";
import { Task } from "./tasks.entity";
import { Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./tasks-status.enum";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";

@Injectable()
export class TasksRepository extends Repository<Task> {
    constructor(private dataSource: DataSource) {
        super(Task, dataSource.createEntityManager());
    }

    async getTasks(getTaskFilterDto: GetTaskFilterDto): Promise<Task[]> {
        const queryBuilder = this.createQueryBuilder('task');

        const {status} = getTaskFilterDto;
        let {search} = getTaskFilterDto;

        if (status) {
            queryBuilder.andWhere('task.status = :status', {status});
        }

        if (search) {
            search = search.toUpperCase();
            queryBuilder.andWhere('( UPPER(task.title) LIKE :search', {search: `%${search}%`});
            queryBuilder.orWhere('UPPER(task.description) LIKE :search )', {search: `%${search}%`});
        }

        return queryBuilder.getMany();
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const task: Task = new Task();
        const {title, description} = createTaskDto;
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        await task.save();
        return task;
    }

    async updateTask(task: Task, status: TaskStatus): Promise<void> {
        task.status = status;
        await task.save();
    }
}