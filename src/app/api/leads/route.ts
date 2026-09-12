import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const leadSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio").max(120),
  email: z.string().email("Correo electrónico no válido"),
  phone: z.string().max(40).optional().nullable(),
  pageType: z.string().min(1, "Selecciona el tipo de página").max(80),
  budget: z.string().max(40).optional().nullable(),
  message: z.string().max(2000).optional().nullable(),
  planName: z.string().max(80).optional().nullable(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Datos inválidos",
          details: parsed.error.issues.map((i) => ({
            field: i.path.join("."),
            message: i.message,
          })),
        },
        { status: 400 }
      );
    }

    const lead = await db.lead.create({
      data: {
        name: parsed.data.name.trim(),
        email: parsed.data.email.trim().toLowerCase(),
        phone: parsed.data.phone?.trim() || null,
        pageType: parsed.data.pageType,
        budget: parsed.data.budget || null,
        message: parsed.data.message?.trim() || null,
        planName: parsed.data.planName || null,
      },
    });

    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/leads] Error:", err);
    return NextResponse.json(
      { ok: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const count = await db.lead.count();
    return NextResponse.json({ ok: true, total: count });
  } catch {
    return NextResponse.json({ ok: false, total: 0 }, { status: 500 });
  }
}
