import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty()
    readonly id: number;

    @ApiProperty()
    readonly firstName: string;

    @ApiProperty()
    readonly lastName: string;

    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly password: string;

    @ApiProperty()
    readonly phone: number;

    @ApiProperty()
    readonly address: string;

    @ApiProperty()
    readonly city: string;

    @ApiProperty()
    readonly country: string;

    @ApiProperty()
    readonly pincode: number;
}