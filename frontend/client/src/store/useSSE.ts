import { create,  } from 'zustand';


interface SSEStore {
  sse: EventSource;
}

export const useSSE = create<SSEStore>((set) => ({
  sse: new EventSource(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/sse/subscribe`),
}));
