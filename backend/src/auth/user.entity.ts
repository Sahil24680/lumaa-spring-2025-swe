import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Task } from '../tasks/task.entity';

@Entity('users')  // Defines 'users' table in PostgreSQL
@Unique(['username']) // Ensures usernames are unique in the database
export class User {
  @PrimaryGeneratedColumn()  // Auto-incrementing primary key (id)
  id: number;

  @Column({ type: 'varchar', length: 100 }) // Username column with max length 100
  @IsNotEmpty() // Validates that username is not empty
  username: string;

  @Column({ type: 'text' }) // Password column stored as text
  @IsNotEmpty() // Validates that password is not empty
  password: string;

  @OneToMany(() => Task, (task) => task.user) 
  // Establishes one-to-many relationship with Task entity
  // Each user can have multiple tasks associated with them
  tasks: Task[];
}
