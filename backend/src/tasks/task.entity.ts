import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../auth/user.entity';

@Entity('tasks') // Maps this class to the 'tasks' table in the database
export class Task {
  @PrimaryGeneratedColumn() // Auto-generated unique identifier for each task
  id: number;

  @Column({ type: 'varchar', length: 100 }) // Task title with a max length of 100 characters
  title: string;

  @Column({ type: 'text', nullable: true }) // Task description, optional (nullable)
  description: string;

  @Column({ type: 'boolean', default: false }) // Task completion status, defaults to false
  isComplete: boolean;

  @ManyToOne(() => User, (user) => user.tasks) // One user can have multiple tasks
  user: User;
}
