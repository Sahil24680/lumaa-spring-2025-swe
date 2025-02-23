// Task interface to define the structure of a task object
export interface Task {
  id: number;             // Unique identifier for each task
  title: string;          // Title of the task
  description?: string;   // Optional description providing more details about the task
  isComplete: boolean;    // Status indicating if the task is complete or not
}
