/**
 * Toast notification component for showing success/error messages
 */

import React, { useEffect, useState } from "react";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}

interface ToastProps {
  messages: ToastMessage[];
  onRemove: (id: string) => void;
  duration?: number;
}

export function Toast({ messages, onRemove, duration = 3000 }: ToastProps) {
  useEffect(() => {
    messages.forEach((message) => {
      const timer = setTimeout(() => {
        onRemove(message.id);
      }, duration);
      return () => clearTimeout(timer);
    });
  }, [messages, onRemove, duration]);

  if (messages.length === 0) return null;

  const getColor = (type: ToastMessage["type"]) => {
    switch (type) {
      case "success":
        return "#10b981"; // green
      case "error":
        return "#ef4444"; // red
      case "info":
        return "#3b82f6"; // blue
      default:
        return "#6b7280"; // gray
    }
  };

  const getIcon = (type: ToastMessage["type"]) => {
    switch (type) {
      case "success":
        return "✓";
      case "error":
        return "✕";
      case "info":
        return "ℹ";
      default:
        return "";
    }
  };

  const containerStyle: React.CSSProperties = {
    position: "fixed",
    top: "20px",
    right: "20px",
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "400px",
    width: "100%",
  };

  const toastStyle: React.CSSProperties = {
    padding: "12px 20px",
    borderRadius: "8px",
    color: "white",
    backgroundColor: "#1f2937",
    borderLeft: `4px solid ${getColor(messages[0]?.type || "info")}`,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    animation: "slideIn 0.3s ease-out",
  };

  const iconStyle: React.CSSProperties = {
    fontSize: "18px",
    fontWeight: "bold",
    color: getColor(messages[0]?.type || "info"),
    flexShrink: 0,
  };

  const messageStyle: React.CSSProperties = {
    fontSize: "14px",
    flex: 1,
  };

  const closeStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    color: "#9ca3af",
    cursor: "pointer",
    fontSize: "18px",
    padding: "0 4px",
  };

  return (
    <div style={containerStyle}>
      {messages.map((msg) => (
        <div key={msg.id} style={toastStyle}>
          <span style={iconStyle}>{getIcon(msg.type)}</span>
          <span style={messageStyle}>{msg.message}</span>
          <button style={closeStyle} onClick={() => onRemove(msg.id)}>
            ×
          </button>
        </div>
      ))}
    </div>
  );
}