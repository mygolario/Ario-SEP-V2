import {
  JourneyPlan,
  UserProfile,
  JourneySection,
  JourneyBlock,
} from '@/lib/validators/businessPlan';
import { JOURNEY_BLOCKS } from './blocks/library';

export class JourneyEngine {
  private seed: number;

  constructor(seed?: number) {
    this.seed = seed || Date.now();
  }

  private shouldIncludeBlock(block: JourneyBlock): boolean {
    const tags = block.metadata?.tags || [];

    // Always include 'general'
    if (tags.includes('general')) return true;

    // Industry match
    if (tags.includes('online')) {
      // If profile industry implies online or user selected specific online goals
      // For beta, let's assume 'general' acts as fallback, but if 'online' is tagged,
      // check if industry is NOT purely offline (like 'retail_store' without 'online' goal)
      // For simplicity in Phase 6: simplistic keyword matching
      return true; // We default to robust plans for now
    }

    // TODO: Add more complex rules based on 'budget', 'city' etc.
    return true;
  }

  public generate(profile: UserProfile): JourneyPlan {
    const sections: JourneySection[] = [];
    const usedBlocks = new Set<string>();

    // 1. Executive Summary Section
    const summaryBlocks = JOURNEY_BLOCKS.filter((b) => b.metadata?.tags?.includes('intro'));
    sections.push({
      id: 'sec_executive',
      title: 'خلاصه مدیریتی و نقشه راه',
      blocks: summaryBlocks,
      isCollapsed: false, // Always open
    });
    summaryBlocks.forEach((b) => usedBlocks.add(b.id));

    // 2. Action Plan Section
    const actionBlocks = JOURNEY_BLOCKS.filter(
      (b) => !usedBlocks.has(b.id) && this.shouldIncludeBlock(b) && b.metadata?.actionable
    );

    if (actionBlocks.length > 0) {
      sections.push({
        id: 'sec_action',
        title: 'گام‌های اجرایی و چک‌لیست‌ها',
        description: 'اقدامات ضروری برای راه‌اندازی قانونی و اصولی',
        blocks: actionBlocks,
        isCollapsed: true,
      });
      actionBlocks.forEach((b) => usedBlocks.add(b.id));
    }

    // 3. Other Blocks (Financial, etc that weren't caught above if any)
    const remainingBlocks = JOURNEY_BLOCKS.filter(
      (b) => !usedBlocks.has(b.id) && this.shouldIncludeBlock(b)
    );

    if (remainingBlocks.length > 0) {
      sections.push({
        id: 'sec_details',
        title: 'جزئیات تکمیلی',
        blocks: remainingBlocks,
        isCollapsed: true,
      });
    }

    return {
      id: crypto.randomUUID(),
      userProfile: profile,
      sections,
      createdAt: new Date().toISOString(),
      seed: this.seed,
    };
  }
}

// Helper to fill template variables
export function hydrateContent(content: string, vars: Record<string, string>): string {
  return content.replace(/{{(\w+)}}/g, (_, key) => vars[key] || `[${key}]`);
}
