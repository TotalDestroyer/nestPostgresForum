import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Res, UploadedFile,
    UploadedFiles, UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user-dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {ApiOperation, ApiProperty, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./user.model";
import {BanUserDto} from "./dto/ban-user.dto";
import {AddRoleDto} from "./dto/add-role.dto";
import {ConfigService} from "@nestjs/config";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
@ApiTags("User")
@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
        private configService: ConfigService
    ) {}
    @ApiOperation({summary: "User creation"})
    @ApiResponse({status: 200, type: User})
    @Post()
    create(@Body() userDto: CreateUserDto){
        return this.userService.createUser(userDto)
    }
    @ApiOperation({summary: "Getting all users"})
    @ApiResponse({status: 200, type: [User]})
    @Get("/getAll")
    getAll(@Param("limit") limit, @Param("page") page){
        return this.userService.getAll(limit, page)
    }
    @ApiResponse({status: 200, type: User})
    @ApiProperty({description: 'user id', required: true, type: Number})
    @ApiOperation({summary: "Get one user by id"})
    @Get("/getById/:id")
    getById(@Param('id') id: number){
        return this.userService.getById(id)
    }
    @ApiProperty({description: 'activation link', required: true, type: String})
    @ApiOperation({summary: "Activate user email"})
    @Post("/activation/:activationLink")
    async activate(@Param('activationLink') activationLink, @Res() res){
        await this.userService.activate(activationLink)
        return res.redirect(this.configService.get("frontend_url"))
    }
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @ApiProperty({description: 'user id', required: true, type: Number})
    @ApiOperation({summary: "delete user"})
    @ApiResponse({status: HttpStatus.OK})
    @Delete("/user/delete/:id")
    delete(@Param('id') id: number){
        return this.userService.delete(id)
    }
    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary: "Upload or change user avatar"})
    @ApiProperty({description: 'user id', required: true, type: Number})
    @Post("/uploadAvatar/:userId")
    @UseInterceptors(FileInterceptor("image"))
    uploadAvatar(@Param("userId") userId:number, @UploadedFile() image){
        return this.userService.uploadAvatar(userId, image)
    }
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @ApiOperation({summary: "ban user"})
    @ApiResponse({status: 200, type: BanUserDto})
    @Post("/ban")
    ban(@Body() dto: BanUserDto){
        return this.userService.ban(dto)
    }
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @ApiOperation({summary: "add role"})
    @ApiResponse({status: 200, type: User})
    @Post("/role")
    addRole(@Body() dto: AddRoleDto){
        return this.userService.addRole(dto)
    }
}
