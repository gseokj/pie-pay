import create from 'zustand';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { Notification } from '@/model/notification';

type Store = {
  eventSource: EventSourcePolyfill | null;
  SSEnotification: Notification | null;
  setEventSource: (token: string | null) => void;
  setSSENotification: (message: Notification | null) => void;
};

export const useSSE = create<Store>((set) => {
  let source: EventSourcePolyfill | null = null;
  let connected: boolean = false;

  const connect = (token: string | null) => {
    if (!token || connected) return;

    source = new EventSourcePolyfill(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/sse/subscribe`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    source.addEventListener('connected', (event: any) => {
      console.log("연결성공!");
      connected = true;
    });

    source.addEventListener('[알림]', (event: any) => {
      const notificationData: Notification = JSON.parse(event.data);
      set((state) => ({ SSEnotification: notificationData }));
    });


  };

  return {
    eventSource: source,
    SSEnotification: null,
    setEventSource: (token: string | null) => {
      connect(token);
    },
    setSSENotification: (message: Notification | null) => {
      set({ SSEnotification: message });
    },
  };
});

