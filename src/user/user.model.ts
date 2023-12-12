import {BelongsToMany, Column, HasMany, HasOne, Model, Table} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {WatchList} from "../watch-list/watch-list.model";
import {Comments} from "../comments/models/comments.model";
import {Rating} from "../rating/rating.model";
import {Favorites} from "../favorites/models/favorites.model";
import {ApiProperty} from "@nestjs/swagger";

interface UserCreationAttrs {
    email: string;
    password: string;
    nickname: string;
    dateOfBirth: Date | null;
    activationLink: string;
}

@Table({tableName: 'Users'})
export class User extends Model<User, UserCreationAttrs>{

    @ApiProperty({example: "1", description: "Uniq id"})
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: "Fluffy cat", description: "User nickname"})
    @Column({type: DataTypes.STRING, unique: true, allowNull: false})
    nickname: string;

    @ApiProperty({example: "no-avatar.png", description: "User avatar"})
    @Column({type: DataTypes.STRING, defaultValue: "no-avatar.png"})
    avatar: string;

    @ApiProperty({example: "mail@gmail.com", description: "User email"})
    @Column({type: DataTypes.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: "123125321", description: "User password"})
    @Column({type: DataTypes.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: true, description: "Is user banned"})
    @Column({type: DataTypes.BOOLEAN, defaultValue: false})
    banned: boolean;

    @ApiProperty({example: "spamming", description: "Why user banned"})
    @Column({type: DataTypes.STRING, allowNull: true})
    bandReason: string;

    @ApiProperty({example: "some uuid.v4 string", description: "user email activation link token"})
    @Column({type: DataTypes.STRING})
    activationLink: string;

    @ApiProperty({example: "is user confirmed email", description: "User password"})
    @Column({type: DataTypes.BOOLEAN, defaultValue: false})
    isActivated: boolean;

    @ApiProperty({example: "2016-02-01", description: "user brith date"})
    @Column({type: DataTypes.DATE, allowNull: true})
    dateOfBirth: Date = new Date('2023-11-22');

    @ApiProperty({example: "some uuid.v4 string", description: "user change password token"})
    @Column({type: DataTypes.STRING, allowNull: true})
    changePasswordToken: string;

    @ApiProperty({example: "123125321", description: "User pending password"})
    @Column({type: DataTypes.STRING, allowNull: true})
    pendingPassword: string;

    @ApiProperty({example: "some uuid.v4 string", description: "user change email token"})
    @Column({type: DataTypes.STRING, allowNull: true})
    changeEmailToken: string;

    @ApiProperty({example: "newEmail@mail.com", description: "User pending email"})
    @Column({type: DataTypes.STRING, allowNull: true})
    pendingEmail: string;

    @ApiProperty({type: ()=>  [Role], description: "User roles"})
    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

    @ApiProperty({type: () => WatchList, description: "User watch list"})
    @HasOne(() => WatchList)
    watchList: WatchList;

    @ApiProperty({type: () => [Comments], description: "User comments"})
    @HasMany(() => Comments)
    comments: [];

    @ApiProperty({type: () => [Rating], description: "User rates"})
    @HasMany(() => Rating)
    userRates: Rating[];

    @ApiProperty({type: Favorites, description: "User favorites"})
    @HasOne(() => Favorites)
    favorites: Favorites;
}