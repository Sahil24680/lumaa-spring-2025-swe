// I used this controller to check the connection between the frontend and backend.


import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  getPing() {
    return { message: 'Bingo! Nest.js is connected.' };
  }
}
