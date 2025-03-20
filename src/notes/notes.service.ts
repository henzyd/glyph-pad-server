import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  create(notesDto: CreateNoteDto): Promise<Note> {
    const note = this.notesRepository.create(notesDto);
    return this.notesRepository.save(note);
  }

  findAll(): Promise<Note[]> {
    return this.notesRepository.find();
  }

  async findOne(id: string): Promise<Note> {
    const note = await this.notesRepository.findOneBy({ id });
    if (!note) throw new NotFoundException(`Note not found`);
    return note;
  }

  async update(id: string, noteDto: UpdateNoteDto) {
    const note = await this.findOne(id);
    return this.notesRepository.save({ ...note, ...noteDto });
  }

  async remove(id: string) {
    const note = await this.findOne(id);
    return this.notesRepository.delete(note.id);
  }
}
