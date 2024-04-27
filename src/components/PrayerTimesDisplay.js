import React from 'react';

const prayerNameMap = {
  Imsak: "İmsak",
  Gunes: "Güneş",
  Ogle: "Öğle",
  Ikindi: "İkindi",
  Aksam: "Akşam",
  Yatsi: "Yatsı"
};

const PrayerTimesDisplay = ({ prayerTimes, desiredKeys }) => {
  if (!desiredKeys || !Array.isArray(desiredKeys) || !prayerTimes) {
    return <div>Veri yüklenirken bir hata oluştu.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-7">
      {desiredKeys.map((key) => (
        <div
          key={key}
          className="border border-purple-600 p-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 text-black text-center"
        >
          <strong className="block mb-2">{prayerNameMap[key] || key}</strong>  {/* Türkçe isimleri kullan veya key'i göster */}
          <span className="block font-bold">{prayerTimes[key]}</span>
        </div>
      ))}
    </div>
  );
};

export default PrayerTimesDisplay;

