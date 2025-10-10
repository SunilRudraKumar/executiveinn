import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { localSignIn, getLocalAdminCredentials } from "@/lib/localAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Local fallback when Supabase isn't configured
    if (!isSupabaseConfigured || !supabase) {
      const res = localSignIn(email, password);
      if (!res) {
        toast.error("Invalid credentials. For demo use admin@executiveinn.local / admin123");
        return;
      }
      toast.success("Signed in (local demo)");
      navigate("/admin", { replace: true });
      return;
    }
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setIsLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Signed in");
    navigate("/admin", { replace: true });
  }

  return (
    <>
      <Helmet>
        <title>Admin Login | Executive Inn</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
              {!isSupabaseConfigured && (
                <p className="text-xs text-muted-foreground text-center pt-2">
                  Demo creds: {getLocalAdminCredentials().email} / {getLocalAdminCredentials().password}
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Login;

