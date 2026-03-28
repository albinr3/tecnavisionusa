import { prisma } from '../lib/db';

const dominicanDistributors = [
    {
        name: "Seguridad Total RD",
        icon: "verified_user",
        address: "Av. Winston Churchill #1100, Piantini, Santo Domingo",
        city: "Santo Domingo",
        state: "Distrito Nacional",
        phone: "+1 (809) 555-1234",
        email: "contacto@seguridadtotalrd.com",
    },
    {
        name: "TechGuard Dominicana",
        icon: "security",
        address: "Calle del Sol #45, Centro, Santiago",
        city: "Santiago",
        state: "Santiago",
        phone: "+1 (809) 555-5678",
        email: "ventas@techguardrd.com",
    },
    {
        name: "Visión Segura",
        icon: "videocam",
        address: "Av. Independencia #234, La Vega",
        city: "La Vega",
        state: "La Vega",
        phone: "+1 (809) 555-9012",
        email: "info@visionsegura.do",
    },
    {
        name: "Integra Sistemas RD",
        icon: "shield",
        address: "Av. Libertad #567, San Cristóbal",
        city: "San Cristóbal",
        state: "San Cristóbal",
        phone: "+1 (809) 555-3456",
        email: "contacto@integrasistemas.do",
    },
    {
        name: "Protección Caribeña",
        icon: "lock",
        address: "Calle Principal #89, Puerto Plata",
        city: "Puerto Plata",
        state: "Puerto Plata",
        phone: "+1 (809) 555-7890",
        email: "ventas@proteccioncaribena.com",
    },
    {
        name: "SmartSecurity Punta Cana",
        icon: "business",
        address: "Blvd. Turístico del Este Km 28, Bávaro",
        city: "Punta Cana",
        state: "La Altagracia",
        phone: "+1 (809) 555-2468",
        email: "hello@smartsecpc.do",
    },
];

async function updateDistributors() {
    console.log('🗑️  Eliminando distribuidores anteriores...');

    // Delete all existing distributors
    await prisma.distributor.deleteMany({});

    console.log('🌱 Creando distribuidores de República Dominicana...');

    const result = await prisma.distributor.createMany({
        data: dominicanDistributors,
    });

    console.log(`✅ ${result.count} distribuidores dominicanos creados exitosamente!`);

    // List all distributors
    const allDistributors = await prisma.distributor.findMany();
    console.log('\n📋 Distribuidores en la base de datos:');
    allDistributors.forEach((dist, index) => {
        console.log(`${index + 1}. ${dist.name} - ${dist.city}, ${dist.state}`);
    });
}

updateDistributors()
    .catch((e) => {
        console.error('❌ Error actualizando distribuidores:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
