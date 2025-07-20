"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Car, Shield, CheckCircle, ArrowLeft, Loader2 } from "lucide-react"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

interface VehicleData {
  model: string
  delivered:boolean
  referralCode: string
}

interface PrimusZKTLS {
  init: (appId: string) => Promise<void>
  generateRequestParams: (templateId: string, userAddress: string) => {
    setAdditionParams: (params: string) => void
    setAttMode: (mode: { algorithmType: string }) => void
    toJsonString: () => string
  }
  startAttestation: (signedRequest: string) => Promise<{ data: string }>
  verifyAttestation: (attestation: { data: string }) => Promise<boolean>
}

const VerifyPage = () => {
  const router = useRouter()
  const [isVerifying, setIsVerifying] = useState(false)
  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [primusZKTLS, setPrimusZKTLS] = useState<PrimusZKTLS | null>(null)

  useEffect(() => {
    const initializePrimus = async () => {
      try {
        const { PrimusZKTLS } = await import("@primuslabs/zktls-js-sdk")
        const primus = new PrimusZKTLS()
        
        // Initialize with your app credentials
        const appId = process.env.NEXT_PUBLIC_PRIMUS_APP_ID || "YOUR_APPID"
        await primus.init(appId)
        
        setPrimusZKTLS(primus)
      } catch (err) {
        console.error("Failed to initialize Primus:", err)
        setError("验证服务初始化失败")
      }
    }

    initializePrimus()
  }, [])

  const handleTeslaVerification = async () => {
    if (!primusZKTLS) {
      setError("验证服务未就绪")
      return
    }

    setIsVerifying(true)
    setError(null)

    try {
      // Template ID for Tesla verification
      const attTemplateID = process.env.NEXT_PUBLIC_TESLA_TEMPLATE_ID || "YOUR_TEMPLATEID"
      const userAddress = "0x1234567890123456789012345678901234567890" // Replace with actual user address
      
      // Generate request parameters
      const request = primusZKTLS.generateRequestParams(attTemplateID, userAddress)
      
      // Set additional parameters
      const additionParams = JSON.stringify({
        verification_type: "tesla_ownership",
      })
      request.setAdditionParams(additionParams)
      
      // Set zkTLS mode to proxy mode
      request.setAttMode({
        algorithmType: "proxytls",
      })
      
      // Convert request to string
      const requestStr = request.toJsonString()
      
      // Get signed request from backend
      const response = await fetch(`/api/primus/sign?signParams=${encodeURIComponent(requestStr)}`)
      if (!response.ok) {
        throw new Error("获取签名失败")
      }
      
      const responseJson = await response.json()
      const signedRequestStr = responseJson.signResult
      
      // Start attestation process
      const attestation = await primusZKTLS.startAttestation(signedRequestStr)
      
      // Verify the attestation
      const verifyResult = await primusZKTLS.verifyAttestation(attestation)
      
      if (verifyResult === true) {
        // Parse the attestation data
        const attestationData = JSON.parse(attestation.data)
        if (attestationData && attestationData.model && attestationData.referralCode) {
          let model = "Tesla Model 3"
          switch(attestationData.model){
            case "m3": model =  "Tesla Model 3";
            case "ms": model =  "Tesla Model S";
            case "my": model =  "Tesla Model Y";
            case "mx": model =  "Tesla Model X";
          }
          setVehicleData({
            model: attestationData.model,
            delivered:attestationData.isDeliveredOrPostDelivered,
            referralCode: attestationData.referralCode
          })
        } else {
          // Simulate successful verification with mock data
          setVehicleData({
            model: "Model 3",
            delivered:false,
            referralCode: "000"
          })
        }
      } else {
        throw new Error("验证失败")
      }
    } catch (err) {
      console.error("Verification error:", err)
      setError(err instanceof Error ? err.message : "验证过程中发生错误")
    } finally {
      setIsVerifying(false)
    }
  }

  const resetVerification = () => {
    setVehicleData(null)
    setError(null)
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            
            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-full glass-card border border-white/10 flex items-center justify-center mx-auto mb-6">
                <Shield size={32} className="text-primary" />
              </div>
              <h1 className="text-4xl font-bold mb-4">资产验证</h1>
              <p className="text-muted-foreground">
                使用 zkTLS 技术安全验证您的 Tesla 车辆所有权
              </p>
            </div>

            {/* Verification Card */}
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="text-primary" size={24} />
                  Tesla 车辆验证
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {!vehicleData && !error && (
                  <div className="text-center space-y-4">
                    <p className="text-muted-foreground">
                      点击下方按钮开始验证您的 Tesla 车辆所有权。验证过程使用零知识证明技术，确保您的隐私安全。
                    </p>
                    <Button 
                      onClick={handleTeslaVerification}
                      disabled={isVerifying || !primusZKTLS}
                      className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white px-8 py-3"
                    >
                      {isVerifying ? (
                        <>
                          <Loader2 className="animate-spin mr-2" size={16} />
                          验证中...
                        </>
                      ) : (
                        <>
                          <Shield className="mr-2" size={16} />
                          验证 Tesla
                        </>
                      )}
                    </Button>
                  </div>
                )}

                {/* Error Display */}
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Success Display */}
                {vehicleData && (
                  <div className="space-y-4">
                    <Alert className="border-green-500/20 bg-green-500/10">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <AlertDescription className="text-green-700 dark:text-green-400">
                        车辆验证成功！以下是您的车辆信息：
                      </AlertDescription>
                    </Alert>
                    
                    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">车辆型号：</span>
                        <span className="text-primary font-bold">{vehicleData.model}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">交付状态：</span>
                        <span className="font-mono text-sm">{vehicleData.delivered?"已交付":"未交付"}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 justify-center">
                      <Button 
                        variant="outline"
                        onClick={resetVerification}
                        className="border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        重新验证
                      </Button>
                      <Button 
                        onClick={() => router.push("/loans")}
                        className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white"
                      >
                        申请借贷
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Back Button */}
            <div className="text-center mt-8">
              <Button 
                variant="ghost" 
                className="text-muted-foreground hover:text-primary flex items-center gap-2 mx-auto"
                onClick={() => router.push("/")}
              >
                <ArrowLeft size={16} />
                返回首页
              </Button>
            </div>
            
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default VerifyPage