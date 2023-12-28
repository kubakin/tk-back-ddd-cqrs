import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { AuthorizationExceptionHandler } from "../lib/authorization/src/authorization.exception-handler";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true
  });
  const rawBodyBuffer = (req, res, buf: Buffer) => {
    if (buf && buf.length) req.rawBody = buf;
  };

  app.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true }));
  app.use(bodyParser.json({ verify: rawBodyBuffer }));

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  app.use(cookieParser());
  // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new AuthorizationExceptionHandler());
  await app.listen(process.env.PORT || 3000);

  console.log(
    `App started on: ${`http://localhost:${
      app.getHttpServer().address().port
    }`}`
  );
}

bootstrap();
