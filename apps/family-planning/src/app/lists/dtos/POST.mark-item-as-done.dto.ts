import { IsNotEmpty, IsString } from 'class-validator';

export class POSTMarkItemAsDoneDto {
  @IsString()
  @IsNotEmpty()
  itemId: string;
}
