import { create } from 'zustand'
import { Notification } from '@/model/notification'

type Store = {
  notifications: Notification[]
  initNotification: (notifications: Notification[]) => void;
  setNotification: (notification: Notification) => void;
  readNotification: (notificationId: number) => void;
}

export const useNotification = create<Store>((set) => ({
  notifications: [],
  initNotification: (notifications) => {
    set({ notifications });
  },
  setNotification: (notification) => {
    set((state) => ({
      notifications: [...state.notifications, notification],
    }));
  },
  readNotification: (notificationId) => {
    set((state) => ({
      notifications: state.notifications.map(notification =>
        notification.notificationId === notificationId
          ? { ...notification, readOrNot: true }
          : notification
      ),
    }));
  },
}));
