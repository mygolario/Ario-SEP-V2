'use client';

import { useToast } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function DesignSystemPage() {
  const { toast } = useToast();

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Design System (RTL Ready)</h1>
        <p className="text-muted-foreground">Components checklist and visual verification.</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Colors & Typography</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-primary text-primary-foreground rounded-lg">Primary</div>
          <div className="p-4 bg-secondary text-secondary-foreground rounded-lg">Secondary</div>
          <div className="p-4 bg-accent text-accent-foreground rounded-lg">Accent</div>
          <div className="p-4 bg-muted text-muted-foreground rounded-lg">Muted</div>
          <div className="p-4 bg-destructive text-destructive-foreground rounded-lg">
            Destructive
          </div>
          <div className="p-4 bg-card text-card-foreground border rounded-lg">Card</div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Inputs & Selects</h2>
        <div className="grid max-w-sm gap-4">
          <Input placeholder="Enter your email..." />
          <Select>
            <option>Option 1</option>
            <option>Option 2 (Long text for RTL check)</option>
          </Select>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Feedback & Overlays</h2>
        <div className="flex gap-4">
          <Button onClick={() => toast('Operation successful', 'success')}>
            Show Success Toast
          </Button>
          <Button onClick={() => toast('Something went wrong', 'error')} variant="destructive">
            Show Error Toast
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>تایید عملیات</DialogTitle>
                <DialogDescription>
                  آیا از انجام این تغییرات اطمینان دارید؟ این عمل غیرقابل بازگشت است.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Input placeholder="Type 'CONFIRM' to proceed" />
              </div>
              <DialogFooter>
                <Button variant="ghost">انصراف</Button>
                <Button>تایید نهایی</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Data Display</h2>
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>A list of recent payments.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell>
                    <Badge>Paid</Badge>
                  </TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV002</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Pending</Badge>
                  </TableCell>
                  <TableCell>PayPal</TableCell>
                  <TableCell className="text-right">$120.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Loading States</h2>
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </section>
    </div>
  );
}
