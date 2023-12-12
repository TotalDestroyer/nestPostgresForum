import {
    Body,
    Controller, Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put, Query, UploadedFile, UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {TitleService} from "./title.service";
import {TitleCreateDto} from "./dto/title-create-dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Title} from "./title.model";
import {SearchTitleDto} from "./dto/search-title.dto"
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
@ApiTags("Title")
@Controller('title')
export class TitleController {
    constructor(private titleService: TitleService) {}
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @ApiOkResponse({type: Title})
    @ApiOperation({summary: "Create title"})
    @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Title})
    @Post("/create")
    create(@Body() titleDto: TitleCreateDto){
       return  this.titleService.create(titleDto)
    }
    @ApiOkResponse({type: [Title]})
    @ApiOperation({summary: "Get all titles"})
    @Get("/getAll")
    getAll(@Param("limit") limit, @Param("page") page){
        return this.titleService.getAll(limit, page)
    }
    @ApiOkResponse({type: Title})
    @ApiParam({description: 'title Id', required: true, type: String, name: "titleId"} )
    @ApiOperation({summary: "Get one title by id"})
    @Get("/getById/:titleId")
    getById(@Param("titleId") titleId: number){
        return this.titleService.getById(titleId)
    }
    @ApiOkResponse({type: [Title]})
    @ApiOperation({summary: "search titles"})
    @Get("/search/config/:limit?/:genres?/:types?/:name?")
    search(@Query() dto: SearchTitleDto){
        return this.titleService.search(dto)
    }
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @ApiParam({type: Number, name: "id", example: 1, description: "title id"})
    @ApiOperation({summary: "Change or upload title poster"})
    @Put("/changePoster/:titleId")
    @UseInterceptors(FileInterceptor("image"))
    changePoster(@Param("titleId") titleId:number, @UploadedFile() poster){
       return  this.titleService.changePoster(titleId, poster)
    }
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @ApiOperation({summary: "Delete title"})
    @ApiParam({type: Number, name: "id", example: 1, description: "title id"})
    @ApiOkResponse({status: HttpStatus.OK})
    @Delete("/delete/:id")
    delete(@Param() id: number){
       return  this.titleService.delete(id)
    }
}
