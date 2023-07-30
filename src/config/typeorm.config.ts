import { ConfigService } from '@nestjs/config/dist';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Task } from 'src/tasks/task.entity';

export const TypeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      type: 'postgres',
      entities: [Task],
      autoLoadEntities: true,
      synchronize: true,
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      ssl: false,
    };
  },
};
