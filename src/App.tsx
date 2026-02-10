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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
