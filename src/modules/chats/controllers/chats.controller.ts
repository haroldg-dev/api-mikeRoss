import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
  Put,
} from '@nestjs/common';
import { ChatsService } from '../services/chats.service';
import { CreateChatDto } from '../dto/create-chat.dto';
import { UpdateChatDto } from '../dto/update-chat.dto';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';

@Controller('chats')
// @UseGuards(AuthenticationGuard)
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatsService.create(createChatDto);
  }

  @Get()
  findAll() {
    return this.chatsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatsService.findOne({ _id: id });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatsService.update(id, updateChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatsService.remove(id);
  }

  @Get('cursor/:limit')
  findAllByCursor(
    @Param('limit') limit: number,
    @Query('cursor') cursor?: string,
  ) {
    return this.chatsService.finAllByCursor(limit, cursor);
  }

  @Get('phone/:phone')
  findByPhone(@Param('phone') phone: string) {
    return this.chatsService.findByPhone(phone);
  }
}
