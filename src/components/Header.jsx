"use client";

import React from "react";
import Image from "next/image";
import { Database, CheckCircle, PlusCircle } from "lucide-react";

export default function Header({
  ownedCount = 0,
  displayCount = 0,
  totalCoins = 264962,
  onAddCoin, // NEW PROP
}) {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="app-title">
            <div className="app-icon">
              <Image
                src="/logo.svg"
                width={48}
                height={48}
                alt="Logo"
                priority
              />
            </div>
            <span className="title-denarii">Denarii</span>
            <span className="title-district"> District</span>
          </h1>

          <div className="app-subtitle">
            <Database size={16} className="text-gold" />
            <span style={{ fontWeight: 600 }}>
              {totalCoins.toLocaleString()} coins in database
            </span>

            {ownedCount > 0 && (
              <span className="owned-count">
                <CheckCircle size={14} />
                {ownedCount} owned
              </span>
            )}
          </div>
        </div>

        <div className="header-stats">
          {/* NEW: Add Coin Button (Only shows if onAddCoin is provided) */}
          {onAddCoin && (
            <button 
              onClick={onAddCoin}
              className="stat-badge"
              style={{ 
                cursor: "pointer", 
                borderColor: "var(--brand-gold)", 
                background: "#fffbeb",
                flexDirection: "row",
                gap: "0.5rem"
              }}
            >
              <PlusCircle size={20} className="text-gold" />
              <span className="stat-value" style={{ fontSize: "0.9rem" }}>Add Coin</span>
            </button>
          )}

          <div className="stat-badge">
            <span className="stat-label">Showing</span>
            {/* Defensive check for displayCount */}
            <span className="stat-value">{(displayCount || 0).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </header>
  );
}