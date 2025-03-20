import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20";

import { UsersService } from "src/users/users.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
	constructor(
		private readonly configService: ConfigService,
		private readonly usersService: UsersService
	) {
		super({
			clientID: configService.getOrThrow<string>("GOOGLE_CLIENT_ID"),
			clientSecret: configService.getOrThrow<string>(
				"GOOGLE_CLIENT_SECRET"
			),
			callbackURL: configService.getOrThrow<string>(
				"GOOGLE_CALLBACK_URL"
			),
			scope: ["email", "profile"],
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

		const existingUser =
			await this.usersService.findOneByGoogleId(googleId);

		if (!existingUser) {
			const newUser = await this.usersService.create({
				email,
				googleId,
			});

			return done(null, newUser);
		}

		return done(null, existingUser);
	}
}
