import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Flame, Droplets, MountainSnow, Shield } from "lucide-react";

export const metadata: Metadata = {
    title: "Spiritual Traditions & Paths | Sadhaka",
    description:
        "Explore the major traditions (Sampradayas) of Sanatan Dharma including Shaivism, Vaishnavism, Shaktism, and Smartism.",
    alternates: {
        canonical: "https://opensadhaka.com/spiritual-traditions-paths",
    },
};

const traditions = [
    {
        title: "Shaivism",
        description: "The worship of Shiva as the Supreme Being. Emphasizes asceticism, yoga, and Tantric practices. Prominent in Kashmir and South India.",
        icon: MountainSnow,
        href: "/compare/shaivism-vs-vaishnavism",
    },
    {
        title: "Vaishnavism",
        description: "The worship of Vishnu (and avatars like Krishna and Rama) as the Supreme Lord. Strongly emphasizes Bhakti (devotion) and grace.",
        icon: Droplets,
        href: "/compare/shaivism-vs-vaishnavism",
    },
    {
        title: "Shaktism",
        description: "The worship of the divine feminine (Devi or Shakti) as the absolute, ultimate reality. Deeply intertwined with Tantra and mantra practice.",
        icon: Flame,
        href: "/topics",
    },
    {
        title: "Smartism",
        description: "A liberal, non-sectarian tradition founded by Adi Shankaracharya that worships five deities (Panchayatana puja) as equal manifestations of the one Brahman.",
        icon: Shield,
        href: "/topics",
    },
];

export default function SpiritualTraditionsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-orange-500/30 selection:text-orange-100 flex flex-col">
            <Header />

            <main className="flex-grow pt-32 pb-16">
                <div className="container-padding max-w-5xl mx-auto">
                    {/* Header Section */}
                    <header className="mb-20 text-center">
                        <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                            Spiritual <span className="text-orange-500">Traditions</span> & Paths
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Sanatan Dharma is a tapestry of distinct, ancient lineages (Sampradayas).
                            Each offers a unique theological lens, set of practices, and path to liberation.
                        </p>
                    </header>

                    {/* Intro Content */}
                    <div className="prose prose-invert prose-orange max-w-4xl mx-auto mb-24 prose-lg">
                        <p>
                            While Western religions are often strictly monotheistic and exclusive, Sanatan Dharma
                            is deeply pluralistic. The <em>Rig Veda</em> famously declares:
                            <strong>"Truth is One, but the sages call it by many names."</strong>
                        </p>
                        <p>
                            This realization gave birth to distinct traditions (Sampradayas). Some seekers are drawn
                            to the ascetic, world-renouncing energy of Shiva. Others are drawn to the colorful,
                            protective, and loving energy of Vishnu. Others worship the fierce, dynamic power of the
                            Divine Mother (Shakti). All are valid rivers flowing into the same infinite ocean.
                        </p>
                    </div>

                    {/* Hub Grid */}
                    <div className="grid md:grid-cols-2 gap-8 mb-24">
                        {traditions.map((tradition) => (
                            <div
                                key={tradition.title}
                                className="glass-card p-8 rounded-3xl border border-white/5 hover:border-orange-500/30 transition-all duration-300 group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <tradition.icon className="w-32 h-32" />
                                </div>
                                <tradition.icon className="w-10 h-10 text-orange-500 mb-6" />
                                <h3 className="text-2xl font-bold mb-3 font-display">{tradition.title}</h3>
                                <p className="text-muted-foreground mb-8 text-lg relative z-10">
                                    {tradition.description}
                                </p>
                                <Link
                                    href={tradition.href}
                                    className="inline-flex items-center text-orange-400 font-semibold group-hover:text-orange-300 transition-colors"
                                >
                                    Explore <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        ))}
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
