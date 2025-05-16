import { ApiProperty } from '@nestjs/swagger';
import { IsIP, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsIP()
  ip: string;
}
