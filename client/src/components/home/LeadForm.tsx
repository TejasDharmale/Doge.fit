import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
});

export function LeadForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "You're in!",
      description: "Thanks for signing up for the free trial.",
    });
    form.reset();
  }

  return (
    <section id="contact" className="py-24 bg-primary relative overflow-hidden">
      {/* Abstract Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-black uppercase italic mb-4 leading-none">
              Start Your <br/> Transformation
            </h2>
            <p className="text-black/80 text-lg mb-8 max-w-md font-medium">
              Get 14 days of free access to our premium app features. No credit card required.
            </p>
            <ul className="space-y-2 mb-8 text-black/90 font-medium">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-black rounded-full mr-3" />
                Custom workout plans
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-black rounded-full mr-3" />
                Advanced analytics
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-black rounded-full mr-3" />
                Community challenges
              </li>
            </ul>
          </div>

          <div className="bg-black p-8 md:p-10 shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-transparent" />
            <h3 className="text-2xl font-heading font-bold text-white mb-6 uppercase">Get Free Trial Access</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-400 uppercase text-xs tracking-wider">First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} className="bg-white/5 border-white/10 text-white focus:border-primary focus:ring-primary/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-400 uppercase text-xs tracking-wider">Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} className="bg-white/5 border-white/10 text-white focus:border-primary focus:ring-primary/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-400 uppercase text-xs tracking-wider">Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" {...field} className="bg-white/5 border-white/10 text-white focus:border-primary focus:ring-primary/50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-primary text-black hover:bg-white font-bold uppercase py-6 transition-colors">
                  Get Started Now
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
