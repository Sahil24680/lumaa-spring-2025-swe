import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';

@Module({
  // Importing TypeOrmModule to use Task entity with database operations
  imports: [TypeOrmModule.forFeature([Task])],

  // TaskController manages incoming requests for task operations (CRUD)
  controllers: [TaskController],

  
  // Interacts with the database through the Task entity
  providers: [TaskService],

  // Exporting TaskService to make it reusable in other modules
  exports: [TaskService],
})
export class TaskModule {}
