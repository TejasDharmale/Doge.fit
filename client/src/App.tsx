import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import AuthPage from "@/pages/auth";
import CheckoutPage from "@/pages/checkout";
import ProductsPage from "@/pages/products";
import PlaceholderPage from "@/pages/placeholder";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/checkout" component={CheckoutPage} />
      <Route path="/products" component={ProductsPage} />
      
      {/* Placeholder Pages */}
      <Route path="/shop-gear"><PlaceholderPage title="Shop Gear" /></Route>
      <Route path="/about"><PlaceholderPage title="Our Story" /></Route>
      <Route path="/community"><PlaceholderPage title="Community" /></Route>
      <Route path="/app-features"><PlaceholderPage title="App Features" /></Route>
      <Route path="/blog"><PlaceholderPage title="Blog" /></Route>
      <Route path="/faq"><PlaceholderPage title="FAQ" /></Route>
      <Route path="/shipping-returns"><PlaceholderPage title="Shipping & Returns" /></Route>
      <Route path="/size-guide"><PlaceholderPage title="Size Guide" /></Route>
      <Route path="/contact"><PlaceholderPage title="Contact Us" /></Route>
      <Route path="/privacy"><PlaceholderPage title="Privacy Policy" /></Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
