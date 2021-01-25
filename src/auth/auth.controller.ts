import {
  Controller, UseGuards,
  HttpStatus, Response,
   Get, Post,
  Body, Put, Param, Delete, Req, Res,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/userDTO.dto';
//   import { debug } from 'util';
import { LoginUserDto } from './loginUserDTO.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';
import { debug } from 'console';
import * as bcrypt from 'bcrypt';
import {Request} from 'express';
import { Session } from '@nestjs/common';
import {Cookies} from './cookie.decorator';
import * as cookieParser from 'cookie-parser';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UserService,
  ) { }

  @Post('register')
  public async register(@Response() res, @Body() createUserDto: CreateUserDto) {
    const result = await this.authService.register(createUserDto);
    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    return res.status(HttpStatus.OK).json(result);
  }

  // @UseGuards(AuthGuard('local'))
  @Post('login')
  public async login(@Response() res, @Body() login: LoginUserDto) {

    const user = await this.usersService.findByEmail(login.email);
    if (!user) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'User Not Found',
      });
    } else {
      const ismatching = await bcrypt.compare(login.password, user.password);
      if (ismatching) {
        console.log("ismatching ...", ismatching);

        // function setJWTFn(req, res, next) {
          //create JWT
          const token = this.authService.createToken(user);
          // res.cookie('jwtToken', token);
          // res.session.user = user;
          // next();
          return res.status(HttpStatus.OK).json(token);
      //  }    
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Password is not matching',
        });
      }
    }

  }


  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    const { password, ...data } = req.user;
    return data;
  }

  // Session call
  @Get()
// findAll(@Req() request: Request) {
  findAll(@Session() session: Record<string, any>){
  session.visits =session.visits ? session.visits + 1 : 1;
  console.log('welcome to session');
}

//Cookie call
@Get('/cookief')
findAllCok(@Req() request: Request) {
  console.log(request.cookies); // or "request.cookies['cookieKey']"
  console.log(request.signedCookies);
}

// @Get()
// findAllCooki(@Res({ passthrough: true }) response: Response) {
//   response.cookie('key', 'value')
// }

@Get('/cok')
findAllCok1(@Cookies('name') name: string) {
  console.log ('welcom in cookie')
}

}