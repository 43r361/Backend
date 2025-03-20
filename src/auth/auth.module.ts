import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { PrismaModule } from "@prisma/prisma.module";

import { UsersModule } from "src/users/users.module";

import { AuthController } from "./auth.controller";
import { GoogleStrategy } from "./google.strategy";

@Module({
	imports: [ConfigModule, UsersModule],
	controllers: [AuthController],
	providers: [GoogleStrategy],
})
export class AuthModule {}
