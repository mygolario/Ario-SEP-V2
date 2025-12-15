'use server';

import { isProUser } from '@/lib/subscription';
import { logAudit } from '@/lib/audit';
import * as Sentry from '@sentry/nextjs';

export interface AIReviewResult {
  score: number;
  critique: string[];
  suggestions: string[];
}

export async function generateExpertPlanTemplate(
  projectId: string
): Promise<Record<string, string>> {
  try {
    const isPro = await isProUser();
    if (!isPro) throw new Error('Subscription required');

    // Use projectId to satisfy lint
    console.log(`Generating template for project: ${projectId}`);

    // Mock AI generation
    // In real app, we would parse this better or use schema mode
    // For now, we return mock/parsed
    await new Promise((resolve) => setTimeout(resolve, 1500));

    await logAudit('GENERATE_EXPERT_PLAN', projectId);

    const mockTemplate = {
      executive_summary: 'خلاصه مدیریتی پروژه شما با توجه به پتانسیل‌های بازار...',
      problem: 'مشکل اصلی که مشتریان شما با آن روبرو هستند عبارت است از...',
      solution: 'راهکار پیشنهادی شما شامل...',
      market_analysis: 'تحلیل بازار نشان می‌دهد که...',
      gtm_strategy: 'استراتژی ورود به بازار شامل...',
      financials: 'مدل مالی و جریان‌های درآمدی...',
      risks: 'ریسک‌های احتمالی و راهکارهای مقابله...',
    };
    return mockTemplate;
  } catch (error) {
    Sentry.captureException(error);
    throw error;
  }
}

export async function reviewSection(sectionKey: string, content: string): Promise<AIReviewResult> {
  const isPro = await isProUser();
  if (!isPro) throw new Error('Subscription required');

  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Mock Review Logic
  const length = content.length;
  let score = 0;
  const critique = [];
  const suggestions = [];

  if (length < 50) {
    score = 30;
    critique.push('محتوای بخش بسیار کوتاه است.');
    suggestions.push('لطفا جزئیات بیشتری درباره موضوع ارائه دهید.');
  } else if (length < 200) {
    score = 70;
    critique.push('پوشش موضوع خوب است اما می‌تواند عمیق‌تر باشد.');
    suggestions.push('استفاده از آمار و ارقام می‌تواند به اعتبار متن کمک کند.');
  } else {
    score = 95;
    critique.push('پوشش جامع و عالی.');
    suggestions.push('متن بسیار حرفه‌ای نوشته شده است.');
  }

  return { score, critique, suggestions };
}
