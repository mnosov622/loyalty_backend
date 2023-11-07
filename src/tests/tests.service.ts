import { Injectable } from '@nestjs/common';
import { Test } from './tests.model';
import { TestDto } from './dto/test.dto';

@Injectable()
export class TestsService {
  async getAllTests() {
    const tests = await Test.findAll();
    return tests;
  }

  async getTestById(id: number) {
    try {
      const test = await Test.findByPk(id);
      if (!test) throw new Error('No test found');
      return test;
    } catch (e) {
      throw new Error(e);
    }
  }

  async createTest(test: TestDto) {
    try {
      const newTest = await Test.create({ ...test });
      return newTest;
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateTest(id: number, test: TestDto) {
    try {
      const updatedTest = await Test.findByPk(id);
      await updatedTest.update({ ...test });
      return updatedTest;
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteTest(id: number) {
    try {
      const result = await Test.destroy({ where: { id } });
      if (result === 0) throw new Error('No test found');
      return { message: `Test with id ${id} has been deleted` };
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
