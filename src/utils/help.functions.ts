import { Status } from '@grpc/grpc-js/build/src/constants';
import { RpcException } from '@nestjs/microservices';
import { logger } from './constants';

export function matchDate(value: string) 
{
    const dateRegex = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/
    
    if(value === undefined) return "0"
   
    const asNum = Number(value);

    if(asNum === 0) return "0"
    else if(!Number.isNaN(asNum) && Number.isInteger(asNum) && asNum > 0) return "-" + value + "m";
    else if(dateRegex.test(value)) 
    {
        const date = new Date(value);
        const today = new Date();
        if(date.getTime() > today.getTime())
        {
            logger.error("Date is bigger than today\'s date", value)
            throw new RpcException({code: Status.FAILED_PRECONDITION, message: "Query not executed. Verify Log"})
        } 
        return value;
    }
    else
    {
        logger.error("Invalid start interval", value)
        throw new RpcException({code: Status.FAILED_PRECONDITION, message: "Query not executed. Verify Log"})
    } 
}
