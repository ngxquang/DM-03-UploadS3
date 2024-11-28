import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadService } from '../upload/upload.service';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    
    private readonly uploadService: UploadService,
  ) {}


  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async createUserWithImage(name: string, file: Express.Multer.File): Promise<User> {
    const imageUrl = await this.uploadService.uploadFile(file);
    const user = this.userRepository.create({ name, image: imageUrl });
    return this.userRepository.save(user);
  }
}
