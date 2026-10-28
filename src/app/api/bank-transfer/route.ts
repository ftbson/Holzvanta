import { NextResponse } from "next/server";
import { getBankTransferSettings } from "@/lib/bank-transfer";

export async function GET() {
  try {
    const settings = await getBankTransferSettings();

    return NextResponse.json(
      settings.enabled
        ? {
            enabled: true,
            accountName: settings.accountName,
            iban: settings.iban,
            bic: settings.bic,
          }
        : { enabled: false },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Erreur de chargement des coordonnées bancaires :", error);
    return NextResponse.json(
      { error: "Impossible de charger les coordonnées bancaires." },
      { status: 500 },
    );
  }
}
