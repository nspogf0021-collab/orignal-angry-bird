import { pgTable, integer, boolean, timestamp, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const levelProgressTable = pgTable("level_progress", {
  id: serial("id").primaryKey(),
  levelId: integer("level_id").notNull().unique(),
  stars: integer("stars").notNull().default(0),
  bestScore: integer("best_score").notNull().default(0),
  completed: boolean("completed").notNull().default(false),
  attempts: integer("attempts").notNull().default(0),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertLevelProgressSchema = createInsertSchema(levelProgressTable).omit({ id: true, updatedAt: true });
export type InsertLevelProgress = z.infer<typeof insertLevelProgressSchema>;
export type LevelProgress = typeof levelProgressTable.$inferSelect;
