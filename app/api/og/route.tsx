import { ImageResponse } from 'next/server';
// App router includes @vercel/og.
// No need to install it.

export const runtime = 'edge';

export async function GET(): Promise<ImageResponse> {
  const imageData = await fetch(new URL('./icon.png', import.meta.url)).then(
    res => res.arrayBuffer()
  );

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: '#111827',
          backgroundSize: '150px 150px',
          height: '100%',
          width: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          flexWrap: 'nowrap'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            justifyItems: 'center'
          }}
        >
          <img
            alt="QMP"
            height={256}
            src={imageData}
            style={{ margin: '0 30px' }}
            width={256}
          />
        </div>
        <div
          style={{
            fontSize: 86,
            fontStyle: 'normal',
            fontWeight: 'bold',
            letterSpacing: '-0.025em',
            color: '#EEE7D8',
            marginTop: 30,
            padding: '0 120px',
            lineHeight: 1.4,
            whiteSpace: 'pre-wrap'
          }}
        >
          ¿Qué me pongo?
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630
    }
  );
}
