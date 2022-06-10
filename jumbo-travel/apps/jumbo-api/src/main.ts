import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from "@nestjs/swagger";
import * as path from 'path';
import { log } from 'console';

async function bootstrap() {
  //ssl

  const fs = require('fs');

  const ssl = 'true';
  let httpsOptions = null;
  if (ssl) {
    const keyPath =  '/assets/certs/local-key.pem';
    const certPath = '/assets/certs/local-cert.pem' || '';
    const keyFile  = fs.readFileSync(__dirname + keyPath);
    const certFile = fs.readFileSync(__dirname + certPath);

    httpsOptions = {
      key: keyFile,
      cert: certFile,
    };
  }
  const app = await NestFactory.create(AppModule, {httpsOptions});

  // app config
  const globalPrefix = 'api/v1';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Jumbo Api')
    .setDescription('Overview of Jumbo Api')
    .setVersion('1.0')
    .addTag('jumbo')
    .addBearerAuth()
    .build();
  const options: SwaggerDocumentOptions =  {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  const port = '7500' ;
  const hostname = 'localhost';

  await app.listen(port, hostname, () => {
    const address =
      'http' + (ssl ? 's' : '') + '://' + hostname + ':' + port + '/';
    Logger.log('Listening at ' + address);
  });

  Logger.log(
    `🚀 Application is running on: https://${hostname}${port}/${globalPrefix}`
  );
}

bootstrap();

