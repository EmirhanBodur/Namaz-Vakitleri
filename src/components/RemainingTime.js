import React from 'react';

const RemainingTime = ({ remainingTime, formatRemainingTime,prayerName }) => {
  if (!remainingTime) return null;
  
  const { hours, minutes, seconds } = formatRemainingTime(remainingTime);

  const prayerNameMap = {
    Imsak: "İmsak",
    Gunes: "Güneş",
    Ogle: "Öğle",
    Ikindi: "İkindi",
    Aksam: "Akşam",
    Yatsi: "Yatsı"
  };
  
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-black text-center">{prayerNameMap[prayerName]} Vaktine Kalan Süre</h2>
      <p className="text-3xl font-bold text-black text-center">
        {hours} Saat {minutes} Dakika {seconds} Saniye
      </p>
    </div>
  );
};

export default RemainingTime;
