import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards} from '@nestjs/common';
import {TypeService} from "./type.service";
import {CreateTypeDto} from "./dto/create-type.dto";
import {UpdateTypeDto} from "./dto/update-type.dto";
import {ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiProperty, ApiTags} from "@nestjs/swagger";
import {Type} from "./type.model";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";

@ApiTags("Type (type of title)")
@Controller('type')
export class TypeController {
    constructor(private typeService: TypeService) {}

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @ApiOkResponse({type: Type})
    @ApiOperation({summary: "Create type"})
    @Post("/create")
    create(@Body() dto: CreateTypeDto){
        return this.typeService.createType(dto)
    }
    @ApiOkResponse({type: Type})
    @ApiParam({description: 'name', required: true, type: String, name: "name"})
    @ApiOperation({summary: "Get type by name"})
    @Get("/getByName:name")
    getByName(@Param("name") name: string){
        return this.typeService.getByName(name)
    }
    @ApiOkResponse({type: Type})
    @ApiParam({description: 'type id', required: true, type: Number,  name: "id"})
    @ApiOperation({summary: "Get one type by id"})
    @Get("/getById:id")
    getById(@Param("id") id: number){
        return this.typeService.getById(id)
    }
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @ApiOkResponse({type: Type})
    @ApiOperation({summary: "Update some fields in type"})
    @Put("/update")
    update(@Body() dto: UpdateTypeDto){
        return this.typeService.update(dto)
    }
    @ApiOkResponse({type: [Type]})
    @ApiOperation({summary: "Get all types"})
    @Get("/getAll")
    getAll(){
        return this.typeService.getAll()
    }
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @ApiOkResponse({status: HttpStatus.OK})
    @ApiParam({description: 'type id', required: true, type: Number, name: "id"})
    @ApiOperation({summary: "Delete type"})
    @Delete("/delete/:id")
    delete(@Param("id") id){
        return this.typeService.delete(id)
    }
}
