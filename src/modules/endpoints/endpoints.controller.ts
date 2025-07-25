import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EndpointsService } from './endpoints.service';
import { IDetectDTO, IEndpointForClient } from '@/entities';

@Controller('endpoints')
export class EndpointsController {
  constructor(private readonly endpointsService: EndpointsService) {}

  @Get()
  getAll(): Promise<IEndpointForClient[]> {
    return this.endpointsService.getAll();
  }

  @Get('/maliciousList/:id')
  getMaliciousList(@Param('id') id: string): Promise<string[]> {
    return this.endpointsService.getMaliciousList(id);
  }

  @Post('/detect')
  async detectEndpointMalicious(@Body() detectDTO: IDetectDTO) {
    return this.endpointsService.detectEndpointMalicious(detectDTO);
  }

  @Post('/seedMaliciousFiles')
  async seedMaliciousFiles(@Body() hashes: string[]): Promise<void> {
    await this.endpointsService.seedMaliciousFiles(hashes);
  }
}
