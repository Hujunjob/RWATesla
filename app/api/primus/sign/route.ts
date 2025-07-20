import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Get the signParams from query parameters
    const searchParams = request.nextUrl.searchParams
    const signParams = searchParams.get('signParams')
    
    if (!signParams) {
      return NextResponse.json(
        { error: 'Missing signParams parameter' },
        { status: 400 }
      )
    }

    // Initialize Primus zkTLS SDK
    const { PrimusZKTLS } = await import('@primuslabs/zktls-js-sdk')
    const primusZKTLS = new PrimusZKTLS()
    
    // Get app credentials from environment variables
    const appId = process.env.PRIMUS_APP_ID || "YOUR_APPID"
    const appSecret = process.env.PRIMUS_APP_SECRET || "YOUR_SECRET"
    
    // Initialize with app credentials
    await primusZKTLS.init(appId, appSecret)
    
    // Sign the request parameters
    const signResult = await primusZKTLS.sign(signParams)
    
    return NextResponse.json({ signResult })
    
  } catch (error) {
    console.error('Primus signing error:', error)
    return NextResponse.json(
      { error: 'Failed to sign request' },
      { status: 500 }
    )
  }
}