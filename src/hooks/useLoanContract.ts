import { useWriteContract, useReadContract, useAccount } from 'wagmi';
import { LOAN_CONTRACT_ABI, LOAN_CONTRACT_ADDRESS } from '@/lib/contracts';
import { toast } from 'sonner';

export interface LoanInfo {
  amount: bigint;
  timestamp: bigint;
  active: boolean;
  teslaModel: string;
}

export function useLoanContract() {
  const { address } = useAccount();
  const { writeContract, isPending: isRequestingLoan } = useWriteContract();

  // 检查用户是否有贷款
  const { data: hasLoan, refetch: refetchHasLoan } = useReadContract({
    address: LOAN_CONTRACT_ADDRESS,
    abi: LOAN_CONTRACT_ABI,
    functionName: 'hasLoan',
    args: address ? [address] : undefined,
  });

  // 获取用户贷款信息
  const { data: loanInfo, refetch: refetchLoanInfo } = useReadContract({
    address: LOAN_CONTRACT_ADDRESS,
    abi: LOAN_CONTRACT_ABI,
    functionName: 'getUserLoanInfo',
    args: address ? [address] : undefined,
  }) as { data: LoanInfo | undefined; refetch: () => void };

  // 获取贷款金额
  const { data: loanAmount } = useReadContract({
    address: LOAN_CONTRACT_ADDRESS,
    abi: LOAN_CONTRACT_ABI,
    functionName: 'getLoanAmount',
  });

  // 获取合约余额
  const { data: contractBalance } = useReadContract({
    address: LOAN_CONTRACT_ADDRESS,
    abi: LOAN_CONTRACT_ABI,
    functionName: 'getContractBalance',
  });

  // 请求贷款
  const requestLoan = async () => {
    if (!address) {
      toast.error('请先连接钱包');
      return false;
    }

    try {
      await writeContract({
        address: LOAN_CONTRACT_ADDRESS,
        abi: LOAN_CONTRACT_ABI,
        functionName: 'requestLoan',
      });

      toast.success('贷款申请成功！');
      
      // 刷新数据
      refetchHasLoan();
      refetchLoanInfo();
      
      return true;
    } catch (error: unknown) {
      console.error('贷款申请失败:', error);
      let errorMessage = '贷款申请失败，请重试';
      
      if (error instanceof Error) {
        if (error.message?.includes('User already has an active loan')) {
          errorMessage = '您已经有一个活跃的贷款';
        } else if (error.message?.includes('User must have verified Tesla')) {
          errorMessage = '请先验证您的特斯拉车辆';
        } else if (error.message?.includes('Insufficient contract balance')) {
          errorMessage = '合约余额不足';
        }
      }
      
      toast.error(errorMessage);
      return false;
    }
  };

  // 还款
  const repayLoan = async () => {
    if (!address || !loanAmount) {
      toast.error('请先连接钱包');
      return false;
    }

    try {
      await writeContract({
        address: LOAN_CONTRACT_ADDRESS,
        abi: LOAN_CONTRACT_ABI,
        functionName: 'repayLoan',
        value: loanAmount,
      });

      toast.success('还款成功！');
      
      // 刷新数据
      refetchHasLoan();
      refetchLoanInfo();
      
      return true;
    } catch (error) {
      console.error('还款失败:', error);
      toast.error('还款失败，请重试');
      return false;
    }
  };

  return {
    hasLoan: !!hasLoan,
    loanInfo,
    loanAmount,
    contractBalance,
    requestLoan,
    repayLoan,
    isRequestingLoan,
    refetch: () => {
      refetchHasLoan();
      refetchLoanInfo();
    }
  };
}