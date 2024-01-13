import { Status } from '@grpc/grpc-js/build/src/constants';
import { InfluxDB, Point, QueryApi } from '@influxdata/influxdb-client';
import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { MeasurementResponse, MeterEntry, MeterResponse, QueryMeters, QueryResponse } from './meters.pb';
import { logger } from 'src/utils/constants';

@Injectable()
export class MetersService {
  client: InfluxDB;
  queryApi: QueryApi;

  constructor() {
    this.client = new InfluxDB({
      url: 'http://influxdb:8086',
      token: process.env.TOKEN_METER,
    });
    this.queryApi = this.client.getQueryApi('comsolve');
  }

  async addMeasurement({ deviceId, activeImport, activeExport, reactiveInductive, reactiveCapacitive, timestamp }: MeterEntry): Promise<MeterResponse> {
    const writeApi = this.client.getWriteApi('comsolve', "meter", 's');
    console.log(this.client);
    writeApi.useDefaultTags({ device: deviceId });
    const point = new Point('energy')
    .intField('Active import', activeImport)
    .intField('Active export', activeExport)
    .intField('Reactive QI(+Ri)', reactiveInductive)
    .intField('Reactive QIV(-Rc)', reactiveCapacitive)
    .timestamp(timestamp);
    writeApi.writePoint(point);
    await writeApi.close().catch((e) => {
      logger.error("Could not add new measurement", e);
      throw new RpcException({
        code: Status.ABORTED,
        message: "Query not executed. Verify Log"
      })
    })
  
    logger.log("Added new measurement", HttpStatus.CREATED);
    return {
      status: HttpStatus.CREATED,
      error: ["Success: Entry added"],
    };
  }

  async retrieveMeasurement({ deviceId, startInterval, skip = 0, limit = 100 }: QueryMeters) {
    const bucket = "meter"; //process.env.INFLUX_BUCKET_METER
    var latestStatus: QueryResponse = { entries: [] };

    var query = `
        import "timezone"
        option location = timezone.location(name: "Europe/Lisbon")
        from(bucket: "${bucket}") |> range(start: ${startInterval}) |> filter(fn: (r) => r._measurement == "energy"`;

    if (deviceId) {
      query = query.concat(` and r.device == "${deviceId}"`);
    }

    query = query.concat(`) |> limit(n: ${limit}, offset: ${skip}) |> sort(columns: ["_time"], desc: true)  `);
    
    await this.queryApi.collectRows(query, (row, tableMeta) => {
      const o = tableMeta.toObject(row);
      var entry: MeasurementResponse = {
        DeviceId: `${o.device}`,
        Field: `${o._field}`,
        Value: `${o._value}`,
        Date: `${o._time}`,
      };

      latestStatus.entries.push(entry);
    }).catch((error) => {
      logger.error("Could not retrieve measurements", error)
      throw new RpcException({
        code: Status.ABORTED,
        message: "Query not executed. Verify Log"
      })
    });
    
    logger.log(`Retrieved ${limit} measurements and skipped ${skip}`, HttpStatus.OK)
    return latestStatus;
  }
}
