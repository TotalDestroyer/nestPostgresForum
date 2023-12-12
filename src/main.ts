import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from "@nestjs/common";


async function start(){
    const PORT = 5000
    const app =  await NestFactory.create(AppModule)

    const config = new DocumentBuilder()
        .setTitle("Forum api")
        .setDescription("api")
        .setVersion("1.0.0")
        .build()
    app.useGlobalPipes(new ValidationPipe({transform: true}));
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)

    await app.listen(PORT, () => console.log(`server started on port ${PORT}`))
}
start()

//  TODO  auth guards / role guards &&
