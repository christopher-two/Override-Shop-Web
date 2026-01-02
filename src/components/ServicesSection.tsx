import React from 'react';
import Link from 'next/link';
import { services } from '@/lib/servicesData';

export default function ServicesSection() {
    return (
        <section className="container" style={{ margin: "4rem auto" }}>
            <h2 style={{ marginBottom: "2rem", fontFamily: "var(--font-mono)" }}>
                override_services
            </h2>
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "1.5rem"
            }}>
                {services.map((service) => (
                    <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        style={{ textDecoration: 'none', display: 'block', height: '100%' }}
                    >
                        <div
                            className="card"
                            style={{
                                padding: "2rem",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                height: "100%",
                                position: "relative",
                                cursor: "pointer",
                                transition: "transform 0.2s, border-color 0.2s",
                                border: "1px solid var(--border-color)"
                            }}
                        // Inline hover styles are tricky in React without state or CSS modules.
                        // Relying on CSS classes or global styles is better, but adding basic inline hover simulation
                        // isn't straightforward without 'use client'.
                        // However, the 'card' class in globals.css might already handle some hover effects?
                        // Let's check globals.css later if needed. For now, we trust the 'card' class or add a specific one.
                        >
                            {service.badge && (
                                <span style={{
                                    position: "absolute",
                                    top: "1rem",
                                    right: "1rem",
                                    fontSize: "0.75rem",
                                    padding: "0.25rem 0.5rem",
                                    border: "1px solid var(--accent-color)",
                                    borderRadius: "var(--radius)",
                                    color: "var(--accent-color)",
                                    fontFamily: "var(--font-mono)"
                                }}>
                                    NEW
                                </span>
                            )}

                            <div>
                                <h3 style={{
                                    marginBottom: "0.5rem",
                                    fontSize: "1.25rem",
                                    color: "var(--primary-color)"
                                }}>
                                    {service.title}
                                </h3>
                                <p style={{
                                    color: "var(--text-secondary)",
                                    marginBottom: "1.5rem",
                                    fontSize: "0.9rem"
                                }}>
                                    {service.description}
                                </p>
                            </div>

                            <div style={{ marginTop: "auto" }}>
                                {service.priceNote && (
                                    <span style={{
                                        display: "block",
                                        fontSize: "0.8rem",
                                        color: "var(--text-secondary)",
                                        fontFamily: "var(--font-mono)"
                                    }}>
                                        {service.priceNote}
                                    </span>
                                )}
                                <div style={{
                                    fontSize: "1.5rem",
                                    fontFamily: "var(--font-mono)",
                                    fontWeight: "600",
                                    color: "var(--text-primary)" // Ensure text color is explicit
                                }}>
                                    {service.price}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
