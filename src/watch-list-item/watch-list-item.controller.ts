import {Body, Controller, Delete, HttpStatus, Param, Post, Put, Query, UseGuards, ValidationPipe} from '@nestjs/common';
import {WatchListItemService} from "./watch-list-item.service";
import {WatchListItemDto} from "./dto/watch-list-item.dto";
import {ApiBody, ApiOperation, ApiParam, ApiProperty, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ChangeStatusDto} from "./dto/change-status.dto";
import {UpdateEpisodesDto} from "./dto/update-episodes.dto";
import {WatchListItem} from "./watch-list-item.model";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@ApiTags("Watch list item")
@Controller('watch-list-item')
export class WatchListItemController {
    constructor(private WatchListItemService: WatchListItemService) {}
    @UseGuards(JwtAuthGuard)
    @ApiResponse({type: WatchListItem})
    @ApiOperation({summary: "Create watch list item (add item to watch list)"})
    @Post()
    create(@Body() dto: WatchListItemDto){
        return this.WatchListItemService.create(dto)
    }
    @UseGuards(JwtAuthGuard)
    @ApiResponse({type: WatchListItem})
    @ApiOperation({summary: "Increment watched episode"})
    @Put("/:id/episodes/increment/:amount")
    incrementEpisodes(@Param() dto: UpdateEpisodesDto){
        return this.WatchListItemService.incrementEpisodes(dto)
    }
    @UseGuards(JwtAuthGuard)
    @ApiResponse({type: WatchListItem})
    @ApiOperation({summary: "Decrement watched episodes"})
    @Put("/:id/episodes/decrement/:amount")
    decrementEpisodes(@Param() dto: UpdateEpisodesDto){
        return this.WatchListItemService.decrementEpisodes(dto)
    }
    @UseGuards(JwtAuthGuard)
    @ApiProperty({description: 'item id', required: true, type: Number, example:1})
    @ApiResponse({status: HttpStatus.OK})
    @ApiOperation({summary: "Remove item form wat list"})
    @Delete("/remove/:id")
    remove(@Param("id") id:number){
        return this.WatchListItemService.remove(id)
    }
    @UseGuards(JwtAuthGuard)
    @ApiResponse({type: WatchListItem})
    @ApiOperation({summary: "Update status of item"})
    @Put("/:id/changeStatus/:newStatus")
    changeStatus(@Param() dto: ChangeStatusDto){
        return this.WatchListItemService.changeStatus(dto)
    }

}
