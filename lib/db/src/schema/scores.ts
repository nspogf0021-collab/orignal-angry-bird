import { pgTable, integer, text, timestamp, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const highScoresTable = pgTable("high_scores", {
  id: serial("id").primaryKey(),
  playerName: text("player_name").notNull(),
  levelId: integer("level_id").notNull(),
  score: integer("score").notNull(),
  stars: integer("stars").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertHighScoreSchema = createInsertSchema(highScoresTable).omit({ id: true, createdAt: true });
export type InsertHighScore = z.infer<typeof insertHighScoreSchema>;
export type HighScore = typeof highScoresTable.$inferSelect;
