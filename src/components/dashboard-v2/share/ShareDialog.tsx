'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/toast';
import { Copy, Globe, Loader2, Share2 } from 'lucide-react';
import { useState } from 'react';
import { generateShareLink, revokeShareLink } from '@/app/actions/artifacts';

interface ShareDialogProps {
  artifactId: string | null;
  currentShareToken: string | null;
  onUpdate: (newToken: string | null) => void;
}

export function ShareDialog({ artifactId, currentShareToken, onUpdate }: ShareDialogProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // If no artifact saved yet, disable
  if (!artifactId) return null;

  const handleToggle = async (checked: boolean) => {
    setLoading(true);
    try {
      if (checked) {
        // Generate
        const token = await generateShareLink(artifactId);
        onUpdate(token);
        toast('لینک اشتراک‌گذاری ایجاد شد', 'success');
      } else {
        // Revoke
        await revokeShareLink(artifactId);
        onUpdate(null);
        toast('لینک اشتراک‌گذاری غیرفعال شد', 'info');
      }
    } catch (error) {
      console.error(error);
      toast('خطا در تغییر وضعیت اشتراک‌گذاری', 'error');
    } finally {
      setLoading(false);
    }
  };

  const copyLink = () => {
    if (!currentShareToken) return;
    const url = `${window.location.origin}/share/${currentShareToken}`;
    navigator.clipboard.writeText(url);
    toast('لینک کپی شد', 'success');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="h-4 w-4" />
          اشتراک‌گذاری
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            اشتراک‌گذاری عمومی
          </DialogTitle>
          <DialogDescription>
            با فعال‌سازی این گزینه، هر کسی که لینک را داشته باشد می‌تواند نسخه فعلی را مشاهده کند.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center space-x-4 space-x-reverse py-4">
          <Switch
            id="share-mode"
            checked={!!currentShareToken}
            onCheckedChange={handleToggle}
            disabled={loading}
          />
          <Label htmlFor="share-mode" className="flex-1">
            دسترسی عمومی (View Only)
          </Label>
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        </div>

        {currentShareToken && (
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input
                id="link"
                defaultValue={`${typeof window !== 'undefined' ? window.location.origin : ''}/share/${currentShareToken}`}
                readOnly
                className="text-left ltr h-8"
              />
            </div>
            <Button size="sm" className="px-3" onClick={copyLink}>
              <span className="sr-only">Copy</span>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        )}

        <DialogFooter className="sm:justify-start">
          {/* Additional options could go here */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
