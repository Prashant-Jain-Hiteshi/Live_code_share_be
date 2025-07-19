import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { File } from './file.model';
import { CreateFileDto } from '../files/dto/create-file.dto.js';
import { UpdateFileDto } from '../files/dto/update-file.dto.js';

@Injectable()
export class FilesService {
  constructor(@InjectModel(File) private readonly fileModel: typeof File) {}

  async createFile(dto: CreateFileDto, ownerId: number): Promise<File> {
    return this.fileModel.create({ ...dto, owner_id: ownerId });
  }

  async getFileById(id: number): Promise<File> {
    const file = await this.fileModel.findByPk(id);
    if (!file) throw new NotFoundException('File not found');
    return file;
  }

  async updateFile(id: number, dto: UpdateFileDto): Promise<File> {
    const file = await this.getFileById(id);
    return file.update(dto);
  }

  async deleteFile(id: number): Promise<void> {
    const file = await this.getFileById(id);
    await file.destroy();
  }
}
