#!/usr/bin/env -S node
import type { Contract as End } from "../../snapshots/2372fb00d5cdfc3cc021d97c8c977437c77090de7baaa95a9f5265e313406b4b/contract";
import endContract from "../../snapshots/2372fb00d5cdfc3cc021d97c8c977437c77090de7baaa95a9f5265e313406b4b/contract.json" with { type: "json" };
import type { Contract as Start } from "../../snapshots/529c1252373695ae8b118cb9bf3461f548eb4b4916797a02fa867fee06a4eca9/contract";
import startContract from "../../snapshots/529c1252373695ae8b118cb9bf3461f548eb4b4916797a02fa867fee06a4eca9/contract.json" with { type: "json" };
import { Migration, MigrationCLI } from "@prisma/orm-postgres/migration";

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropCheckConstraint({
        schema: "public",
        table: "todos",
        constraint: "todos_status_check_c95d195d",
      }),
      this.setDefault({
        schema: "public",
        table: "todos",
        column: "status",
        defaultSql: "DEFAULT 'IN_PROGRESS'",
        operationClass: "widening",
      }),
      this.addCheckConstraint({
        schema: "public",
        table: "todos",
        constraint: "todos_status_check_d33d8563",
        expression: "\"status\" IN ('IN_PROGRESS', 'COMPLETED')",
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
