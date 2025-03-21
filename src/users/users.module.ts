import { Module } from "@nestjs/common";

import { PrismaModule } from "@prisma/prisma.module";

import { EncryptionModule } from "src/encryption/encryption.module";

import { UsersService } from "./users.service";

@Module({
	providers: [UsersService],
	imports: [PrismaModule, EncryptionModule],
	exports: [UsersService],
})
export class UsersModule {}
