import { User } from "@prisma/client";
import { Exclude } from "class-transformer";

export class UserEntity implements User {
	/**
	 * The user's unique identifier.
	 */
	id: string;

	/**
	 * The user's email address.
	 */
	email: string;

	/**
	 * The user's google account unique identifier.
	 */
	googleId: string;

	/**
	 * The user's access token. (encrypted)
	 */
	@Exclude()
	accessToken: string;

	/**
	 * The initialization vector used to encrypt the access token.
	 */
	@Exclude()
	ivHex: string;
}
