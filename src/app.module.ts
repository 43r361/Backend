import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AuthModule } from "./auth/auth.module";
import { EncryptionModule } from "./encryption/encryption.module";
import { UsersModule } from "./users/users.module";
import { EventModule } from "./event/event.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		UsersModule,
		AuthModule,
		EventModule,
		EncryptionModule,
	],
})
export class AppModule {}
