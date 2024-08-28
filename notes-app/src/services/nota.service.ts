import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nota } from '../entities/nota.entity';

@Injectable()
export class NotaService {
  constructor(
    @InjectRepository(Nota)
    private readonly notaRepository: Repository<Nota>,
  ) {}

  findAllArchived(): Promise<Nota[]> {
    return this.notaRepository.find({ where: { archived: true } });
  }

  findAllNotArchived(): Promise<Nota[]> {
    return this.notaRepository.find({ where: { archived: false } });
  }

  findOne(id: number): Promise<Nota> {
    return this.notaRepository.findOneBy({ id });
  }

  create(nota: Nota): Promise<Nota> {
    return this.notaRepository.save(nota);
  }

  async update(id: number, nota: Nota): Promise<Nota> {
    await this.notaRepository.update(id, nota);
    return this.findOne(id);
  }

  async archive(id: number): Promise<Nota> {
    await this.notaRepository.update(id, { archived: true });
    return this.findOne(id);
  }

  async unarchive(id: number): Promise<Nota> {
    await this.notaRepository.update(id, { archived: false });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.notaRepository.delete(id);
  }
}