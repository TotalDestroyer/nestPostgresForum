import {Controller, Get, Param} from '@nestjs/common';
import {WatchListService} from "./watch-list.service";
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {WatchList} from "./watch-list.model";
@ApiTags("Watch list")
@Controller('watch-list')
export class WatchListController {
    constructor(private watchListService: WatchListService) {}
    @ApiOkResponse({type: WatchList})
    @ApiOperation({summary: "Get full watch list by user id"})
    @Get("/getByUserId/:userId")
    getByUserId(@Param("userId") userId: number){
        return this.watchListService.getByUserId(userId)
    }
}
