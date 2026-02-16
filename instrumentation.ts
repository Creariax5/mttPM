const isEnabledFlag = (value?: string) => value === 'true' || value === '1';

export async function register() {
  const isNodeRuntime = process.env['NEXT_RUNTIME'] === 'nodejs';
  const isProdFlag = isEnabledFlag(process.env['PRODUCTION']);
  const isDatadogFlag = isEnabledFlag(process.env['DATADOG_TRACING_ENABLED']);
  const isVercelProd = process.env['VERCEL'] === '1' && process.env['VERCEL_ENV'] === 'production';

  if (!isNodeRuntime || (!isProdFlag && !isDatadogFlag && !isVercelProd)) {
    return;
  }

  // Commented out for local development - package not available
  // await import('../../packages/globals/tracer');
  console.log('Instrumentation disabled for local development');
}

