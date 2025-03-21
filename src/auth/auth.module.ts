import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { UsersModule } from "src/users/users.module";

import { AuthController } from "./auth.controller";
import { EncryptionService } from "./encryption.service";
import { GoogleStrategy } from "./google.strategy";

@Module({
	imports: [ConfigModule, UsersModule],
	controllers: [AuthController],
	providers: [GoogleStrategy, EncryptionService],
})
export class AuthModule {}
