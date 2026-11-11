import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { bizumSettings } from "@/lib/schema";

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
    const [settings] = await db.select().from(bizumSettings).limit(1);
    return NextResponse.json(
      settings ?? {
        recipientName: "",
        phoneNumber: "",
        enabled: false,
      },
    );
  } catch (error) {
    console.error("Erreur de chargement du paramétrage Bizum :", error);
    return NextResponse.json(
      { error: "Impossible de charger le paramétrage Bizum." },
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
    const recipientName =
      typeof body.recipientName === "string" ? body.recipientName.trim() : "";
    const phoneNumber =
      typeof body.phoneNumber === "string" ? body.phoneNumber.trim() : "";
    const enabled = body.enabled === true;

    if (
      recipientName.length > 120 ||
      phoneNumber.length > 40 ||
      (enabled && (!recipientName || !phoneNumber))
    ) {
      return NextResponse.json(
        { error: "Le nom et le numéro Bizum sont requis pour activer Bizum." },
        { status: 400 },
      );
    }

    const values = {
      id: "default",
      recipientName,
      phoneNumber,
      enabled,
      updatedAt: new Date().toISOString(),
    };
    const [existing] = await db
      .select({ id: bizumSettings.id })
      .from(bizumSettings)
      .limit(1);

    if (existing) {
      await db.update(bizumSettings).set(values);
    } else {
      await db.insert(bizumSettings).values(values);
    }

    return NextResponse.json({ success: true, ...values });
  } catch (error) {
    console.error("Erreur d'enregistrement du paramétrage Bizum :", error);
    return NextResponse.json(
      { error: "Impossible d'enregistrer le paramétrage Bizum." },
      { status: 500 },
    );
  }
}
