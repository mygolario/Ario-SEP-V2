import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

export default function UIKitPage() {
  return (
    <div className="container mx-auto py-10 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-primary">UI Kit & Design System</h1>
        <p className="text-muted-foreground text-lg">
          بررسی کامپوننت‌ها، تایپوگرافی و رنگ‌ها در تم Premium Light
        </p>
      </div>

      {/* Typography */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Typography (Vazirmatn)</h2>
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold">Heading 1 - عنوان اصلی بزرگ (۴۸ پیکسل)</h1>
          <h2 className="text-3xl font-bold">Heading 2 - زیرعنوان بخش (۳۶ پیکسل)</h2>
          <h3 className="text-2xl font-semibold">Heading 3 - عنوان کارت‌ها (۲۴ پیکسل)</h3>
          <h4 className="text-xl font-medium">Heading 4 - عنوان کوچک (۲۰ پیکسل)</h4>
          <p className="leading-7">
            Paragraph - متن بدنه که باید خوانایی بالایی داشته باشد. این یک متن نمونه برای تست فونت
            وزیرمتن است. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از
            طراحان گرافیک است.
          </p>
          <p className="text-sm text-muted-foreground">
            Small / Muted - متن‌های توضیحی و کم‌اهمیت‌تر.
          </p>
        </div>
      </section>

      {/* Colors */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Colors & Palettes</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-primary text-primary-foreground shadow-lg">
            Primary (Royal Blue)
          </div>
          <div className="p-4 rounded-lg bg-secondary text-secondary-foreground">
            Secondary (Soft Gray)
          </div>
          <div className="p-4 rounded-lg bg-accent text-accent-foreground">
            Accent (Hover State)
          </div>
          <div className="p-4 rounded-lg bg-destructive text-destructive-foreground">
            Destructive (Red)
          </div>
          <div className="p-4 rounded-lg bg-card text-card-foreground border shadow-sm">
            Card Background
          </div>
          <div className="p-4 rounded-lg bg-muted text-muted-foreground">Muted Background</div>
          <div className="p-4 rounded-lg bg-background text-foreground border shadow-sm">
            Main Background
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button>Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="destructive">Destructive</Button>
          <Button disabled>Disabled</Button>
          <Button size="lg">Large Button</Button>
          <Button size="sm">Small</Button>
        </div>
      </section>

      {/* Forms & Inputs */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Forms & Inputs</h2>
        <div className="grid max-w-sm w-full gap-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="ایمیل خود را وارد کنید..." dir="rtl" />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="******"
              dir="ltr"
              className="text-left"
            />
            <p className="text-xs text-muted-foreground text-right">
              رمز عبور باید حداقل ۸ کاراکتر باشد.
            </p>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Cards</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>عنوان کارت</CardTitle>
              <CardDescription>توضیحات کوتاه درباره محتوای کارت</CardDescription>
            </CardHeader>
            <CardContent>
              <p>محتوای اصلی کارت در این قسمت قرار می‌گیرد.</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">اقدام</Button>
            </CardFooter>
          </Card>

          <Card className="shadow-lg border-primary/20">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>کارت ویژه</CardTitle>
                <Badge>محبوب</Badge>
              </div>
              <CardDescription>طراحی با سایه بیشتر برای تاکید</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>ویژگی اول</li>
                <li>ویژگی دوم پیشرفته</li>
                <li>پشتیبانی ۲۴ ساعته</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">
                مشاهده جزئیات
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
}
