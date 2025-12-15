'use client';

import { Competitor } from '@/app/actions/market';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  competitors: Competitor[];
  onChange: (competitors: Competitor[]) => void;
}

export function CompetitorTable({ competitors, onChange }: Props) {
  const handleUpdate = (index: number, field: keyof Competitor, value: string) => {
    const newer = [...competitors];
    newer[index] = { ...newer[index], [field]: value };
    onChange(newer);
  };

  const handleAdd = () => {
    onChange([...competitors, { name: '', strength: '', weakness: '' }]);
  };

  const handleDelete = (index: number) => {
    onChange(competitors.filter((_, i) => i !== index));
  };

  if (competitors.length === 0) return null;

  return (
    <div className="space-y-4 border rounded-lg p-4 bg-card">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">جدول تحلیل رقبا</h3>
        <Button variant="outline" size="sm" onClick={handleAdd}>
          <Plus className="h-4 w-4 ml-2" />
          افزودن رقیب
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30%]">نام رقیب</TableHead>
            <TableHead className="w-[30%]">نقط قوت</TableHead>
            <TableHead className="w-[30%]">نقط ضعف</TableHead>
            <TableHead className="w-[10%]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {competitors.map((comp, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <Input
                  className="border-0 shadow-none focus-visible:ring-0"
                  value={comp.name}
                  placeholder="نام رقیب"
                  onChange={(e) => handleUpdate(idx, 'name', e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  className="border-0 shadow-none focus-visible:ring-0 text-green-600"
                  value={comp.strength}
                  placeholder="مزیت..."
                  onChange={(e) => handleUpdate(idx, 'strength', e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  className="border-0 shadow-none focus-visible:ring-0 text-red-500"
                  value={comp.weakness}
                  placeholder="ضعف..."
                  onChange={(e) => handleUpdate(idx, 'weakness', e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(idx)}>
                  <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
