import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  private getClientIp(req: Request): string {
    const xForwardedFor = req.headers['x-forwarded-for'];

    if (xForwardedFor) {
      return Array.isArray(xForwardedFor)
        ? xForwardedFor[0]
        : xForwardedFor.split(',')[0].trim();
    }

    return req.ip;
  }

  @Post()
  create(@Body() createNoteDto: CreateNoteDto, @Req() request: Request) {
    const userIp = this.getClientIp(request);
    return this.notesService.create({ ...createNoteDto, userIp });
  }

  @Get()
  findAll(@Req() request: Request) {
    const userIp = this.getClientIp(request);
    return this.notesService.findAll(userIp);
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Req() request: Request,
  ) {
    const userIp = this.getClientIp(request);
    return this.notesService.findOne(id, userIp);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @Req() request: Request,
  ) {
    const userIp = this.getClientIp(request);
    return this.notesService.update(id, updateNoteDto, userIp);
  }

  @Delete(':id')
  remove(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Req() request: Request,
  ) {
    const userIp = this.getClientIp(request);
    return this.notesService.remove(id, userIp);
  }
}
