import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
	constructor(private readonly configService: ConfigService) {
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
		profile: any,
		done: VerifyCallback
	) {
		const user = {
			googleId: profile.id,
			email: profile.emails[0].value,
			name: profile.displayName,
			avatar: profile.photos[0].value,
		};

		return done(null, user);
	}
}
