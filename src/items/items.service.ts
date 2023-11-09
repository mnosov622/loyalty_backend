import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ItemDto } from './dto/item.dto';
import { Item } from './items.model';

@Injectable()
export class ItemsService {
  async getAllItems() {
    const items = await Item.findAll();
    return items;
  }

  async getItemById(id: number) {
    const item = await Item.findByPk(id);
    if (!item) throw new Error('No item found');
    return item;
  }

  async createItem(item: ItemDto) {
    try {
      const newItem = await Item.create({ ...item });
      return newItem;
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateItem(id: number, item: ItemDto) {
    try {
      const updatedItem = await Item.findByPk(id);
      if (!updatedItem) throw new Error('No item found');
      await updatedItem.update({ ...item });
      return updatedItem;
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteItem(id: number) {
    try {
      const result = await Item.destroy({ where: { id } });
      if (result === 0) throw new Error('No item found');
      return { message: `Item with id ${id} has been deleted` };
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
