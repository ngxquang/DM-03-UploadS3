import { UploadService } from './../upload/upload.service';
import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    Body,
    Get,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { UserService } from './user.service';
  
  @Controller('users')
  export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async findAll() {
        // Lấy danh sách người dùng từ UserService
        return await this.userService.findAll();
    }
  
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFileAndCreateUser(
        @UploadedFile() file: Express.Multer.File,
        @Body('name') name: string,
    ) {
        const user = await this.userService.createUserWithImage(name, file);
        return user;
    }
}
  