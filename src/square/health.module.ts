import { Module } from '@nestjs/common';
import {SquareController} from './controllers/square.controller';

@Module({
  controllers: [SquareController],
})
export class SquareModule {}
