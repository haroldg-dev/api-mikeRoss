import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { MessagesService } from '../services/messages.service';
import { CreateMessageDto } from '../dto/create.dto';
import { UpdateMessageDto } from '../dto/update.dto';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';

@Controller('messages')
// @UseGuards(AuthenticationGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Get()
  findAll() {
    return this.messagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne({ _id: id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagesService.remove(id);
  }

  @Get('cursor/:limit')
  findAllByCursor(
    @Param('limit') limit: number,
    @Query('cursor') cursor?: string,
    @Query('chatId') chatId?: string,
  ) {
    return this.messagesService.findMessagesByCursor(limit, cursor, chatId);
  }
}
