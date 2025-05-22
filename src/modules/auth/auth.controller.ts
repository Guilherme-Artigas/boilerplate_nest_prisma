import { AuthService } from '@modules/auth/auth.service';
import { IsPublic } from '@modules/auth/decorators/is-public.decorator';
import { LoginUserDto } from '@modules/auth/dto/login-user.dto';
import { ResponseLoginDto } from '@modules/auth/dto/response-login.dto';
import { LocalAuthGuard } from '@modules/auth/guards/local-auth.guard';
import type { AuthRequest } from '@modules/auth/models/AuthRequest';
import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Autenticação')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')
  @ApiOperation({ summary: 'Rota para login de usuários.' })
  @ApiBody({ type: LoginUserDto })
  @ApiOkResponse({ type: ResponseLoginDto })
  @HttpCode(HttpStatus.OK)
  @ApiBadRequestResponse({ description: 'Requisição inválida.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: AuthRequest) {
    const { user } = req;

    return this.authService.login(user);
  }
}
