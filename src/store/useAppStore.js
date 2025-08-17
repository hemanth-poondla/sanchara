// src/store/useAppStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAppStore = create(
  persist(
    (set) => ({
      // Theme
      darkMode: false,
      toggleDarkMode: () =>
        set((state) => ({ darkMode: !state.darkMode })),

      // Auth
      authUser: null,
      setAuthUser: (user) => set({ authUser: user }),
      logout: () => set({ authUser: null }),

      // Trip
      activeTrip: null,
      setActiveTrip: (trip) => set({ activeTrip: trip }),

      // Modals
      modals: {
        expense: false,
        settings: false,
      },
      toggleModal: (modalName) =>
        set((state) => ({
          modals: {
            ...state.modals,
            [modalName]: !state.modals[modalName],
          },
        })),

      // Payment
      paymentStatus: null,
      setPaymentStatus: (status) => set({ paymentStatus: status }),

      // Regeneration usage
      regenerateUsed: false,
      setRegenerateUsed: (value) => set({ regenerateUsed: value }),

      // Toasts
      toast: null,
      setToast: (message) => set({ toast: message }),
      clearToast: () => set({ toast: null }),
    }),
    {
      name: 'tripwizard-store', // Key in localStorage
    }
  )
);

export default useAppStore;
