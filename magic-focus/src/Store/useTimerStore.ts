import { create } from 'zustand';

interface TimerState {
  timeLeft: number;
  isRunning: boolean;
  buildingsCount: number;
  setRunning: (status: boolean) => void;
  tick: () => void;
  reset: () => void;
  addBuilding: () => void;
  setTimeLeft: (seconds: number) => void;
}

export const useTimerStore = create<TimerState>((set) => ({
  // 1. تعديل القيمة الابتدائية هنا عشان أول ما تفتحي الصفحة تلاقي 3 ثواني
  timeLeft: 3, 
  isRunning: false,
  buildingsCount: 0,
  
  setRunning: (status) => set({ isRunning: status }),
  
  tick: () => set((state) => ({ 
    timeLeft: state.timeLeft > 0 ? state.timeLeft - 1 : 0 
  })),
  
  // 2. تعديل قيمة الريسيت هنا عشان لما تدوسي على زرار الـ Reset يرجع لـ 3 ثواني
  reset: () => set({ timeLeft: 3, isRunning: false }),
  
  addBuilding: () => set((state) => ({ 
    buildingsCount: state.buildingsCount + 1 
  })),

  setTimeLeft: (seconds) => set({ timeLeft: seconds }),
}));