import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { CalendarsModule } from "src/calendars/calendars.module";
import { UsersModule } from "src/users/users.module";

import { AuthController } from "./auth.controller";
import { GoogleStrategy } from "./google.strategy";

@Module({
	imports: [ConfigModule, UsersModule, CalendarsModule],
	controllers: [AuthController],
	providers: [GoogleStrategy],
})
export class AuthModule {}
