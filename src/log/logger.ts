import { LoggerService } from '@nestjs/common';

export class MetersLogger implements LoggerService {
  private name: string;
  private writer;
  /**
   * Write a 'log' level log.
   */

  constructor(name: string){
    this.name = name
    let fs = require('fs')
    if(!fs.existsSync('../log')) fs.mkdirSync('../log')
    this.writer = fs.createWriteStream('../log/Meter_'+new Date().toISOString()+'.txt') 
    var data = "[" + this.name + "] "+ new Date().toLocaleString()+" -> \t"+"Microservice Started...\n"
    this.writer.write(data)
  }
  
  log(message: any, ...optionalParams: any[]) {
    console.log(message);
    var data = "[" + this.name + "] "+ new Date().toLocaleString()+" -> \t"+  optionalParams[0] + "\t" + message+"\n"
    this.writer.write(data);
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    console.error(message);
    var data = "[" + this.name + "] "+ new Date().toLocaleString()+" -> \t"+ optionalParams[0] + "\t" + message+"\n"
    this.writer.write(data);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {}

  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...optionalParams: any[]) {}

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: any, ...optionalParams: any[]) {}
}