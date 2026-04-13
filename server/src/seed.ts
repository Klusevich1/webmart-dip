const { NestFactory } = require("@nestjs/core");
const { AppModule } = require("./app.module");
const { ServicesService } = require("./modules/services/services.service");

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const servicesService = app.get(ServicesService);

  try {
    await servicesService.seedData();
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await app.close();
  }
}

seed();
