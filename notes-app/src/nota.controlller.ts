import { Controller, Get, Post, Put, Patch, Delete, Param, Body } from '@nestjs/common';
import { NotaService } from './services/nota.service';
import { Nota } from './entities/nota.entity';

@Controller('notas')
export class NotaController {
  constructor(private readonly notaService: NotaService) {}

  @Get('archivadas')
  findAllArchived(): Promise<Nota[]> {
    return this.notaService.findAllArchived();
  }

  @Get('no-archivadas')
  findAllNotArchived(): Promise<Nota[]> {
    return this.notaService.findAllNotArchived();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Nota> {
    return this.notaService.findOne(id);
  }

  @Post()
  create(@Body() nota: Nota): Promise<Nota> {
    return this.notaService.create(nota);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() nota: Nota): Promise<Nota> {
    return this.notaService.update(id, nota);
  }

  @Patch(':id/archivar')
  archive(@Param('id') id: number): Promise<Nota> {
    return this.notaService.archive(id);
  }

  @Patch(':id/desarchivar')
  unarchive(@Param('id') id: number): Promise<Nota> {
    return this.notaService.unarchive(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.notaService.remove(id);
  }
}