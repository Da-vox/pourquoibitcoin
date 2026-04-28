import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Fondamentaux from "./pages/Fondamentaux";
import Arguments from "./pages/Arguments";
import Securiser from "./pages/Securiser";
import GeekArea from "./pages/GeekArea";
import GeekAreaNoeud from "./pages/GeekAreaNoeud";
import GeekAreaHardwareWallet from "./pages/GeekAreaHardwareWallet";
import GeekAreaLivreBlanc from "./pages/GeekAreaLivreBlanc";
import GeekAreaDictionnaire from "./pages/GeekAreaDictionnaire";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/fondamentaux" element={<Fondamentaux />} />
          <Route path="/arguments" element={<Arguments />} />
          <Route path="/securiser" element={<Securiser />} />
          <Route path="/geek-area" element={<GeekArea />} />
          <Route path="/geek-area/noeud-bitcoin" element={<GeekAreaNoeud />} />
          <Route path="/geek-area/hardware-wallet" element={<GeekAreaHardwareWallet />} />
          <Route path="/geek-area/livre-blanc" element={<GeekAreaLivreBlanc />} />
          <Route path="/geek-area/dictionnaire" element={<GeekAreaDictionnaire />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
