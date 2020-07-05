import {ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from "class-validator";

@ValidatorConstraint({ name: "ExcludeHost", async: false })
export class ExcludeHostValidator implements ValidatorConstraintInterface {

    validate(url: string, args: ValidationArguments) {
        for(let x in args.constraints){
            if(url.indexOf(args.constraints[x])> -1){
                return false
            }
        }
        return true
    }

    defaultMessage(args: ValidationArguments) { // here you can provide default error message if validation failed
        return "Cannot use the link, its host has been excluded from system";
    }

}