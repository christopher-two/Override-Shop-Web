import { notFound } from 'next/navigation';
import { services } from '@/lib/servicesData';
import Link from 'next/link';

export async function generateStaticParams() {
    return services.map((service) => ({
        slug: service.slug,
    }));
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = services.find((s) => s.slug === slug);

    if (!service) {
        notFound();
    }

    // Server Action or Client Component for "Contact" button?
    // We can use a simple Link with target="_blank" for the WhatsApp button, avoiding 'use client'.
    const message = `Hola, me interesa el servicio ${service.title}`;
    const whatsappUrl = `https://wa.me/524522007824?text=${encodeURIComponent(message)}`;

    return (
        <div className="container" style={{ margin: "4rem auto", padding: "0 1rem" }}>
            <Link href="/" style={{ textDecoration: 'none', color: 'var(--text-secondary)', marginBottom: '2rem', display: 'inline-block' }}>
                &larr; Back to Home
            </Link>

            <header style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '2rem', marginBottom: '2rem' }}>
                <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: '2.5rem', marginBottom: '1rem' }}>
                    {service.title}
                </h1>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
                    <span style={{ fontSize: '1.5rem', fontFamily: 'var(--font-mono)', fontWeight: '600' }}>
                        {service.price}
                    </span>
                    {service.priceNote && (
                        <span style={{ color: 'var(--text-secondary)' }}>{service.priceNote}</span>
                    )}
                </div>
            </header>

            <section style={{ maxWidth: '800px', marginBottom: '4rem' }}>
                <h2 style={{ fontFamily: 'var(--font-mono)', marginBottom: '1.5rem', fontSize: '1.25rem' }}>Description</h2>
                <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                    {service.longDescription || service.description}
                </p>
            </section>

            <section style={{ marginBottom: '4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem' }}>Portfolio / Examples</h2>
                    {/* Potentially a carousel control or view all link here in future */}
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '1.5rem'
                }}>
                    {service.images && service.images.length > 0 ? (
                        service.images.map((item, index) => {
                            const ImageContent = (
                                <img
                                    src={item.src}
                                    alt={`${service.title} example ${index + 1}`}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            );

                            return (
                                <div key={index} style={{
                                    position: 'relative',
                                    aspectRatio: '16/9',
                                    backgroundColor: '#111',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--radius)',
                                    overflow: 'hidden',
                                    cursor: item.url ? 'pointer' : 'default'
                                }}>
                                    {item.url ? (
                                        <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', height: '100%' }}>
                                            {ImageContent}
                                            <div style={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: 0,
                                                right: 0,
                                                background: 'rgba(0,0,0,0.7)',
                                                color: '#fff',
                                                padding: '0.5rem',
                                                fontSize: '0.8rem',
                                                textAlign: 'center',
                                                fontFamily: 'var(--font-mono)'
                                            }}>
                                                Visit Site &rarr;
                                            </div>
                                        </a>
                                    ) : (
                                        ImageContent
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <p style={{ color: 'var(--text-secondary)' }}>No examples available for this service yet.</p>
                    )}
                </div>
            </section>

            <div style={{ marginTop: '4rem' }}>
                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ textDecoration: 'none', display: 'inline-block' }}
                >
                    Contactar por WhatsApp
                </a>
            </div>
        </div>
    );
}
