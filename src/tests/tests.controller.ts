import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TestsService } from './tests.service';
import { TestDto } from './dto/test.dto';
import { AuthGuardService } from '@/auth-guard/auth-guard.service';

@UseGuards(AuthGuardService)
@Controller('tests')
export class TestsController {
  constructor(private testsService: TestsService) {}

  @Get()
  getAllTests() {
    return this.testsService.getAllTests();
  }

  @Get(':id')
  getTestById(@Param('id') id: number) {
    return this.testsService.getTestById(id);
  }

  @Post()
  createTest(@Body() test: TestDto) {
    return this.testsService.createTest(test);
  }

  @Post(':id')
  updateTest(@Param('id') id: number, @Body() test: TestDto) {
    return this.testsService.updateTest(id, test);
  }

  @Delete(':id')
  deleteTest(@Param('id') id: number) {
    return this.testsService.deleteTest(id);
  }
}
