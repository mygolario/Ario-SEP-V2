'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { updateProfile, signOut } from '../../auth/actions';
import { LogOut, Save, User as UserIcon, Loader2 } from 'lucide-react';
import { useTransition } from 'react';

interface ProfileContentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any; // Using any for simplicity with Supabase user type, or better User
}

export function ProfileContent({ user }: ProfileContentProps) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const initials = user.user_metadata?.full_name
    ? user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()
    : user.email?.substring(0, 2).toUpperCase();

  async function handleSave(formData: FormData) {
    startTransition(async () => {
      const res = await updateProfile(formData);
      if (res?.error) {
        setMessage({ type: 'error', text: res.error });
      } else {
        setMessage({ type: 'success', text: 'اطلاعات پروفایل با موفقیت بروزرسانی شد.' });
      }
    });
  }

  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8">
      
      {/* Avatar Section */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <Avatar className="h-24 w-24 border-4 border-slate-50">
            <AvatarImage src={user.user_metadata?.avatar_url} />
            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-2xl font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full border border-slate-200 text-slate-400 hover:text-indigo-600 cursor-pointer transition-colors shadow-sm">
             <UserIcon className="h-4 w-4" />
          </div>
        </div>
        <div>
           <h3 className="text-xl font-bold text-slate-900">{user.user_metadata?.full_name || 'کاربر گرامی'}</h3>
           <p className="text-slate-500 font-mono text-sm">{user.email}</p>
        </div>
      </div>

      <div className="border-t border-slate-100" />

      {/* Form */}
      <form action={handleSave} className="space-y-6 max-w-lg">
        <div className="space-y-2">
          <Label htmlFor="full_name">نام و نام خانوادگی</Label>
          <Input 
            id="full_name" 
            name="full_name" 
            defaultValue={user.user_metadata?.full_name} 
            placeholder="نام خود را وارد کنید" 
          />
        </div>

        <div className="space-y-2">
           <Label htmlFor="email">ایمیل (غیرقابل تغییر)</Label>
           <Input 
             id="email" 
             value={user.email} 
             disabled 
             className="bg-slate-50 text-slate-500" 
           />
        </div>

        {message && (
          <div className={`p-3 rounded-lg text-sm flex items-center gap-2 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
             {message.type === 'success' ? (
                // CheckCircle icon inline
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
             ) : (
                // AlertTriangle icon inline
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
             )}
             {message.text}
          </div>
        )}

        <div className="flex items-center gap-4 pt-4">
           <Button type="submit" disabled={isPending} className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              ذخیره تغییرات
           </Button>
        </div>
      </form>

      <div className="border-t border-slate-100 pt-6">
          <h4 className="font-bold text-rose-700 mb-4 text-sm">منطقه خطر</h4>
          <form action={signOut}>
              <Button variant="outline" className="border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300 gap-2">
                  <LogOut className="h-4 w-4" />
                  خروج از حساب کاربری
              </Button>
          </form>
      </div>

    </div>
  );
}
