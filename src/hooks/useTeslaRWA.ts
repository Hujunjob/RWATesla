import { useWriteContract, useReadContract, useAccount } from 'wagmi';
import { TESLA_RWA_ABI, TESLA_RWA_CONTRACT_ADDRESS } from '@/lib/contracts';
import { toast } from 'sonner';

export interface Attestation {
  recipient: string;
  request: {
    url: string;
    header: string;
    method: string;
    body: string;
  };
  reponseResolve: Array<{
    keyName: string;
    parseType: string;
    parsePath: string;
  }>;
  data: string;
  attConditions: string;
  timestamp: bigint;
  additionParams: string;
  attestors: Array<{
    attestorAddr: string;
    url: string;
  }>;
  signatures: string[];
}

export interface TeslaInfo {
  model: string;
  isDeliveredOrPostDelivered: boolean;
  timestamp: bigint;
  verified: boolean;
}

export function useTeslaRWA() {
  const { address } = useAccount();
  const { writeContract, isPending: isSubmitting } = useWriteContract();

  // 检查用户是否已验证
  const { data: isVerified, refetch: refetchVerified } = useReadContract({
    address: TESLA_RWA_CONTRACT_ADDRESS,
    abi: TESLA_RWA_ABI,
    functionName: 'isUserVerified',
    args: address ? [address] : undefined,
  });

  // 获取用户特斯拉信息
  const { data: teslaInfo, refetch: refetchTeslaInfo } = useReadContract({
    address: TESLA_RWA_CONTRACT_ADDRESS,
    abi: TESLA_RWA_ABI,
    functionName: 'getUserTeslaInfo',
    args: address ? [address] : undefined,
  }) as { data: TeslaInfo | undefined; refetch: () => void };

  // 获取用户推荐码
  const { data: referralCode } = useReadContract({
    address: TESLA_RWA_CONTRACT_ADDRESS,
    abi: TESLA_RWA_ABI,
    functionName: 'userReferralCodes',
    args: address ? [address] : undefined,
  });

  // 提交特斯拉验证到链上
  const submitToBlockchain = async (attestation: Attestation) => {
    if (!address) {
      toast.error('请先连接钱包');
      return false;
    }

    try {
      await writeContract({
        address: TESLA_RWA_CONTRACT_ADDRESS,
        abi: TESLA_RWA_ABI,
        functionName: 'verifyTeslaOwnership',
        args: [attestation],
      });

      toast.success('特斯拉资产上链成功！');
      
      // 刷新数据
      refetchVerified();
      refetchTeslaInfo();
      
      return true;
    } catch (error) {
      console.error('上链失败:', error);
      toast.error('上链失败，请重试');
      return false;
    }
  };

  return {
    isVerified: !!isVerified,
    teslaInfo,
    referralCode,
    submitToBlockchain,
    isSubmitting,
    refetch: () => {
      refetchVerified();
      refetchTeslaInfo();
    }
  };
}