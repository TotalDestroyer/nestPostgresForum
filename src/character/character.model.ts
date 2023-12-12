import {BelongsToMany, Column, ForeignKey, Model, Table} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import {Title} from "../title/title.model";
import {TitleCharacters} from "./title-characters";
import {User} from "../user/user.model";
import {Favorites} from "../favorites/models/favorites.model";
import {FavoritesCharacter} from "../favorites/models/favorites-character.model";
import {ApiProperty} from "@nestjs/swagger";

interface CharacterCreationAttrs {
    picture: string;
    name: string;
    description: string;
    other_names: string[];
}

@Table({tableName: 'Characters'})
export class Character extends Model<Character, CharacterCreationAttrs>{

    @ApiProperty({example: 1, description: "uniq id"})
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: "Alucard", description: "name of character"})
    @Column({type: DataTypes.STRING, unique: false, allowNull: false})
    name: string;

    @ApiProperty({example: "no-img.png", description: "picture"})
    @Column({type: DataTypes.STRING, allowNull: true, defaultValue: "no-img.png"})
    picture: string;

    @ApiProperty({example: "Alucard is a vampire and main protagonist of the Hellsing ...", description: "description of character"})
    @Column({type: DataTypes.TEXT, allowNull: true})
    description: string;

    @ApiProperty({example: ["アーカード", "Kyuuketsuki Aakaado"], description: "other names of character"})
    @Column({type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true})
    otherNames: string[];

    @BelongsToMany(() => Title, () => TitleCharacters)
    titles: Title[]

    @BelongsToMany(() => Character, () => FavoritesCharacter)
    inFavorites: User[];

}