import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  ParseIntPipe,
  Put
} from '@nestjs/common';
import { Task } from './task.entity';
import { TaskService } from './task.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/user.entity';

@UseGuards(JwtAuthGuard) // Protects all routes with JWT authentication
@Controller('tasks') // Base route for all task-related endpoints
export class TaskController {
  constructor(private taskService: TaskService) {} // Injects TaskService for business logic

  // Create a new task
  @Post()
  async createTask(
    @Body('title') title: string, // Get title from request body
    @Body('description') description: string, // Get description from request body
    @Request() req, // Get user information from the request object
  ) {
    const user: User = req.user; // Extract authenticated user
    return this.taskService.createTask(title, description, user); // Call service to create task
  }

  // Get all tasks for the authenticated user
  @Get()
  async getTasks(@Request() req) {
    const user: User = req.user; // Extract authenticated user
    return this.taskService.getTasks(user); // Call service to get tasks for this user
  }


  // Update a task by ID
  @Put(':id')
  async updateTask(
    @Param('id', ParseIntPipe) id: number, // Get task ID from URL and convert to number
    @Body() updates: Partial<Task>, // Get update data from request body
    @Request() req, // Get user information from the request object
  ) {
    const user: User = req.user; // Extract authenticated user
    return this.taskService.updateTask(id, user, updates); // Call service to update the task
  }

  // Delete a task by ID
  @Delete(':id')
  async deleteTask(
    @Param('id', ParseIntPipe) id: number, // Get task ID from URL and convert to number
    @Request() req, // Get user information from the request object
  ) {
    const user: User = req.user; // Extract authenticated user
    return this.taskService.deleteTask(id, user); // Call service to delete the task
  }
}
