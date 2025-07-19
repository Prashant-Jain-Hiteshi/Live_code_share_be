import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Req,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { JwtAuthGuard } from 'src/common/jwtauthguard/authguard';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';

@Controller('files')
@UseGuards(JwtAuthGuard)
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  async createFile(@Body() dto: CreateFileDto, @Req() req: RequestWithUser) {
    const userId = req.user.userId; // from JWT
    return this.filesService.createFile(dto, userId);
  }

  @Get(':id')
  async getFile(@Param('id') id: string) {
    return this.filesService.getFileById(+id);
  }

  @Put(':id')
  async updateFile(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFileDto,
  ) {
    return this.filesService.updateFile(id, dto);
  }

  @Delete(':id')
  async deleteFile(@Param('id') id: string) {
    return this.filesService.deleteFile(+id);
  }
}
