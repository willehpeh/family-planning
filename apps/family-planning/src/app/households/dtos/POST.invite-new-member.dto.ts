import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class POSTInviteNewMemberDto {
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
