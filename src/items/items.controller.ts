import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemDto } from './dto/item.dto';
import { AuthGuardService } from '@/auth-guard/auth-guard.service';

@UseGuards(AuthGuardService)
@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get()
  getItems() {
    return this.itemsService.getAllItems();
  }

  @Get(':id')
  getItemById(@Param('id') id: number) {
    return this.itemsService.getItemById(id);
  }

  @Post()
  createItem(@Body() item: ItemDto) {
    return this.itemsService.createItem(item);
  }

  @Post(':id')
  updateItem(@Param('id') id: number, @Body() item: ItemDto) {
    return this.itemsService.updateItem(id, item);
  }

  @Delete(':id')
  deleteItem(@Param('id') id: number) {
    return this.itemsService.deleteItem(id);
  }
}
