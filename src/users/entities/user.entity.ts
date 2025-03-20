import { User } from "@prisma/client";

export class UserEntity implements User {
	/**
	 * The user's unique identifier.
	 */
	id: string;

	/**
	 * The user's email address.
	 */
	email: string;
}
