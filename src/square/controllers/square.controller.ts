import { Controller, Get } from '@nestjs/common';

@Controller('square')
export class SquareController {

  @Get('/')
  healthCheck() {
    let x = 0.0001;
    for(let i = 0; i < 1000000000; i++) {
      x += Math.sqrt(x);
    }
    return 'Computed! ' + x;
  }
}
