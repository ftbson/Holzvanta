import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { bankTransferSettings } from "@/lib/schema";
import { getBankTransferSettings } from "@/lib/bank-transfer";

async function isAdmin() {
  return (
    (await cookies()).get("admin_token")?.value ===
    "authenticated_admin_holz_session"
  );
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    return NextResponse.json(await getBankTransferSettings(), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Erreur de chargement des coordonnées bancaires :", error);
    return NextResponse.json(
      { error: "Impossible de charger les coordonnées bancaires." },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const accountName =
      typeof body.accountName === "string" ? body.accountName.trim() : "";
    const iban =
      typeof body.iban === "string" ? body.iban.trim().toUpperCase() : "";
    const bic =
      typeof body.bic === "string" ? body.bic.trim().toUpperCase() : "";
    const enabled = body.enabled === true;

    if (
      accountName.length > 120 ||
      iban.length > 34 ||
      bic.length > 11 ||
      (enabled && (!accountName || !iban))
    ) {
      return NextResponse.json(
        {
          error:
            "Le bénéficiaire et l'IBAN sont requis pour activer le virement bancaire.",
        },
        { status: 400 },
      );
    }

    const values = {
      id: "default",
      accountName,
      iban,
      bic,
      enabled,
      updatedAt: new Date().toISOString(),
    };
    const [existing] = await db
      .select({ id: bankTransferSettings.id })
      .from(bankTransferSettings)
      .limit(1);

    if (existing) {
      await db.update(bankTransferSettings).set(values);
    } else {
      await db.insert(bankTransferSettings).values(values);
    }

    return NextResponse.json({ success: true, ...values });
  } catch (error) {
    console.error("Erreur d'enregistrement des coordonnées bancaires :", error);
    return NextResponse.json(
      { error: "Impossible d'enregistrer les coordonnées bancaires." },
      { status: 500 },
    );
  }
}
