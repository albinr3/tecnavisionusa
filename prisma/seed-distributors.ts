import { prisma } from '../lib/db';

const distributors = [
    {
        name: "Seguridad Total S.A.",
        icon: "verified_user",
        address: "Av. Reforma 222, Colonia Juárez, Ciudad de México, CDMX",
        city: "Ciudad de México",
        state: "CDMX",
        phone: "+52 55 1234 5678",
        email: "contacto@seguridadtotal.mx",
    },
    {
        name: "TechGuard Solutions",
        icon: "security",
        address: "Blvd. Kukulcán Km 12, Zona Hotelera, Cancún, QROO",
        city: "Cancún",
        state: "QROO",
        phone: "+52 998 888 9900",
        email: "ventas@techguard.mx",
    },
    {
        name: "Visión Norte",
        icon: "videocam",
        address: "Calzada del Valle 400, San Pedro Garza García, NL",
        city: "Monterrey",
        state: "NL",
        phone: "+52 81 8356 7788",
        email: "info@visionnorte.com",
    },
    {
        name: "Integra Sistemas",
        icon: "shield",
        address: "Av. Vallarta 2440, Arcos Vallarta, Guadalajara, JAL",
        city: "Guadalajara",
        state: "JAL",
        phone: "+52 33 3615 9000",
        email: "contacto@integrasistemas.mx",
    },
    {
        name: "Protección Total",
        icon: "lock",
        address: "Calle 60 Norte No. 345, Mérida, YUC",
        city: "Mérida",
        state: "YUC",
        phone: "+52 999 925 4400",
        email: "ventas@protecciontotal.mx",
    },
    {
        name: "SmartSecurity Puebla",
        icon: "business",
        address: "Blvd. Atlixcayotl 321, Reserva Territorial, Puebla, PUE",
        city: "Puebla",
        state: "PUE",
        phone: "+52 222 223 5566",
        email: "hello@smartsec.mx",
    },
];

async function seedDistributors() {
    console.log('🌱 Seeding distributors...');

    try {
        const result = await prisma.distributor.createMany({
            data: distributors,
            skipDuplicates: true,
        });

        console.log(`✅ ${result.count} distributors seeded successfully!`);
    } catch (error) {
        console.error('Error details:', error);
        throw error;
    }
}

seedDistributors()
    .catch((e) => {
        console.error('❌ Error seeding distributors:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
