import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./create-role.dto";
import {ApiOkResponse, ApiOperation, ApiProperty, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Role} from "./roles.model";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
@ApiTags("Roles")
@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService) {}
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @ApiResponse({type: Role})
    @ApiOperation({summary: "Create role"})
    @Post()
    create(@Body() dto: CreateRoleDto){
        return this.roleService.createRole(dto)
    }

    @UseGuards(RolesGuard)
    @ApiOkResponse({type: Role})
    @ApiProperty({description: 'role name', required: true, type: String, name: "value"} )
    @ApiOperation({summary: "Get role by name"})
    @Get('/getOne/:value')
    getByValue(@Param("value") value: string) {
        return this.roleService.getRoleByValue(value)
    }
    @ApiOkResponse({type: [Role]})
    @ApiOperation({summary: "Get all role"})
    @Get('/getAll')
    getAll(){
        return this.roleService.getAll()
    }
}
