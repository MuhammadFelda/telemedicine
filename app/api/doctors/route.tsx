import { prisma } from "@/lib/db"
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const data = await prisma.doctor.findMany();
        return NextResponse.json(data);
    } catch(error) {
        return NextResponse.json({
            error: error,
        }, {
            status: 500,
        });
    }
}