'use client';

import { toggleAdminStatus } from '@/app/actions/admin';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useToast } from '@/components/ui/toast';
import { Loader2 } from 'lucide-react';

interface Props {
  userId: string;
  initialStatus: boolean;
}

export function AdminToggle({ userId, initialStatus }: Props) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(initialStatus);

  const handleToggle = async () => {
    setLoading(true);
    try {
      await toggleAdminStatus(userId, !isAdmin);
      setIsAdmin(!isAdmin);
      toast(!isAdmin ? 'کاربر مدیر شد' : 'دسترسی مدیریت حذف شد', 'success');
    } catch {
      toast('خطا در تغییر وضعیت', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={isAdmin ? 'destructive' : 'outline'}
      size="sm"
      onClick={handleToggle}
      disabled={loading}
    >
      {loading && <Loader2 className="ml-2 h-3 w-3 animate-spin" />}
      {isAdmin ? 'حذف مدیریت' : 'ارتقا به مدیر'}
    </Button>
  );
}
