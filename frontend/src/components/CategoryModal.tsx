/**
 * Modal component for adding a new category
 */

import React, { useState } from "react";
import { Modal, TextField, Button } from "../vibes";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoryCreated: (categoryName: string) => void;
  isCreating: boolean;
}

export function CategoryModal({
  isOpen,
  onClose,
  onCategoryCreated,
  isCreating,
}: CategoryModalProps) {
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedName = categoryName.trim();
    if (!trimmedName) {
      setError("Category name is required");
      return;
    }

    if (trimmedName.length < 2) {
      setError("Category name must be at least 2 characters");
      return;
    }

    setError("");
    onCategoryCreated(trimmedName);
  };

  const handleClose = () => {
    setCategoryName("");
    setError("");
    onClose();
  };

  const modalStyle: React.CSSProperties = {
    maxWidth: "400px",
    width: "100%",
  };

  const formStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  };

  const buttonGroupStyle: React.CSSProperties = {
    display: "flex",
    gap: "0.5rem",
    marginTop: "0.5rem",
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New Category">
      <div style={modalStyle}>
        <form onSubmit={handleSubmit} style={formStyle}>
          <TextField
            label="Category Name"
            type="text"
            placeholder="e.g., Groceries, Rent, Subscription"
            value={categoryName}
            onChange={(e) => {
              setCategoryName(e.target.value);
              if (error) setError("");
            }}
            error={error}
            fullWidth
            required
            autoFocus
          />

          <div style={buttonGroupStyle}>
            <Button
              type="submit"
              variant="primary"
              disabled={isCreating || !categoryName.trim()}
              fullWidth
            >
              {isCreating ? "Creating..." : "Add Category"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
              disabled={isCreating}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}