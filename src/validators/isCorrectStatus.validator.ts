import {Injectable, BadRequestException } from '@nestjs/common';
import {ValidationArguments, ValidatorConstraintInterface} from "class-validator";



@Injectable()
export class IsCorrectStatusValidator implements ValidatorConstraintInterface {
    validate(value: any, args:ValidationArguments) {
        let allowedItems =  ["planned",  "watching",  "rewatching", "completed", "onHold", "dropped"]
        if (!allowedItems.includes(value)) {
            throw new BadRequestException(`Invalid parameter. Value must be one of: ${allowedItems.join(', ')}`);
        }
        return value;
    }

    defaultMessage(args: ValidationArguments) {
        return `Invalid parameter. Value must be one of:}`;
    }
}
