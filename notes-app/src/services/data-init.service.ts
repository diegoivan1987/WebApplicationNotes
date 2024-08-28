import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nota } from 'src/entities/nota.entity';

@Injectable()
export class DataInitService implements OnModuleInit {
  constructor(
    @InjectRepository(Nota)
    private readonly notaRepository: Repository<Nota>,
  ) {}

  async onModuleInit() {
    const count = await this.notaRepository.count();
    if (count === 0) {
      const initialNotes = [
        { title: 'First Note', content: 'This is the first note', archived: false },
        { title: 'Second Note', content: 'This is the second note', archived: false },
        { title: 'Third Note', content: 'This is the third note', archived: true },
      ];
      await this.notaRepository.save(initialNotes);
      console.log('Initial data has been populated.');
    }
  }
}