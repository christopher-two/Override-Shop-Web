export type ServiceItem = {
    slug: string;
    title: string;
    price: string;
    description: string;
    longDescription?: string;
    badge?: string;
    priceNote?: string;
    images: { src: string; url?: string }[];
};

export const services: ServiceItem[] = [
    {
        slug: 'web-landing-page',
        title: 'Web Landing Page',
        price: '$1,000.00',
        description: 'Informativa',
        longDescription: 'Diseño y desarrollo de una landing page moderna y optimizada para convertir visitantes en clientes. Ideal para promocionar un producto, servicio o evento específico. Incluye diseño responsivo, optimización SEO básica e integración con redes sociales.',
        badge: 'Nuevo (Físico + Digital)',
        images: [
            { src: 'https://gqlhnmmofiwybodymufy.supabase.co/storage/v1/object/public/Shop/Logistics.gif', url: 'https://logistics.override.com.mx' },
            { src: 'https://gqlhnmmofiwybodymufy.supabase.co/storage/v1/object/public/Shop/Lerna.gif', url: 'https://lerna.override.com.mx' },
            { src: 'https://gqlhnmmofiwybodymufy.supabase.co/storage/v1/object/public/Shop/Mindstack.gif', url: 'https://mindstack.override.com.mx' },
            { src: 'https://gqlhnmmofiwybodymufy.supabase.co/storage/v1/object/public/Shop/Christpher.gif', url: 'https://christopher.com.mx' },
            { src: 'https://gqlhnmmofiwybodymufy.supabase.co/storage/v1/object/public/Shop/Drinity.gif', url: 'https://drinity.dev' },
            { src: 'https://gqlhnmmofiwybodymufy.supabase.co/storage/v1/object/public/Shop/Daniela.gif', url: 'https://daniela-navarro-galeana.web.app' },
            { src: 'https://gqlhnmmofiwybodymufy.supabase.co/storage/v1/object/public/Shop/Eikocolors.gif', url: 'https://eikocolors.atomo.click' },
        ]
    },
    {
        slug: 'web-e-commerce',
        title: 'Web E-commerce',
        price: '$1,500.00',
        description: 'Tienda básica (Whatsapp)',
        badge: 'Nuevo (Físico + Digital)',
        longDescription: 'Tienda en línea optimizada para ventas vía WhatsApp. Tus clientes arman su pedido y te llega directamente al chat. INCLUYE APP MÓVIL para que administres tus productos, precios e inventario desde tu celular de forma fácil y rápida.',
        images: []
    },
    {
        slug: 'soluciones-arduino',
        title: 'Soluciones Arduino',
        price: '$100.00',
        description: 'Hardware/Sensores',
        priceNote: 'Desde',
        longDescription: 'Desarrollo de prototipos y soluciones de hardware utilizando Arduino y microcontroladores. Integración de sensores, automatización de procesos y control de dispositivos.',
        images: []
    },
    {
        slug: 'mvp-codigo',
        title: 'MVP Código (Funcional)',
        price: '$5,000.00',
        description: 'Una función core',
        longDescription: 'Desarrollo de un Producto Mínimo Viable (MVP) centrado en una funcionalidad principal. Ideal para validar ideas de negocio o probar nuevos conceptos con usuarios reales de manera rápida y económica.',
        images: []
    },
    {
        slug: 'sistemas-escolares',
        title: 'Sistemas Escolares',
        price: '$300.00',
        description: 'Precio por alumno/módulo',
        longDescription: 'Plataforma integral para la gestión escolar. Control de alumnos, calificaciones, asistencia, pagos y comunicación con padres de familia. Modular y escalable según las necesidades de la institución.',
        images: []
    },
];
