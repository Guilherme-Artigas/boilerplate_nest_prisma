import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { NoAuthService } from './no-auth.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import ForgotDto from './dto/ForgotDto';
import { ResponseForgotDto } from './dto/ResponseForgotDto';
import { VerifyCodeDto } from './dto/VerifyCodeDto';
import { ResponseVerifyCodeDto } from './dto/ResponseVerifyCodeDto';
import { ResetPasswordDto } from './dto/ResetPasswordDto';
import { ResponseResetDto } from './dto/ResponseResetDto';
import { NewContactDto } from '../mail/dto/NewContactDto';
import { ResponseContactUsDto } from './dto/ResponseContactUsDto';
import { TextQueriesDto } from './dto/TextQueriesDto';
import { ResponseTextDto } from './dto/ResponseTextDto';
import { ResponseAllUserDto } from '../admin/settings-admin/dto/ResponseAllUserDto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '@prisma/client';

@Controller()
export class NoAuthController {
  constructor(private readonly noAuthService: NoAuthService) {}

  @IsPublic()
  @Post('no-auth/forgot')
  @ApiTags('Sem autenticação')
  @ApiOperation({ summary: 'Rota para envio de código ao email.' })
  @ApiBody({ type: ForgotDto })
  @ApiOkResponse({ status: 200, type: ResponseForgotDto })
  @ApiBadRequestResponse({ description: 'Requisição inválida' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  async forgot(@Body() body: ForgotDto): Promise<ResponseForgotDto> {
    const { email } = body;
    await this.noAuthService.forgot(email);
    return { message: 'Email enviado com sucesso!' };
  }

  @IsPublic()
  @Post('no-auth/verify-code')
  @ApiTags('Sem autenticação')
  @ApiOperation({
    summary:
      'Rota para verificação do código (somente para mobile, web não precisa consumir essa rota!).',
  })
  @ApiBody({ type: VerifyCodeDto })
  @ApiOkResponse({ status: 200, type: ResponseVerifyCodeDto })
  @ApiBadRequestResponse({ description: 'Requisição inválida' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  async verifyCode(@Body() body: VerifyCodeDto): Promise<ResponseVerifyCodeDto> {
    const { code } = body;
    await this.noAuthService.verifyCode(code);
    return { message: 'Código verificado com sucesso!' };
  }

  @IsPublic()
  @Post('no-auth/reset')
  @ApiTags('Sem autenticação')
  @ApiOperation({ summary: 'Rota para redefinir senha.' })
  @ApiBody({ type: ResetPasswordDto })
  @ApiOkResponse({ status: 200, type: ResponseResetDto })
  @ApiBadRequestResponse({ description: 'Requisição inválida' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  async reset(@Body() body: ResetPasswordDto): Promise<ResponseResetDto> {
    await this.noAuthService.reset(body);
    return { message: 'Senha resetada com sucesso.' };
  }

  @IsPublic()
  @Post('no-auth/contact-us')
  @ApiTags('Sem autenticação')
  @ApiOperation({ summary: 'Rota para fale conosco.' })
  @ApiBody({ type: NewContactDto })
  @ApiOkResponse({ status: 200, type: ResponseContactUsDto })
  @ApiBadRequestResponse({ description: 'Requisição inválida' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  async contactUs(@Body() body: NewContactDto): Promise<ResponseContactUsDto> {
    await this.noAuthService.contactUs(body);
    return { message: 'Contato enviado com sucesso, em breve retornaremos.' };
  }

  @IsPublic()
  @Get('no-auth/texts')
  @ApiTags('Sem autenticação')
  @ApiOperation({ summary: 'Rota para recuperar textos.' })
  @ApiOkResponse({ status: 200, type: ResponseTextDto })
  @ApiBadRequestResponse({ description: 'Requisição inválida' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  texts(@Query() query: TextQueriesDto): Promise<ResponseTextDto> {
    return this.noAuthService.texts(query);
  }

  @IsPublic()
  @ApiTags('Sem autenticação')
  @ApiOperation({ summary: 'Rota para listar todos os usuários (durante desenvolvimento).' })
  @ApiOkResponse({ status: 200, type: [ResponseAllUserDto] })
  @Get('no-auth/users')
  users() {
    return this.noAuthService.users();
  }

  @IsPublic()
  @Get('no-auth/health-check')
  @ApiTags('Sem autenticação')
  @ApiOperation({ summary: 'Rota para verificar status do servidor.' })
  @ApiOkResponse({ status: 200, description: 'Servidor UP' })
  healthCheck() {
    return { message: 'Servidor UP' };
  }

  @Get('my-self')
  @ApiTags('My Self')
  @ApiOperation({
    summary: 'Rota para recuperar informações do usuário.',
    security: [{ bearerAuth: [] }],
  })
  @ApiOkResponse({ status: 200, type: ResponseAllUserDto })
  @ApiBadRequestResponse({ description: 'Requisição inválida' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  mySelf(@CurrentUser() user: User) {
    return this.noAuthService.mySelf(user.id);
  }
}
