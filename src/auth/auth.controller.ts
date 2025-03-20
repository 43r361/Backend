import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";

@Controller("auth")
export class AuthController {
	@Get("google")
	@UseGuards(AuthGuard("google"))
	async googleAuth() {
		// Redirects to Google OAuth
	}

	@Get("google/callback")
	@UseGuards(AuthGuard("google"))
	async googleAuthRedirect(@Req() req: Request) {
		return req.user; // Return user data after successful login
	}
}
