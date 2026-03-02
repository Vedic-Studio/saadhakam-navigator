import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import IndexVariantA from "./pages/IndexVariantA";
import IndexVariantB from "./pages/IndexVariantB";
import IndexVariantC from "./pages/IndexVariantC";
import IndexVariantD from "./pages/IndexVariantD";
import IndexVariantE from "./pages/IndexVariantE";
import IndexVariantF from "./pages/IndexVariantF";
import { VariantSelector } from "./components/landing/VariantSelector";
import AppPage from "./pages/AppPage";
import Pathfinder from "./pages/Pathfinder";
import FaithFinder from "./pages/FaithFinder";
import Philosophies from "./pages/Philosophies";
import PhilosophyDetail from "./pages/PhilosophyDetail";
import Traditions from "./pages/Traditions";
import TraditionDetail from "./pages/TraditionDetail";
import Greats from "./pages/Greats";
import GreatDetail from "./pages/GreatDetail";
import Texts from "./pages/Texts";
import TextDetail from "./pages/TextDetail";
import StartPage from "./pages/Start";
import NotFound from "./pages/NotFound";
// SEO Article Pages
import WhatIsVedanta from "./pages/what-is-vedanta";
import VedantaGuide from "./pages/vedanta-guide";
import AdvaitaVedantaExplained from "./pages/advaita-vedanta-explained";
import HowToStartJapa from "./pages/how-to-start-japa";
import TenPowerfulSanskritMantras from "./pages/10-powerful-sanskrit-mantras";
import UpanishadsCoreWisdom from "./pages/upanishads-core-wisdom";
import BuddhistMeditationTechniques from "./pages/buddhist-meditation-techniques";
import SufiMysticismPathOfLove from "./pages/sufi-mysticism-path-of-love";
import TaoistPhilosophyWayOfHarmony from "./pages/taoist-philosophy-way-of-harmony";
import BhagavadGitaChapter1 from "./pages/bhagavad-gita-chapter-1";
import SacredTextsHub from "./pages/sacred-texts";
import SpiritualPracticesHub from "./pages/spiritual-practices";
import SpiritualTraditionsHub from "./pages/spiritual-traditions";
import ShaivismVsVaishnavism from "./pages/shaivism-vs-vaishnavism";
import DailySpiritualRoutineBeginners from "./pages/daily-spiritual-routine-beginners";
import AdiShankaracharyaLifeTeachings from "./pages/adi-shankaracharya-life-teachings";
import HowToChooseAMantra from "./pages/how-to-choose-a-mantra";
import NonDualityVsDualism from "./pages/non-duality-vs-dualism";
import AncientWisdomPhilosophies from "./pages/ancient-wisdom-philosophies";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/variant-a" element={<IndexVariantA />} />
          <Route path="/variant-b" element={<IndexVariantB />} />
          <Route path="/variant-c" element={<IndexVariantC />} />
          <Route path="/variant-d" element={<IndexVariantD />} />
          <Route path="/variant-e" element={<IndexVariantE />} />
          <Route path="/variant-f" element={<IndexVariantF />} />
          <Route path="/variant-selector" element={<VariantSelector />} />
          <Route path="/app" element={<AppPage />} />
          <Route path="/pathfinder" element={<Pathfinder />} />
          <Route path="/faith-finder" element={<FaithFinder />} />
          <Route path="/philosophies" element={<Philosophies />} />
          <Route path="/philosophies/:slug" element={<PhilosophyDetail />} />
          <Route path="/traditions" element={<Traditions />} />
          <Route path="/traditions/:slug" element={<TraditionDetail />} />
          <Route path="/greats" element={<Greats />} />
          <Route path="/greats/:slug" element={<GreatDetail />} />
          <Route path="/texts" element={<Texts />} />
          <Route path="/texts/:slug" element={<TextDetail />} />
          <Route path="/start" element={<StartPage />} />
          {/* SEO Article Routes */}
          <Route path="/what-is-vedanta" element={<WhatIsVedanta />} />
          <Route path="/vedanta-guide" element={<VedantaGuide />} />
          <Route path="/advaita-vedanta-explained" element={<AdvaitaVedantaExplained />} />
          <Route path="/how-to-start-japa" element={<HowToStartJapa />} />
          <Route path="/10-powerful-sanskrit-mantras" element={<TenPowerfulSanskritMantras />} />
          <Route path="/upanishads-core-wisdom" element={<UpanishadsCoreWisdom />} />
          <Route path="/buddhist-meditation-techniques" element={<BuddhistMeditationTechniques />} />
          <Route path="/sufi-mysticism-path-of-love" element={<SufiMysticismPathOfLove />} />
          <Route path="/taoist-philosophy-way-of-harmony" element={<TaoistPhilosophyWayOfHarmony />} />
          <Route path="/bhagavad-gita-chapter-1" element={<BhagavadGitaChapter1 />} />
          <Route path="/sacred-texts-teachings" element={<SacredTextsHub />} />
          <Route path="/practical-spiritual-practices" element={<SpiritualPracticesHub />} />
          <Route path="/spiritual-traditions-paths" element={<SpiritualTraditionsHub />} />
          <Route path="/shaivism-vs-vaishnavism" element={<ShaivismVsVaishnavism />} />
          <Route path="/daily-spiritual-routine-beginners" element={<DailySpiritualRoutineBeginners />} />
          <Route path="/adi-shankaracharya-life-teachings" element={<AdiShankaracharyaLifeTeachings />} />
          <Route path="/how-to-choose-a-mantra" element={<HowToChooseAMantra />} />
          <Route path="/non-duality-vs-dualism" element={<NonDualityVsDualism />} />
          <Route path="/ancient-wisdom-philosophies" element={<AncientWisdomPhilosophies />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
