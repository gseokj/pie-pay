// Zustand를 사용하여 소켓 통신 상태를 관리하는 파일 (socketStore.ts)
import create from 'zustand';
import * as Stomp from "@stomp/stompjs";

import { Payment } from '@/model/participant';
import { usePayment } from '@/store/usePayment';
interface ParticipantSocketRes {
  payId:number;
  participantId:number;
  payAgree:boolean;
  payStatus: "OPEN" | "ING" | "COMPLETE" | "CLOSE";
}
type SocketState = {
  client: Stomp.Client | null;
  payment: Payment | null;
  connect: (payId: number) => void;
  send: (payId:number, participantId:number, payAgree:boolean) => void;
  init : (payId:number) => void;
  res: ParticipantSocketRes | null;
};

export const usePaymentSocket = create<SocketState>((set) => ({
  client: null,
  payment: null,
  res: null,
  connect: (payId: number) => {
    const clientdata = new Stomp.Client({
      brokerURL: `ws://localhost:8080/pay`,
      connectHeaders: {},
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    clientdata.onConnect = function () {
      clientdata.subscribe(`/sub/${payId}`, (message: any) => {
        const res = JSON.parse(message.body);
        set((state) => ({ ...state, res }));
      });

      clientdata.subscribe(`/sub/initialData/${payId}`, (message: any) => {
        const res = JSON.parse(message.body);
        set((state) => ({ ...state, res }));
      });
    };

    clientdata.activate();
    set((state) => ({ ...state, client: clientdata }));
  },
  send: (payId:number, participantId:number, payAgree:boolean) => {
    set((state) => {
      if (state.client) {
        state.client.publish({
          destination: "/pub/agree",
          body: JSON.stringify({
            payId:payId,
            participantId: participantId,
            payAgree: payAgree,
          }),
        });
      }
      return state;
    });
  },
  init: (payId:number) => {
    set((state) => {
      if (state.client) {
        state.client.publish({
          destination: `/pub/initialData/${payId}`,
        });
      }
      return state;
    });
  },
}));
