import { status } from "@grpc/grpc-js";
import { Injectable, PipeTransform } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { ObjectSchema } from "joi";
import { logger } from "src/utils/constants";

@Injectable()
export class JoiValidationPipe implements PipeTransform
{
    constructor(private schema: ObjectSchema) {}

    transform(value: any) {
        const { error } = this.schema.validate(value);

        if(error)
        {
            logger.error(error.name, error.message)
            throw new RpcException({error: "Validation failed",
                message: error.message, 
                code: status.INVALID_ARGUMENT});
        }
        return value;
    }
}