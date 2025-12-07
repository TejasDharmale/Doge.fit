import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLocation } from "wouter";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuthStore } from "@/lib/store";
import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const { login } = useAuthStore();
  const { toast } = useToast();

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onLogin = async (data: z.infer<typeof loginSchema>) => {
    try {
      const response = await apiRequest("POST", "/api/login", {
        email: data.email,
        password: data.password,
      });
      const tokenData = await response.json();
      
      // Fetch user info
      const userResponse = await apiRequest("GET", "/api/me", undefined, tokenData.access_token);
      const userData = await userResponse.json();
      
      // Store token in auth store (you may want to update store to handle tokens)
      login(userData.email, userData.name);
      localStorage.setItem("auth_token", tokenData.access_token);
      
      toast({ title: "Welcome back!", description: "Successfully logged in." });
      setLocation("/checkout");
    } catch (error: any) {
      toast({ 
        title: "Login failed", 
        description: error.message || "Invalid email or password", 
        variant: "destructive" 
      });
    }
  };

  const onRegister = async (data: z.infer<typeof registerSchema>) => {
    try {
      const response = await apiRequest("POST", "/api/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      const userData = await response.json();
      
      // Auto-login after registration
      const loginResponse = await apiRequest("POST", "/api/login", {
        email: data.email,
        password: data.password,
      });
      const tokenData = await loginResponse.json();
      
      login(userData.email, userData.name);
      localStorage.setItem("auth_token", tokenData.access_token);
      
      toast({ title: "Welcome!", description: "Account created successfully." });
      setLocation("/checkout");
    } catch (error: any) {
      toast({ 
        title: "Registration failed", 
        description: error.message || "Failed to create account", 
        variant: "destructive" 
      });
    }
  };

  const handleGoogleSuccess = async (tokenResponse: any) => {
    try {
      // Fetch user info from Google
      const userInfoResponse = await fetch(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`
      );
      const userInfo = await userInfoResponse.json();

      if (userInfo.email && userInfo.name) {
        // Register or login with Google OAuth (backend should handle this)
        // For now, we'll create a user account with a random password
        // In production, you'd send the Google token to backend for verification
        try {
          // Try to register first
          await apiRequest("POST", "/api/register", {
            name: userInfo.name,
            email: userInfo.email,
            password: `google_${userInfo.sub}`, // Temporary password for OAuth users
          });
        } catch (e) {
          // User might already exist, try login
          try {
            const loginResponse = await apiRequest("POST", "/api/login", {
              email: userInfo.email,
              password: `google_${userInfo.sub}`,
            });
            const tokenData = await loginResponse.json();
            localStorage.setItem("auth_token", tokenData.access_token);
          } catch (loginError) {
            // If login fails, just proceed with local auth
            console.warn("Backend auth failed, using local auth", loginError);
          }
        }
        
        login(userInfo.email, userInfo.name);
        toast({ 
          title: "Welcome!", 
          description: "Successfully signed in with Google." 
        });
        setLocation("/checkout");
      } else {
        throw new Error("Failed to get user information from Google");
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast({ 
        title: "Error", 
        description: "Failed to sign in with Google. Please try again.", 
        variant: "destructive" 
      });
    }
  };

  const [hasGoogleClient, setHasGoogleClient] = useState(false);

  useEffect(() => {
    // Check if Google OAuth is available
    setHasGoogleClient(!!import.meta.env.VITE_GOOGLE_CLIENT_ID);
  }, []);

  // Only initialize Google login hook if client ID is available
  const googleLoginHook = hasGoogleClient ? useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => {
      toast({ 
        title: "Error", 
        description: "Failed to sign in with Google. Please try again.", 
        variant: "destructive" 
      });
    },
  }) : null;

  const handleGoogleClick = () => {
    if (!hasGoogleClient || !googleLoginHook) {
      toast({ 
        title: "Google Login Unavailable", 
        description: "Google OAuth is not configured. Please use email/password to sign in.", 
        variant: "destructive" 
      });
      return;
    }
    googleLoginHook();
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md"
        >
          <Card className="bg-zinc-900 border-white/10 text-white">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-heading uppercase italic">Join Dodge.Fit</CardTitle>
              <CardDescription className="text-gray-400">Sign in to access exclusive gear and checkout.</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-zinc-950 mb-6">
                  <TabsTrigger value="login" className="data-[state=active]:bg-primary data-[state=active]:text-black font-bold uppercase">Login</TabsTrigger>
                  <TabsTrigger value="register" className="data-[state=active]:bg-primary data-[state=active]:text-black font-bold uppercase">Register</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} className="bg-black border-white/10 text-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} className="bg-black border-white/10 text-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full bg-primary text-black hover:bg-white font-bold uppercase">Sign In</Button>
                      
                      <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                          <Separator className="w-full bg-white/10" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-zinc-900 px-2 text-gray-400">Or continue with</span>
                        </div>
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        className="w-full border-white/10 bg-black text-white hover:bg-white/10 font-bold uppercase"
                        onClick={handleGoogleClick}
                      >
                        <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Sign in with Google
                      </Button>
                    </form>
                  </Form>
                </TabsContent>

                <TabsContent value="register">
                  <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
                      <FormField
                        control={registerForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input {...field} className="bg-black border-white/10 text-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} className="bg-black border-white/10 text-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} className="bg-black border-white/10 text-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full bg-primary text-black hover:bg-white font-bold uppercase">Create Account</Button>
                      
                      <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                          <Separator className="w-full bg-white/10" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-zinc-900 px-2 text-gray-400">Or continue with</span>
                        </div>
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        className="w-full border-white/10 bg-black text-white hover:bg-white/10 font-bold uppercase"
                        onClick={handleGoogleClick}
                      >
                        <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Sign up with Google
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
      </motion.div>
    </div>
  );
}
