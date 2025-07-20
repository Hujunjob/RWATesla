"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAccount } from "wagmi"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Car, Shield, CheckCircle, ArrowLeft, Loader2 } from "lucide-react"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { useTeslaRWA, type Attestation } from "@/hooks/useTeslaRWA"
import Image from "next/image"
import model3Image from "@/assets/model3.jpeg"

interface VehicleData {
  model: string
  delivered: boolean
  referralCode: string
}

interface PrimusZKTLS {
  init: (appId: string) => Promise<void>
  generateRequestParams: (templateId: string, userAddress: string) => {
    setAdditionParams: (params: string) => void
    setAttMode: (mode: { algorithmType: string }) => void
    toJsonString: () => string
  }
  startAttestation: (signedRequest: string) => Promise<Attestation>
  verifyAttestation: (attestation: Attestation) => Promise<boolean>
}

const VerifyPage = () => {
  const router = useRouter()
  const { address } = useAccount()
  const { submitToBlockchain, isSubmitting, isVerified, teslaInfo } = useTeslaRWA()
  const [isVerifying, setIsVerifying] = useState(false)
  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null)
  const [attestation, setAttestation] = useState<Attestation | null>(null)
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
      const userAddress = address || "0x1234567890123456789012345678901234567890"

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
        // Store the attestation for blockchain submission
        setAttestation(attestation)

        // Parse the attestation data
        const attestationData = JSON.parse(attestation.data)
        if (attestationData && attestationData.model && attestationData.referralCode) {
          let model = "Tesla Model 3"
          switch (attestationData.model) {
            case "m3":
              model = "Tesla Model 3";
              break;
            case "ms":
              model = "Tesla Model S";
              break;
            case "my":
              model = "Tesla Model Y";
              break;
            case "mx":
              model = "Tesla Model X";
              break;
          }
          setVehicleData({
            model: model,
            delivered: attestationData.isDeliveredOrPostDelivered === "true",
            referralCode: attestationData.referralCode
          })
        } else {
          // Simulate successful verification with mock data
          setVehicleData({
            model: "Tesla Model 3",
            delivered: false,
            referralCode: "hujunjob19256"
          })
          // Create mock attestation for testing
          setAttestation({
            recipient: userAddress,
            request: {
              url: "https://tesla.com/api",
              header: "{}",
              method: "GET",
              body: ""
            },
            reponseResolve: [],
            data: '{"isDeliveredOrPostDelivered":"true","referralCode":"hujunjob19256","model":"m3"}',
            attConditions: "{}",
            timestamp: BigInt(Date.now()),
            additionParams: "{}",
            attestors: [],
            signatures: []
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


  const handleSubmitToBlockchain = async () => {
    if (!attestation) {
      setError("没有可用的验证数据")
      return
    }

    if (!address) {
      setError("请先连接钱包")
      return
    }

    const success = await submitToBlockchain(attestation)
    if (success) {
      // Optionally redirect to a success page or show success message
      router.push("/loans")
    }
  }

  // 获取车型图片
  const getCarImage = (model: string) => {
    if (model.toLowerCase().includes("model 3") || model.includes("m3")) {
      return "/assets/model3.jpeg"
    }
    return "/assets/models.avif" // 默认图片
  }

  // 格式化车型名称
  const formatCarModel = (model: string) => {
    if (!model) return "未知型号"
    switch (model) {
      case "m3": return "Tesla Model 3";
      case "ms": return "Tesla Model S";
      case "my": return "Tesla Model Y";
      case "mx": return "Tesla Model X";
      default: return "Tesla Model 3";
    }
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

            {/* Existing Vehicle Display */}
            {isVerified && teslaInfo && (
              <Card className="glass-card border-green-500/20 bg-green-500/5 mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="text-green-500" size={24} />
                    已绑定的车辆
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-6 items-center">
                    <div className="relative w-32 h-20 rounded-lg overflow-hidden">
                      <img
                        src={model3Image.src}
                        alt="Tesla Model 3"
                        className="w-full h-full object-cover opacity-90"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-muted-foreground">车型：</span>
                        <span className="font-bold text-lg">{formatCarModel(teslaInfo.model)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-muted-foreground">交付状态：</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${teslaInfo.isDeliveredOrPostDelivered
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                          }`}>
                          {teslaInfo.isDeliveredOrPostDelivered ? "已交付" : "未交付"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-muted-foreground">验证时间：</span>
                        <span className="text-sm text-muted-foreground">
                          {new Date(Number(teslaInfo.timestamp) * 1000).toLocaleDateString('zh-CN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Verification Card */}
            {(!isVerified || vehicleData || error) && (
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="text-primary" size={24} />
                    {isVerified ? "重新验证车辆" : "Tesla 车辆验证"}
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

                      <div className="bg-muted/50 rounded-lg p-4 space-y-4">
                        <div className="flex gap-4 items-center">
                          <div className="relative w-24 h-16 rounded-lg overflow-hidden">
                            <Image
                              src={getCarImage(vehicleData.model)}
                              alt={vehicleData.model}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">车辆型号：</span>
                              <span className="text-primary font-bold">{vehicleData.model}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-medium">交付状态：</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${vehicleData.delivered
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                                }`}>
                                {vehicleData.delivered ? "已交付" : "未交付"}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-medium">推荐码：</span>
                              <span className="font-mono text-sm bg-muted px-2 py-1 rounded">{vehicleData.referralCode}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3 justify-center">
                        <Button
                          onClick={handleSubmitToBlockchain}
                          disabled={isSubmitting || !address || isVerified}
                          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="animate-spin mr-2" size={16} />
                              上链中...
                            </>
                          ) : isVerified ? (
                            "已上链"
                          ) : !address ? (
                            "请先连接钱包"
                          ) : (
                            "RWA资产上链"
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

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