import {Controller, Delete, Get, Param, Put} from '@nestjs/common';
import {FavoritesService} from "./favorites.service";
import {ApiOkResponse, ApiOperation, ApiParam, ApiProperty, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Favorites} from "./models/favorites.model";
@ApiTags("Favorites")
@Controller('favorites')
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) {}
    @ApiParam({description: 'user Id', required: true, type: Number, name: "userId"} )
    @ApiOperation({summary: "Get user favorites"})
    @ApiOkResponse({type: Favorites})
    @Get("/:userId")
    getByUserId(@Param("userId") userId){
        return this.favoritesService.getByUserId(userId)
    }
    @ApiParam({description: 'title id', required: true, type: Number, name: "titleId"} )
    @ApiParam({description: 'user Id', required: true, type: Number, name: "userId"} )
    @ApiOperation({summary: "Add favorite title"})
    @ApiOkResponse({type: Favorites})
    @Put("/:uerId/addTitle/:titleId")
    addFavoriteTitle(@Param("userId") userId, @Param("titleId") titleId){
        return this.favoritesService.addFavoriteTitle(userId, titleId)
    }
    @ApiParam({description: 'character id', required: true, type: Number, name: "characterId"} )
    @ApiParam({description: 'user Id', required: true, type: Number, name: "userId"} )
    @ApiOperation({summary: "Add favorite character"})
    @ApiOkResponse({type: Favorites})
    @Put("/:uerId/addCharacter/:characterId")
    addFavoriteCharacter(@Param("userId") userId,  @Param("characterId") characterId){
        return this.favoritesService.addFavoriteCharacter(userId, characterId)
    }

    @ApiParam({description: 'title id', required: true, type: Number, name: "titleId"} )
    @ApiParam({description: 'user Id', required: true, type: Number, name: "userId"} )
    @ApiOperation({summary: "Remove favorite title from list"})
    @ApiOkResponse({type: Favorites})
    @Delete("/:uerId/removeTitle/:titleId")
    removeFavoriteTitle(@Param("userId") userId,  @Param("titleId") titleId){
        return this.favoritesService.removeFavoriteTitle(userId, titleId)
    }

    @ApiParam({description: 'character id', required: true, type: Number, name: "characterId"} )
    @ApiParam({description: 'user Id', required: true, type: Number, name: "userId"} )
    @ApiOperation({summary: "Remove favorite character from list"})
    @ApiOkResponse({type: Favorites})
    @Delete("/:uerId/removeCharacter/:characterId")
    removeFavoriteCharacter(@Param("userId") userId, @Param("characterId") characterId){
        return this.favoritesService.removeFavoriteCharacter(userId, characterId)
    }
}
