import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

interface EncryptionResult {
	encrypted: string;
	ivHex: string;
}

@Injectable()
export class EncryptionService {
	encryptionAlgorithm = "aes-256-cbc";
	encryptionKey: string;

	constructor(private readonly configService: ConfigService) {
		this.encryptionKey = this.configService.getOrThrow<string>(
			"ACCESS_TOKEN_ENCRYPTION_KEY"
		);
	}

	generateIv() {
		return randomBytes(16);
	}

	encrypt(text: string): EncryptionResult {
		const iv = this.generateIv();

		const cipher = createCipheriv(
			this.encryptionAlgorithm,
			Buffer.from(this.encryptionKey, "hex"),
			iv
		);

		let encrypted = cipher.update(text, "utf8", "hex");

		encrypted += cipher.final("hex");

		return { encrypted, ivHex: iv.toString("hex") };
	}

	decrypt({ encrypted, ivHex }: EncryptionResult) {
		const decipher = createDecipheriv(
			this.encryptionAlgorithm,
			Buffer.from(this.encryptionKey, "hex"),
			Buffer.from(ivHex, "hex")
		);

		let decrypted = decipher.update(encrypted, "hex", "utf8");

		decrypted += decipher.final("utf8");

		return decrypted;
	}
}
