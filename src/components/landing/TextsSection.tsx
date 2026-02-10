import { BookOpen, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function TextsSection({ title, description }: { title: string; description: string }) {
    return (
        <section className="py-16 bg-gradient-to-br from-slate-50 to-white">
            <div className="container-padding">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-foreground mb-4">{title}</h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{description}</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-3 mb-3">
                                <BookOpen className="w-8 h-8 text-amber-600" />
                                <CardTitle className="text-xl">Bhagavad Gita</CardTitle>
                            </div>
                            <CardDescription>
                                The divine conversation on duty, yoga, and liberation
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <ChevronRight className="w-4 h-4 text-amber-600" />
                                    <span className="text-sm">18 chapters of profound wisdom</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ChevronRight className="w-4 h-4 text-amber-600" />
                                    <span className="text-sm">Synthesizes karma, jnana, bhakti, raja yoga</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ChevronRight className="w-4 h-4 text-amber-600" />
                                    <span className="text-sm">Timeless guidance for modern life</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-3 mb-3">
                                <BookOpen className="w-8 h-8 text-amber-600" />
                                <CardTitle className="text-xl">Upanishads</CardTitle>
                            </div>
                            <CardDescription>
                                The philosophical foundation of Vedanta and self-knowledge
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <ChevronRight className="w-4 h-4 text-amber-600" />
                                    <span className="text-sm">12 major Upanishads</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ChevronRight className="w-4 h-4 text-amber-600" />
                                    <span className="text-sm">Explores consciousness and reality</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ChevronRight className="w-4 h-4 text-amber-600" />
                                    <span className="text-sm">Source of "Tat Tvam Asi" and other mahavakyas</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-3 mb-3">
                                <BookOpen className="w-8 h-8 text-amber-600" />
                                <CardTitle className="text-xl">Vedas</CardTitle>
                            </div>
                            <CardDescription>
                                The ancient hymns and rituals of the Vedic tradition
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <ChevronRight className="w-4 h-4 text-amber-600" />
                                    <span className="text-sm">Four ancient collections</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ChevronRight className="w-4 h-4 text-amber-600" />
                                    <span className="text-sm">Rig, Sama, Yajur, Atharva Vedas</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ChevronRight className="w-4 h-4 text-amber-600" />
                                    <span className="text-sm">Foundation of Sanatan Dharma</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}