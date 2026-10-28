import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bizumSettings } from "@/lib/schema";

export async function GET() {
  try {
    const [settings] = await db.select().from(bizumSettings).limit(1);
    return NextResponse.json(
      settings?.enabled
        ? {
            enabled: true,
            recipientName: settings.recipientName,
            phoneNumber: settings.phoneNumber,
          }
        : { enabled: false },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Erreur de chargement des coordonnées Bizum :", error);
    return NextResponse.json(
      { error: "Impossible de charger les coordonnées Bizum." },
      { status: 500 },
    );
  }
}
