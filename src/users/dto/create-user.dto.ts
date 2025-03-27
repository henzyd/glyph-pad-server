import { IsIP, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsIP()
  ip: string;
}
