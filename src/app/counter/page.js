"use client"

import React, { useState, useEffect } from 'react';

function NumberCounter() {
  const [count, setCount] = useState(0);
  const [targetCount, setTargetCount] = useState(50);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleDirection = () => {
    if (!isAnimating) {
      setIsAnimating(true);
    }
  };

  useEffect(() => {
    let startTime = null;
    let startCountValue = count; // Simpan nilai awal count saat animasi dimulai
    const difference = Math.abs(targetCount - count); // Selisih antara targetCount dan count
    //const duration = difference * 30; // Hitung durasi berdasarkan selisih
    const duration = 500; // Hitung durasi berdasarkan selisih

    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(1, progress / duration);
      const newCount = Math.floor(percentage * (targetCount - startCountValue) + startCountValue);

      setCount(newCount);

      if (percentage < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setIsAnimating(false); // Setelah animasi selesai
      }
    };

    if (isAnimating) {
      toggleDirection(); // Reset animasi
      requestAnimationFrame(updateCount);
    }
  }, [count, targetCount, isAnimating]);

  const handleInputChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue)) {
      setTargetCount(newValue);
    }
  };

  return (
    <div className="mt-8 relative text-center flex items-center bg-slate-500 rounded-lg p-2">
      <div>{count}</div>
      <button onClick={toggleDirection}>Ubah Arah</button>
      <input
        type="number"
        value={targetCount}
        onChange={handleInputChange}
        className="ml-2 border border-gray-400 rounded p-1"
      />
    </div>
  );
}

export default NumberCounter;
