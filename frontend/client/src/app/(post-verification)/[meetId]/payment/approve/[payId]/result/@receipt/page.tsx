'use client';

import Receipt from '@/app/(post-verification)/[meetId]/payment/approve/[payId]/component/Receipt';
import * as styles from '@/styles/payment/result/receipt.css';
import ModalCloseButton from '@/app/(post-verification)/[meetId]/payment/approve/[payId]/component/ModalCloseButton';
import { useReceiptModal } from '@/store/useReceiptModal';

type Props = {
  params: { payId: string },
}
export default function Page({ params }: Props) {
  const { payId } = params;
  const { isVisible, updateState } = useReceiptModal();
  return (<div className={`${isVisible ? styles.container.visible : styles.container.invisible}`}>
    <div className={`${isVisible ? styles.modal.visible : styles.modal.invisible}`}>
      <div className="flex justify-between">
        <div/>
        <div/>
        <ModalCloseButton />
      </div>
      <Receipt payId={payId} />
    </div>
  </div>);
}