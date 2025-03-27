import { IsHexColor, IsNotEmpty, IsString } from 'class-validator';

export class CreateLabelDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsHexColor()
  hex_code: string;
}
