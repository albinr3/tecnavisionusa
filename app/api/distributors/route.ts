import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Helper to normalize text (remove accents and lower case)
const normalizeText = (text: string) =>
    text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

// GET: List and search distributors
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const search = searchParams.get("search") || "";
        const state = searchParams.get("state") || "";

        // Fetch all active distributors ordered by name
        const allDistributors = await prisma.distributor.findMany({
            where: {
                isActive: true,
            },
            orderBy: {
                name: "asc",
            },
        });

        // If no search params, return all
        if (!search && !state) {
            return NextResponse.json(allDistributors);
        }

        // Filter in memory for accent-insensitive search
        const filteredDistributors = allDistributors.filter((distributor) => {
            const matchesSearch = search
                ? normalizeText(distributor.name).includes(normalizeText(search))
                : true;

            const matchesState = state
                ? distributor.state && normalizeText(distributor.state).includes(normalizeText(state))
                : true;

            return matchesSearch && matchesState;
        });

        return NextResponse.json(filteredDistributors);
    } catch (error) {
        console.error("Error fetching distributors:", error);
        return NextResponse.json(
            { error: "Error fetching distributors" },
            { status: 500 }
        );
    }
}

// POST: Create new distributor
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields
        const requiredFields = ["name", "icon", "address", "city", "phone", "email"];
        for (const field of requiredFields) {
            if (!body[field]) {
                return NextResponse.json(
                    { error: `Missing required field: ${field}` },
                    { status: 400 }
                );
            }
        }

        const distributor = await prisma.distributor.create({
            data: {
                name: body.name,
                icon: body.icon,
                address: body.address,
                city: body.city,
                state: body.state || null,
                phone: body.phone,
                email: body.email,
                mapUrl: body.mapUrl || null,
                isActive: body.isActive !== undefined ? body.isActive : true,
            },
        });

        return NextResponse.json(distributor, { status: 201 });
    } catch (error) {
        console.error("Error creating distributor:", error);
        return NextResponse.json(
            { error: "Error creating distributor" },
            { status: 500 }
        );
    }
}
