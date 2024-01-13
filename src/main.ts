import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { protobufPackage } from './meters/meters.pb';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: 'meters:5051',
      //protoPath: 'node_modules/grpc-protos/proto/meters.proto',
      protoPath: 'src/proto/meters.proto',
      package: protobufPackage,
    },
  });

  await app.listen();
}
bootstrap();
