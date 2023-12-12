import {forwardRef, Module} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Comments} from "./models/comments.model";
import {Like} from "./models/like.model";
import {Dislike} from "./models/dislike.model";
import {AuthModule} from "../auth/auth.module";

@Module({
  providers: [CommentsService],
  controllers: [CommentsController],
  imports: [
    SequelizeModule.forFeature([Comments]),
    SequelizeModule.forFeature([Like]),
    SequelizeModule.forFeature([Dislike]),
    forwardRef(() => AuthModule)

  ]
})
export class CommentsModule {}
