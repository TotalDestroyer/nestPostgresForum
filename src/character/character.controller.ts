import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put, UploadedFile,
    UploadedFiles, UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {CharacterService} from "./character.service";
import {CreateCharacterDto} from "./dto/create-character.dto";
import {UpdateCharacterDto} from "./dto/update-character-dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {ApiOkResponse, ApiOperation, ApiParam, ApiProperty, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Character} from "./character.model";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";

@ApiTags("Character")
@Controller('character')
export class CharacterController {
    constructor(private characterService: CharacterService) {}
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @ApiOkResponse({status: 200, type: Character})
    @ApiOperation({summary: "Character creation"})
    @Post("/create")
    create(@Body() dto: CreateCharacterDto){
        return this.characterService.createCharacter(dto)
    }
    @ApiParam({description: 'character name', required: true, type: Number, name: "name"} )
    @ApiOkResponse({status: 200, type: [Character]})
    @ApiOperation({summary: "Get characters by name"})
    @Get("/getByName:name")
    getByName(@Param("name") name: string){
        return this.characterService.getByName(name)
    }
    @ApiParam({description: 'user Id', required: true, type: Number, name: "userId"} )
    @ApiOkResponse({status: HttpStatus.OK, type: Character})
    @ApiOperation({summary: "Get one character by id"})
    @Get("/getById:id")
    getById(@Param("id") id: number){
        return this.characterService.getById(id)
    }
    @ApiOkResponse({status: HttpStatus.OK, type: [Character]})
    @ApiOperation({summary: "Get all characters"})
    @Get("/getAll")
    getAll(@Param("limit") limit, @Param("page") page){
        return this.characterService.getAll(limit, page)
    }
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @ApiOkResponse({status: HttpStatus.OK, type: Character})
    @ApiOperation({summary: "Update some character fields"})
    @Put("/update")
    update(@Body() dto: UpdateCharacterDto){
        return this.characterService.update(dto)
    }
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @ApiParam({description: 'user Id', required: true, type: Number, name: "userId"} )
    @ApiOkResponse({status: HttpStatus.OK, type: Character})
    @ApiOperation({summary: "Upload or change character picture"})
    @Post("/uploadPicture/:id")
    @UseInterceptors(FileInterceptor("image"))
    uploadAvatar(@Param("id") id:number, @UploadedFile() image){
        return this.characterService.uploadPicture(id, image)
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @ApiParam({description: 'character Id', required: true, type: Number, name: "userId"} )
    @ApiOkResponse({status: HttpStatus.OK})
    @ApiOperation({summary: "Delete character"})
    @Delete("/delete/:id")
    delete(@Param("id") id){
        return this.characterService.delete(id)
    }
}
