import React, { useState, useEffect, useCallback } from 'react';
import { getCountries, getCities, getDistricts, getPrayerTimes } from '../api';
import useLocalStorage from '../hooks/uselocalStorage';
import SelectInput from './SelectInputs'
import RemainingTime from './RemainingTime';
import PrayerTimesDisplay from './PrayerTimesDisplay';
import Footer from './Footer';

const PrayerTimes = () => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedCountry, setSelectedCountry] = useLocalStorage('selectedCountry', null);
  const [selectedCity, setSelectedCity] = useLocalStorage('selectedCity', null);
  const [selectedDistrict, setSelectedDistrict] = useLocalStorage('selectedDistrict', null);
  const [prayerTimes, setPrayerTimes] = useLocalStorage('prayerTimes', null);
  const [remainingTime, setRemainingTime] = useLocalStorage('remainingTime', null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const desiredKeys = ["Imsak", "Gunes", "Ogle", "Ikindi", "Aksam", "Yatsi"];
 

  

  //Ülke bilgilerini almak için bir API çağrısı yapar ve aldığı veriyi bileşenin durumuna atar.
  useEffect(() => {
    const fetchCountries = async () => {
      const countryData = await getCountries();
      setCountries(countryData);
    };

    fetchCountries();
  }, []);

  // Seçilen ülkeye göre şehir bilgilerini alır ve ilgili bileşenin durumunu günceller
  const handleCountryChange = async (selectedOption) => {
    setSelectedCountry(selectedOption);
    const cityData = await getCities(selectedOption.value);
    setCities(cityData);
  };

  // Seçilen şehire göre ilçe bilgilerini alır ve ilgili bileşenün durumunu günceller
  const handleCityChange = async (selectedOption) => {
    setSelectedCity(selectedOption);
    const districtData = await getDistricts(selectedOption.value);
    setDistricts(districtData);
  };
  

  // Zaman farkını alıp bu farkı saat,dakika ve saniye olarak biçimlendiren bir fonskyion
  const formatRemainingTime = (timeDifference) => {
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  };


  const updateRemainingTime = useCallback(async () => {
    if (prayerTimes) {
      const currentDate = new Date();
      const results = desiredKeys.map(key => {
        const timeParts = prayerTimes[key].split(':');
        const prayerDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), parseInt(timeParts[0], 10), parseInt(timeParts[1], 10), 0);
        if (currentDate > prayerDate) {
          prayerDate.setDate(prayerDate.getDate() + 1);  // Next day
        }
        return { key, diff: prayerDate - currentDate };
      }).sort((a, b) => a.diff - b.diff);
      const closestPrayer = results[0];
      setRemainingTime({ name: closestPrayer.key, time: closestPrayer.diff });
    }
  }, [desiredKeys, prayerTimes, setRemainingTime]);
  

  
  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTime();

    }, 1000);
    return () => clearInterval(intervalId);
  }, [prayerTimes, updateRemainingTime])

  useEffect(() => {
    let intervalId;
  
    if (remainingTime > 0) {
      intervalId = setInterval(() => {
        setRemainingTime(prevRemainingTime => prevRemainingTime - 1000);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }
  
    return () => clearInterval(intervalId);
  }, [remainingTime, setRemainingTime]);

  const handleDistrictChange = async (selectedOption) => {
    setSelectedDistrict(selectedOption);
    const prayerTimesData = await getPrayerTimes(selectedOption.value, new Date());
    setPrayerTimes(prayerTimesData);
    updateRemainingTime();
  };

 

  // Kullanıcı bir konum seçtiğinde, localStorage'a kaydet
useEffect(() => {
  if (selectedCountry && selectedCity && selectedDistrict) {
    localStorage.setItem(
      'selectedLocation',
      JSON.stringify({ country: selectedCountry, city: selectedCity, district: selectedDistrict })
    );
  }
}, [selectedCountry, selectedCity, selectedDistrict]);


return (
  <div className="bg-gray min-h-screen flex flex-col justify-center items-center p-8">
    <h1 className="text-3xl font-bold mb-4 text-black">Namaz Vakitleri</h1>
    <div className="grid gap-4 w-full">
      <SelectInput options={countries} onChange={handleCountryChange} value={selectedCountry} placeholder="Ülke Seçiniz" />
      <SelectInput options={cities} onChange={handleCityChange} value={selectedCity} placeholder="Şehir Seçiniz" />
      <SelectInput options={districts} onChange={handleDistrictChange} value={selectedDistrict} placeholder="İlçe Seçiniz" />
    </div>

    {remainingTime && remainingTime.name && (
      <RemainingTime
        prayerName={remainingTime.name}
        remainingTime={remainingTime.time}
        formatRemainingTime={formatRemainingTime}
      />
    )}
    <PrayerTimesDisplay prayerTimes={prayerTimes} desiredKeys={desiredKeys} />
    
    <Footer />
  </div>
);

};

export default PrayerTimes;
