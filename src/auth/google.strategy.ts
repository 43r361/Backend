import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20";

import { UsersService } from "src/users/users.service";

import { EncryptionService } from "./encryption.service";
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
	constructor(
		private readonly configService: ConfigService,
		private readonly usersService: UsersService,
		private readonly encryptionService: EncryptionService
	) {
		super({
			clientID: configService.getOrThrow<string>("GOOGLE_CLIENT_ID"),
			clientSecret: configService.getOrThrow<string>(
				"GOOGLE_CLIENT_SECRET"
			),
			callbackURL: configService.getOrThrow<string>(
				"GOOGLE_CALLBACK_URL"
			),
			scope: [
				"email",
				"profile",
				"https://www.googleapis.com/auth/calendar",
			],
		});
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: Profile,
		done: VerifyCallback
	) {
		const googleId = profile.id;
		const email = profile.emails?.[0].value;

		if (!email) {
			return done(new Error("Email not found in Google profile"));
		}

		const { encrypted, ivHex } =
			this.encryptionService.encrypt(accessToken);

		let existingUser = await this.usersService.findOneByGoogleId(googleId);

		if (!existingUser) {
			const newUser = await this.usersService.create({
				email,
				googleId,
				accessToken: encrypted,
				ivHex,
			});

			return done(null, newUser);
		}

		existingUser = await this.usersService.update(existingUser.id, {
			accessToken: encrypted,
			ivHex,
		});

		// getUserCalendars(accessToken);

		return done(null, existingUser);
	}
}
