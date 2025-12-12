import { NextResponse } from 'next/server';
import { z } from 'zod';

import { trackServerEvent } from '@/lib/telemetry/trackServerEvent';
import { createClient } from '@/utils/supabase/server';

export const runtime = 'nodejs';

const feedbackSchema = z.object({
  message: z.string().min(1, 'message is required'),
  projectId: z.string().uuid().optional(),
  versionId: z.string().uuid().optional(),
});

export async function POST(req: Request) {
  const supabase = createClient();
  const startTime = Date.now();
  let userId: string | null = null;

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (!user) {
      console.error('User not authenticated:', authError);
      return NextResponse.json({ error: 'Unauthorized: User not logged in' }, { status: 401 });
    }

    userId = user.id;

    const body = await req.json();
    const parsed = feedbackSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request payload', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { message, projectId, versionId } = parsed.data;

    const { error: insertError } = await supabase.from('feedback').insert({
      user_id: user.id,
      project_id: projectId ?? null,
      version_id: versionId ?? null,
      message,
    });

    if (insertError) {
      console.error('Database Error (feedback insert):', insertError);
      await trackServerEvent({
        event: 'feedback_submitted',
        properties: {
          projectId: projectId ?? null,
          versionId: versionId ?? null,
          status: 'failed',
          error: insertError.message,
          durationMs: Date.now() - startTime,
        },
        userId,
        supabase,
      });
      return NextResponse.json({ error: 'Database error saving feedback' }, { status: 500 });
    }

    await trackServerEvent({
      event: 'feedback_submitted',
      properties: {
        projectId: projectId ?? null,
        versionId: versionId ?? null,
        status: 'success',
        durationMs: Date.now() - startTime,
      },
      userId,
      supabase,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error submitting feedback:', error);

    await trackServerEvent({
      event: 'feedback_submitted',
      properties: {
        status: 'error',
        error: error instanceof Error ? error.message : 'unknown_error',
        durationMs: Date.now() - startTime,
      },
      userId,
      supabase,
    });

    return NextResponse.json({ error: 'Failed to submit feedback' }, { status: 500 });
  }
}
