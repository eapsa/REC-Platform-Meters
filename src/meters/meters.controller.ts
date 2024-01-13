import { Body, Controller, Query, Req, UsePipes } from '@nestjs/common';
import { matchDate } from 'src/utils/help.functions';
import { JoiValidationPipe } from './dto/joi-validation.pipe';
import { entrySchema, querySchema } from './dto/meters.schema';

import { MeterEntry, MetersServiceController, MetersServiceControllerMethods, QueryMeters } from './meters.pb';
import { MetersService } from './meters.service';

@Controller()
@MetersServiceControllerMethods()
export class MetersController implements MetersServiceController{
    constructor(private readonly metersService: MetersService){}

    @UsePipes(new JoiValidationPipe(entrySchema))
    async addMeasurement(@Body() entry: MeterEntry){
        return this.metersService.addMeasurement(entry);
    }

    @UsePipes(new JoiValidationPipe(querySchema))
    async retrieveMeasurement(@Body() query: QueryMeters){
        query.startInterval = matchDate(query.startInterval)
        return this.metersService.retrieveMeasurement(query);
    }
}
