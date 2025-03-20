import { IsEmail } from "class-validator";

export class CreateUserDto {
	/**
	 * The user's email address.
	 */
	@IsEmail()
	email: string;
}
