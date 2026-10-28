import { db } from "@/lib/db";
import { bankTransferSettings } from "@/lib/schema";

export async function getBankTransferSettings() {
  const [settings] = await db.select().from(bankTransferSettings).limit(1);
  if (settings) return settings;

  const accountName = process.env.NEXT_PUBLIC_BANK_ACCOUNT_NAME || "";
  const iban = process.env.NEXT_PUBLIC_BANK_IBAN || "";

  return {
    id: "default",
    accountName,
    iban,
    bic: process.env.NEXT_PUBLIC_BANK_BIC || "",
    enabled: Boolean(accountName && iban),
    updatedAt: null,
  };
}
