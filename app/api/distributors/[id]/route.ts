import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// PATCH: Update distributor
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const body = await request.json();
        const { id } = await params;

        const distributor = await prisma.distributor.update({
            where: { id },
            data: {
                ...(body.name && { name: body.name }),
                ...(body.icon && { icon: body.icon }),
                ...(body.address && { address: body.address }),
                ...(body.city && { city: body.city }),
                ...(body.state !== undefined && { state: body.state }),
                ...(body.phone && { phone: body.phone }),
                ...(body.email && { email: body.email }),
                ...(body.mapUrl !== undefined && { mapUrl: body.mapUrl }),
                ...(body.isActive !== undefined && { isActive: body.isActive }),
            },
        });

        return NextResponse.json(distributor);
    } catch (error) {
        console.error("Error updating distributor:", error);
        return NextResponse.json(
            { error: "Error updating distributor" },
            { status: 500 }
        );
    }
}

// DELETE: Delete distributor
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Soft delete: mark as inactive
        await prisma.distributor.update({
            where: { id },
            data: { isActive: false },
        });

        return NextResponse.json({ message: "Distributor deleted successfully" });
    } catch (error) {
        console.error("Error deleting distributor:", error);
        return NextResponse.json(
            { error: "Error deleting distributor" },
            { status: 500 }
        );
    }
}
