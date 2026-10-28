// lib/schema.ts
import { sqliteTable, text, real, integer } from "drizzle-orm/sqlite-core";

// Table des commandes (Orders)
export const orders = sqliteTable("orders", {
  id: text("id").primaryKey(), // Ex: ORD-17123456789
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  country: text("country").notNull(),
  streetAddress: text("street_address").notNull(),
  whatsapp: text("whatsapp").notNull(),
  email: text("email").notNull(),
  subtotal: real("subtotal").notNull(),
  shippingCost: real("shipping_cost").notNull(),
  grandTotal: real("grand_total").notNull(),
  status: text("status").default("pending"), // pending, paid, shipped, cancelled
  paymentMethod: text("payment_method").default("bank_transfer").notNull(),
  paymentStatus: text("payment_status").default("pending").notNull(),
  stripeSessionId: text("stripe_session_id"),
  createdAt: text("created_at").$defaultFn(() => new Date().toISOString()),
});

export const bizumSettings = sqliteTable("bizum_settings", {
  id: text("id").primaryKey(),
  recipientName: text("recipient_name").notNull().default(""),
  phoneNumber: text("phone_number").notNull().default(""),
  enabled: integer("enabled", { mode: "boolean" }).notNull().default(false),
  updatedAt: text("updated_at").$defaultFn(() => new Date().toISOString()),
});

export const analyticsVisits = sqliteTable("analytics_visits", {
  id: text("id").primaryKey(),
  visitDate: text("visit_date").notNull(),
  country: text("country").notNull(),
  visits: integer("visits").notNull().default(0),
});

export const bankTransferSettings = sqliteTable("bank_transfer_settings", {
  id: text("id").primaryKey(),
  accountName: text("account_name").notNull().default(""),
  iban: text("iban").notNull().default(""),
  bic: text("bic").notNull().default(""),
  enabled: integer("enabled", { mode: "boolean" }).notNull().default(false),
  updatedAt: text("updated_at").$defaultFn(() => new Date().toISOString()),
});
