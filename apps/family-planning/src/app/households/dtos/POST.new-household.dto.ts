import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class POSTNewHouseholdDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  householdName: string;
}
