import { ConfigModule } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule.forRoot()],
    useFactory: () => ({
        autoLoadEntities: true,
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: process.env.DATABASE_PASSWORD || 'postgres',
        database: 'taskmanagement',
        synchronize: true,
    }),
};