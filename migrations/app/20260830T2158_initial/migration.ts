#!/usr/bin/env -S node
import type { Contract as End } from "../../snapshots/529c1252373695ae8b118cb9bf3461f548eb4b4916797a02fa867fee06a4eca9/contract";
import endContract from "../../snapshots/529c1252373695ae8b118cb9bf3461f548eb4b4916797a02fa867fee06a4eca9/contract.json" with { type: "json" };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  fn,
  lit,
  primaryKey,
} from "@prisma/orm-postgres/migration";

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: "public" }),
      this.createTable({
        schema: "public",
        table: "refresh_tokens",
        columns: [
          col("createdAt", "timestamptz", {
            notNull: true,
            default: fn("now()"),
            codecRef: { codecId: "pg/timestamptz-string@1" },
          }),
          col("expiresAt", "timestamptz", {
            notNull: true,
            codecRef: { codecId: "pg/timestamptz-string@1" },
          }),
          col("id", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("revokedAt", "timestamptz", { codecRef: { codecId: "pg/timestamptz-string@1" } }),
          col("tokenHash", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("updatedAt", "timestamptz", {
            notNull: true,
            codecRef: { codecId: "pg/timestamptz-string@1" },
          }),
          col("userId", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
        ],
        constraints: [primaryKey(["id"])],
      }),
      this.createTable({
        schema: "public",
        table: "todos",
        columns: [
          col("createdAt", "timestamptz", {
            notNull: true,
            default: fn("now()"),
            codecRef: { codecId: "pg/timestamptz-string@1" },
          }),
          col("description", "text", { codecRef: { codecId: "pg/text@1" } }),
          col("id", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("status", "text", {
            notNull: true,
            default: lit("PENDING"),
            codecRef: { codecId: "pg/text@1" },
          }),
          col("title", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("updatedAt", "timestamptz", {
            notNull: true,
            codecRef: { codecId: "pg/timestamptz-string@1" },
          }),
          col("userId", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
        ],
        constraints: [
          primaryKey(["id"]),
          checkExpression(
            "todos_status_check_c95d195d",
            "\"status\" IN ('PENDING', 'IN_PROGRESS', 'COMPLETED')",
          ),
        ],
      }),
      this.createTable({
        schema: "public",
        table: "users",
        columns: [
          col("createdAt", "timestamptz", {
            notNull: true,
            default: fn("now()"),
            codecRef: { codecId: "pg/timestamptz-string@1" },
          }),
          col("email", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("fullName", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("id", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("password", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("updatedAt", "timestamptz", {
            notNull: true,
            codecRef: { codecId: "pg/timestamptz-string@1" },
          }),
        ],
        constraints: [primaryKey(["id"])],
      }),
      this.addUnique({
        schema: "public",
        table: "refresh_tokens",
        constraint: "refresh_tokens_tokenHash_key",
        columns: ["tokenHash"],
      }),
      this.addUnique({
        schema: "public",
        table: "users",
        constraint: "users_email_key",
        columns: ["email"],
      }),
      this.createIndex({
        schema: "public",
        table: "refresh_tokens",
        index: "refresh_tokens_userId_idx_a489d58a",
        columns: ["userId"],
      }),
      this.createIndex({
        schema: "public",
        table: "todos",
        index: "todos_status_idx_e98638ab",
        columns: ["status"],
      }),
      this.createIndex({
        schema: "public",
        table: "todos",
        index: "todos_userId_idx_a489d58a",
        columns: ["userId"],
      }),
      this.addForeignKey({
        schema: "public",
        table: "refresh_tokens",
        foreignKey: {
          name: "refresh_tokens_userId_fkey",
          columns: ["userId"],
          references: { schema: "public", table: "users", columns: ["id"] },
          onDelete: "cascade",
        },
      }),
      this.addForeignKey({
        schema: "public",
        table: "todos",
        foreignKey: {
          name: "todos_userId_fkey",
          columns: ["userId"],
          references: { schema: "public", table: "users", columns: ["id"] },
          onDelete: "cascade",
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
