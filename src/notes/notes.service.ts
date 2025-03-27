import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { UsersService } from '~/users/users.service';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
    private usersService: UsersService,
  ) {}

  async create(notesDto: CreateNoteDto & { userIp: string }): Promise<Note> {
    const user = await this.usersService.findOrCreateUser(notesDto.userIp);
    const note = this.notesRepository.create({ ...notesDto, created_by: user });
    return this.notesRepository.save(note);
  }

  async findAll(userIp: string): Promise<Note[]> {
    const user = await this.usersService.findOne(userIp);
    return this.notesRepository.find({
      where: {
        created_by: user,
      },
    });
  }

  async findOne(id: string, userIp: string): Promise<Note> {
    const user = await this.usersService.findOne(userIp);
    const note = await this.notesRepository.findOne({
      where: { id, created_by: user },
      relations: ['created_by'],
    });
    if (!note) throw new NotFoundException(`Note not found`);
    return note;
  }

  async update(id: string, noteDto: UpdateNoteDto, userIp: string) {
    const note = await this.findOne(id, userIp);
    return this.notesRepository.save({ ...note, ...noteDto });
  }

  async remove(id: string, userIp: string) {
    const note = await this.findOne(id, userIp);
    return this.notesRepository.delete(note.id);
  }
}
