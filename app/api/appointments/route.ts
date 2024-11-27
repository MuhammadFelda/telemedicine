import { NextResponse, NextRequest } from "next/server"
import { prisma } from "@/lib/db";

export async function GET() {
    try {
        const appointments = await prisma.appointment.findMany({
            select: {
                date: true,
                doctor: {
                    select: {
                        name: true,
                        specialty: true,
                    },
                },
            },
        });
        return NextResponse.json(appointments);
    } catch(error) {
        return NextResponse.json({
            error: error,
        }, {
            status: 500,
        });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        // const { date, userId, doctorId } = body;
        const { date, doctorId } = body;

        // if(!date || !userId || !doctorId) {
        //     return NextResponse.json({
        //         error: "Missinng required fields",
        //     }, {
        //         status: 400,
        //     });
        // }
        if(!date || !doctorId) {
            return NextResponse.json({
                error: "Missinng required fields",
            }, {
                status: 400,
            });
        }
        // use static userId
        const userId = 1;

        const data = await prisma.appointment.create({
            data: {
                date: new Date(date),
                userId,
                doctorId,
            },
        });

        return NextResponse.json(data);
    } catch(error) {
        console.log(error);
        return NextResponse.json({
            error: error,
        }, {
            status: 500,
        });
    }
}