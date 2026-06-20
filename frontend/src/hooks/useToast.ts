/**
 * Custom hook for managing toast notifications
 */

import { useState, useCallback } from "react";
import { ToastMessage } from "../components/Toast";

export function useToast() {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const showToast = useCallback((type: ToastMessage["type"], message: string) => {
    const id = Date.now().toString();
    setMessages((prev) => [...prev, { id, type, message }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  }, []);

  const showSuccess = useCallback((message: string) => {
    showToast("success", message);
  }, [showToast]);

  const showError = useCallback((message: string) => {
    showToast("error", message);
  }, [showToast]);

  const showInfo = useCallback((message: string) => {
    showToast("info", message);
  }, [showToast]);

  return {
    messages,
    showToast,
    removeToast,
    showSuccess,
    showError,
    showInfo,
  };
}