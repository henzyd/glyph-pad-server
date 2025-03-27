import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateLabelDto } from './dto/update-label.dto';
import { Label } from './entities/label.entity';
import { CreateLabelDto } from './dto/create-label.dto';

@Injectable()
export class LabelsService {
  constructor(
    @InjectRepository(Label)
    private labelsRepository: Repository<Label>,
  ) {}

  create(labelDto: CreateLabelDto): Promise<Label> {
    const label = this.labelsRepository.create(labelDto);
    return this.labelsRepository.save(label);
  }

  findAll() {
    return this.labelsRepository.find();
  }

  async findOne(id: string) {
    const label = await this.labelsRepository.findOneBy({ id });
    if (!label) throw new NotFoundException(`Label not found`);
    return label;
  }

  async update(id: string, labelDto: UpdateLabelDto) {
    const label = await this.findOne(id);
    return this.labelsRepository.save({ ...label, ...labelDto });
  }

  async remove(id: string) {
    const label = await this.findOne(id);
    return this.labelsRepository.delete(label.id);
  }
}
