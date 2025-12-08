'use client';

import { login, signup } from '@/app/auth/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Rocket } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4" dir="rtl">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] -z-10" />
      
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border-white/20 text-white shadow-2xl">
        <CardHeader className="text-center space-y-2">
            <div className="mx-auto bg-indigo-500 w-12 h-12 rounded-full flex items-center justify-center mb-2 shadow-lg shadow-indigo-500/30">
                <Rocket className="text-white w-6 h-6" />
            </div>
          <CardTitle className="text-2xl font-bold">ورود به حساب کاربری</CardTitle>
          <CardDescription className="text-slate-300">
            برای ادامه مسیر موفقیت، وارد شوید
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-200">ایمیل</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="name@example.com" 
                className="bg-black/20 border-white/10 text-white placeholder:text-slate-500 focus:bg-black/30"
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-200">رمز عبور</Label>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                placeholder="********" 
                className="bg-black/20 border-white/10 text-white placeholder:text-slate-500 focus:bg-black/30"
                required 
              />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
                <Button formAction={login} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                    ورود
                </Button>
                <Button formAction={signup} variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 hover:text-white">
                    ثبت نام
                </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="justify-center border-t border-white/10 pt-4">
            <p className="text-xs text-slate-400">
                با ورود به سیستم، قوانین و مقررات را می‌پذیرید.
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}
