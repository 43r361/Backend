import { Injectable } from "@nestjs/common";

import { PrismaService } from "@prisma/prisma.service";

import { CreateUserDto } from "./dto/requests/create-user.dto";
import { UpdateUserDto } from "./dto/requests/update-user.dto";

import { EncryptionService } from "src/encryption/encryption.service";

@Injectable()
export class UsersService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly encryptionService: EncryptionService
	) {}

	async create(createUserDto: CreateUserDto) {
		const { encrypted, ivHex } = this.encryptionService.encrypt(
			createUserDto.accessToken
		);

		return this.prisma.user.create({
			data: { ...createUserDto, accessToken: encrypted, ivHex },
		});
	}

	async findOne(id: string) {
		return this.prisma.user.findUnique({ where: { id } });
	}

	async findOneByGoogleId(googleId: string) {
		return this.prisma.user.findUnique({ where: { googleId } });
	}

	async update(id: string, updateUserDto: UpdateUserDto) {
		if (!updateUserDto.accessToken) {
			return this.prisma.user.update({
				where: { id },
				data: updateUserDto,
			});
		}

		const { encrypted, ivHex } = this.encryptionService.encrypt(
			updateUserDto.accessToken
		);

		return this.prisma.user.update({
			where: { id },
			data: {
				...updateUserDto,
				accessToken: encrypted,
				ivHex,
			},
		});
	}

	async remove(id: string) {
		return this.prisma.user.delete({ where: { id } });
	}
}
