import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { config } from '../../../utils';

export const dynamic = 'force-dynamic';

export const POST = (req: NextRequest): NextResponse => {
  const searchParams = req.nextUrl.searchParams;
  if (!searchParams.has('secret')) {
    return NextResponse.json({ message: 'Missing secret' }, { status: 400 });
  }

  const paramsSecret = searchParams.get('secret');
  const serverSecret = config.runtimeSecret;

  console.info({ paramsSecret, serverSecret });

  if (!paramsSecret) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 400 });
  }

  if (paramsSecret !== serverSecret) {
    return NextResponse.json({ message: 'Wrong secret' }, { status: 400 });
  }

  if (!searchParams.has('tag')) {
    return NextResponse.json({ message: 'Missing tag' }, { status: 400 });
  }
  const tag = searchParams.get('tag');

  if (!tag) {
    return NextResponse.json({ message: 'Invalid tag' }, { status: 400 });
  }

  revalidateTag(tag);
  console.info(`> Revalidando: '${tag}' `);
  return NextResponse.json({
    message: `Revalidated Tag successfully at ${new Date()}`,
    tag
  });
};
