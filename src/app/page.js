"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Header from "../components/Header";
import FilterBar from "../components/FilterBar";
import CoinGallery from "../components/CoinGallery";
import { useCoins } from "../hooks/useCoins";
import { supabase } from "../lib/supabaseClient";

// Lazy Load Modals
const CoinModal = dynamic(() => import("../components/CoinModal"), { ssr: false });
const AddCoinModal = dynamic(() => import("../components/AddCoinModal"), { ssr: false });

export default function Home() {
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [session, setSession] = useState(null);

  // AUTH CHECK ON MOUNT
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const {
    coins,
    loading,
    filters,
    setFilters,
    metadata,
    ownedCount,
    isExploreMode,
  } = useCoins();

  return (
    <div className="app-container">
      <Header 
        ownedCount={ownedCount} 
        displayCount={coins?.length || 0}
        // Only pass the handler if the user is logged in
        onAddCoin={session ? () => setIsAddModalOpen(true) : null}
      />

      <main className="main-content">
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          metadata={metadata}
          viewMode={viewMode}
          setViewMode={setViewMode}
          isExploreMode={isExploreMode}
        />

        <CoinGallery
          coins={coins || []}
          loading={loading}
          categories={metadata.categories}
          onCoinClick={setSelectedCoin}
          viewMode={viewMode}
          setViewMode={setViewMode}
          sortBy={filters.sortBy}
        />
      </main>

      {/* View Coin Modal */}
      {selectedCoin && (
        <CoinModal coin={selectedCoin} onClose={() => setSelectedCoin(null)} />
      )}
      
      {/* Add Coin Modal */}
      {isAddModalOpen && (
        <AddCoinModal onClose={() => setIsAddModalOpen(false)} />
      )}

      <footer className="app-footer">
        <p>Numismatic Gallery v2 • {(coins?.length || 0)} coins loaded</p>
      </footer>
    </div>
  );
}