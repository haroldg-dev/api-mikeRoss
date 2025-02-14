// src/gpt/gpt.controller.ts
import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { GptService } from '../services/gpt.service';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';

@Controller('gpt')
@UseGuards(AuthenticationGuard)
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Get('threads/:id')
  async retrieveThreads(@Param('id') id: string, @Res() res: Response) {
    try {
      const thread = await this.gptService.retrieveThreads(id);
      res.status(200).json({
        status: 200,
        data: thread,
        message: 'THREAD_LISTED_BYID',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json('ERROR_GETTING_THREAD');
    }
  }
}
