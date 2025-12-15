'use server';

export interface MarketInputs {
  audience: string;
  region: string;
  priceRange: string;
  category: string;
}

export interface Competitor {
  name: string;
  strength: string;
  weakness: string;
}

export interface MarketAnalysis {
  segments: string[];
  differentiation: string[];
  positioning: string;
}

export interface MarketReport {
  inputs: MarketInputs;
  competitors: Competitor[];
  analysis: MarketAnalysis;
}

import { logAudit } from '@/lib/audit';

export async function generateMarketAnalysis(
  projectId: string,
  inputs: MarketInputs
): Promise<MarketReport> {
  // In a real app, we would call an AI API here using the inputs + project context.
  // For V1, we simulate "AI" by returning structured templates based on Category.

  await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate AI delay

  const categorylower = inputs.category.toLowerCase();

  let competitors: Competitor[] = [];
  let segments: string[] = [];
  let differentiation: string[] = [];
  let positioning = '';

  if (
    categorylower.includes('shop') ||
    categorylower.includes('ecommerce') ||
    categorylower.includes('فروشگاه')
  ) {
    competitors = [
      {
        name: 'Digikala / دیجی‌کالا',
        strength: 'لجستیک قوی، تنوع بالا',
        weakness: 'کمیسیون بالا، پشتیبانی ضعیف',
      },
      {
        name: 'Torob / ترب',
        strength: 'موتور جستجوی قیمت، ترافیک بالا',
        weakness: 'عدم فروش مستقیم',
      },
    ];
    segments = ['خریداران حساس به قیمت', 'عاشقان تکنولوژی', 'خرید عمده سازمانی'];
    differentiation = ['ارسال فوق سریع', 'تضمین اصالت کالا', 'پشتیبانی اختصاصی'];
    positioning = `پلتفرم ${inputs.category} با تمرکز بر ${inputs.region} برای ${inputs.audience}`;
  } else if (
    categorylower.includes('food') ||
    categorylower.includes('غذا') ||
    categorylower.includes('رستوران')
  ) {
    competitors = [
      {
        name: 'SnappFood / اسنپ‌فود',
        strength: 'شبکه گسترده، سوپر اپ',
        weakness: 'کمیسیون بالا برای رستوران‌ها',
      },
      { name: 'Delino / دلینو', strength: 'رابط کاربری خوب', weakness: 'پوشش منطقه‌ای کمتر' },
    ];
    segments = ['کارمندان اداری', 'خانواده‌های پرمشغله', 'گیاهخواران'];
    differentiation = ['غذای خانگی و سالم', 'بسته‌بندی بازیافتی', 'منوی اقتصادی'];
    positioning = `تجربه‌ی غذایی متفاوت در ${inputs.region} برای ${inputs.audience}`;
  } else {
    // Default / Generic
    competitors = [
      { name: 'رقیب سنتی بازار', strength: 'قدمت و و اعتبار', weakness: 'فناوری قدیمی و کند' },
      { name: 'استارتاپ نوظهور', strength: 'قیمت پایین', weakness: 'عدم اعتماد بازار' },
    ];
    segments = ['پذیرندگان اولیه (Early Adopters)', 'کسب‌وکارهای کوچک (SME)', 'بخش سازمانی'];
    differentiation = ['رابط کاربری ساده‌تر', 'قیمت رقابتی', 'پشتیبانی ۲۴ ساعته'];
    positioning = `راهکاری هوشمندانه برای ${inputs.audience} در بازار ${inputs.category}`;
  }

  await logAudit('GENERATE_MARKET', projectId, { inputs });

  return {
    inputs,
    competitors,
    analysis: {
      segments,
      differentiation,
      positioning,
    },
  };
}
