import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './userDTO.DTO';

@Controller('user')
export class UserController {

    constructor (private userService: UserService){}

    @Get()
    showAll(){
        return this.userService.findAll()
    }

    @Get(':id')
    showOne(@Param('id') id: number){
        return this.userService.findById(id)
    }

    @Put(':id')
    modifyUser(@Param('id') id: number, @Body() userdata: CreateUserDto){
        return this.userService.update(id, userdata)
    }

    @Delete(':id')
    removeUser(@Param('id') id: number){
        return this.userService.delete(id)
    }


}
