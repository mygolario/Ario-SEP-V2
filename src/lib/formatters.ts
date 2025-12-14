export function toPersianDigits(str: string | number): string {
  if (str === null || str === undefined) return '';
  const s = String(str);
  return s.replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d, 10)]);
}

export function toEnglishDigits(str: string): string {
  if (!str) return '';
  return str.replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)));
}

export function formatJalaliDate(date: Date | string | number): string {
  if (!date) return '';
  const d = new Date(date);
  return new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}

export function formatCurrency(amount: number): string {
  return toPersianDigits(new Intl.NumberFormat('fa-IR').format(amount));
}
