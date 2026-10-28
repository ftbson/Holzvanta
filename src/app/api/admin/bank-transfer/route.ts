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
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  try {
    return NextResponse.json(await getBankTransferSettings(), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Fehler beim Laden der Bankdaten:", error);
    return NextResponse.json(
      { error: "Bankdaten konnten nicht geladen werden." },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
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
            "Kontoinhaber und IBAN sind erforderlich, um die Banküberweisung zu aktivieren.",
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
    console.error("Fehler beim Speichern der Bankdaten:", error);
    return NextResponse.json(
      { error: "Bankdaten konnten nicht gespeichert werden." },
      { status: 500 },
    );
  }
}