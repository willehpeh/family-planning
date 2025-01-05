import { IsNotEmpty, IsString } from 'class-validator';

export class POSTMarkDoneItemAsPendingDto {
  @IsString()
  @IsNotEmpty()
  itemId: string;
}
