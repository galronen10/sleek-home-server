import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EndpointsService } from './endpoints.service';
import { IDetectDTO } from '@/entities';

@Controller('endpoints')
export class EndpointsController {
  constructor(private readonly endpointsService: EndpointsService) {}

  @Get()
  getAll(): Promise<any[]> {
    return this.endpointsService.getAll();
  }

  @Get('/maliciousList/:id')
  getMaliciousList(@Param('id') id: string): Promise<string[]> {
    return this.endpointsService.getMaliciousList(id);
  }

  @Post('/detect')
  detectEndpointMalicious(@Body() detectDTO: IDetectDTO) {
    return this.endpointsService.detectEndpointMalicious(detectDTO);
  }
}
