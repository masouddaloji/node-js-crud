import "dotenv/config";

import { defineConfig as ormConfig } from "@prisma/orm-postgres/config";
import { definePrismaConfig } from "prisma/config";
console.log("DATABASE_URL:", process.env["DATABASE_URL"]);
export default definePrismaConfig({
  orm: ormConfig({
    contract: "./prisma/contract.prisma",

    db: {
      connection: process.env["DATABASE_URL"]!,
    },
  }),
});
