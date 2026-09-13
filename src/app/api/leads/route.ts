import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nombre, email, telefono, mensaje, tipoServicio } = body;

    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: "Nombre, email y mensaje son obligatorios" },
        { status: 400 }
      );
    }

    const lead = await db.lead.create({
      data: {
        nombre,
        email,
        telefono: telefono || null,
        mensaje,
        tipoServicio: tipoServicio || null,
      },
    });

    return NextResponse.json(
      { message: "Lead creado con éxito", lead },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creando lead:", error);
    return NextResponse.json(
      { error: "Error interno del servidor al crear el lead" },
      { status: 500 }
    );
  }
}
