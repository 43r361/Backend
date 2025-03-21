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

	/**
	 * The user's access token. (encrypted)
	 */
	@IsString()
	@IsNotEmpty()
	accessToken: string;

	/**
	 * The initialization vector used to encrypt the access token.
	 */
	@IsString()
	@IsNotEmpty()
	ivHex: string;
}
