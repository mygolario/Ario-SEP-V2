'use client';

import { useFormState } from 'react-dom';
import { resetPassword } from '@/app/auth/actions';

const initialState = { error: '', message: '' };

export default function ResetPasswordForm() {
  const [state, dispatch] = useFormState(resetPassword, initialState);

  return (
    <form action={dispatch} className="space-y-6 text-right" dir="rtl">
      {state?.error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-200">
          {state.error}
        </div>
      )}

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
          رمز عبور جدید
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          dir="ltr"
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-none text-left"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-colors duration-200"
      >
        تغییر رمز عبور
      </button>
    </form>
  );
}
