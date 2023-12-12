import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards} from '@nestjs/common';
import {GenreService} from "./genre.service";
import {CreateGenreDto} from "./dto/create-genre.dto";
import {UpdateGenreDto} from "./dto/update-genre.dto";
import {ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Genre} from "./genre.model";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
@ApiTags("Genre")
@Controller('genre')
export class GenreController {
    constructor(private genreService: GenreService) {}
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @ApiOkResponse({type: Genre})
    @ApiOperation({summary: "Create genre"})
    @Post("/create")
    create(@Body() dto: CreateGenreDto){
        return this.genreService.createGenre(dto)
    }
    @ApiOkResponse({type: [Genre]})
    @ApiParam({description: 'genre name', required: true, type: String, name: "name"} )
    @ApiOperation({summary: "Find genre's by name"})
    @Get("/getByName:name")
    findByName(@Param("name") name: string){
        return this.genreService.getByName(name)
    }

    @ApiOkResponse({type: Genre})
    @ApiParam({description: 'genre Id', required: true, type: Number, name: "id"} )
    @ApiOperation({summary: "Get genre by id"})
    @Get("/getById:id")
    getById(@Param("id") id: number){
        return this.genreService.getById(id)
    }
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @ApiOkResponse({type: Genre})
    @ApiOperation({summary: "Update some field in genre"})
    @Put("/update")
    update(@Body() dto: UpdateGenreDto){
        return this.genreService.update(dto)
    }
    @ApiOkResponse({type: [Genre]})
    @ApiOperation({summary: "Get all genres that you created"})
    @Get("/getAll")
    getAll(){
        return this.genreService.getAll()
    }
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @ApiOkResponse({status: HttpStatus.OK})
    @ApiParam({description: 'genre Id', required: true, type: Number, name: "id"} )
    @ApiOperation({summary: "Delete some genre"})
    @Delete("/delete/:id")
    delete(@Param("id") id){
        return this.genreService.delete(id)
    }

}
