import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
	/**
	 * The user's email address.
	 */
	@IsEmail()
	email: string;

	/**
	 * The user's google account unique identifier.
	 */
	@IsString()
	@IsNotEmpty()
	googleId: string;
}
