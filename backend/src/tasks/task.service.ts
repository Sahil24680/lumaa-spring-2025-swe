import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class TaskService {
  // Injecting Task repository to interact with the database
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  // Create a new task for a specific user
  async createTask(title: string, description: string, user: User): Promise<Task> {
    // Create a new task entity with default completion status as false
    const newTask = this.taskRepository.create({
      title,
      description,
      user, // Associates the task with the authenticated user
      isComplete: false,
    });

    // Save the new task in the database
    await this.taskRepository.save(newTask);
    return newTask;
  }

  // Get all tasks for the authenticated user
  async getTasks(user: User): Promise<Task[]> {
    // Find all tasks that belong to the user, ordered by ID in ascending order
    return this.taskRepository.find({
      where: { user },
      order: { id: 'ASC' },
    });
  }

  // Get a single task by its ID for the authenticated user
  async getTaskById(id: number, user: User): Promise<Task> {
    // Find the task by ID and ensure it belongs to the authenticated user
    const task = await this.taskRepository.findOne({
      where: { id, user },
    });

    // If task is not found, throw an exception
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }

    return task;
  }

  // Update a task (title, description, or isComplete status)
  async updateTask(id: number, user: User, updates: Partial<Task>): Promise<Task> {
    // Get the task to update and check if it belongs to the authenticated user
    const task = await this.getTaskById(id, user);

    // Merge the updates into the existing task
    Object.assign(task, updates);

    // Save the updated task in the database
    await this.taskRepository.save(task);
    return task;
  }

  // Delete a task by its ID for the authenticated user
  async deleteTask(id: number, user: User): Promise<void> {
    // Delete the task
    const result = await this.taskRepository.delete({ id, user });

    // If no rows were affected, the task was not found
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }
  }
}
