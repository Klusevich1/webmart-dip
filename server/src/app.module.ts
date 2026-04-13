import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoggerMiddleware } from "./logger.middleware";
import { ServicesModule } from "./modules/services/services.module";
import { QuizModule } from "./modules/quiz/quiz.module";
import { ContactModule } from "./modules/contact/contact.module";
import { ChatModule } from "./modules/chat/chat.module";
import { EmailModule } from "./modules/email/email.module";
import { BlogModule } from "./modules/blog/blog.module";
import { HealthController } from "./health.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE === "postgres" ? "postgres" : "sqlite",
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || "postgres",
      password: process.env.DB_PASSWORD || "password",
      database:
        process.env.DB_TYPE === "postgres"
          ? process.env.DB_DATABASE || "webmart"
          : process.env.DB_DATABASE || "webmart.sqlite",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true, // Enable for Docker environment to auto-create tables
      logging: false, // Отключено: иначе в логах только SQL. Используйте HTTP-логи вместо этого.
    }),
    ServicesModule,
    QuizModule,
    ContactModule,
    ChatModule,
    EmailModule,
    BlogModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
