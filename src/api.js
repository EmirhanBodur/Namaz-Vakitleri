import axios from 'axios';

const BASE_URL = 'https://ezanvakti.herokuapp.com';

export const getCountries = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/ulkeler`);
    const countryData = response.data.map((country) => ({
      value: country.UlkeID,
      label: country.UlkeAdi,
    }));
    return countryData;
  } catch (error) {
    console.error('Hata:', error);
  }
};

export const getCities = async (countryId) => {
  try {
    const response = await axios.get(`${BASE_URL}/sehirler/${countryId}`);
    const cityData = response.data.map((city) => ({
      value: city.SehirID,
      label: city.SehirAdi,
    }));
    return cityData;
  } catch (error) {
    console.error('Hata:', error);
  }
};

export const getDistricts = async (cityId) => {
  try {
    const response = await axios.get(`${BASE_URL}/ilceler/${cityId}`);
    const districtData = response.data.map((district) => ({
      value: district.IlceID,
      label: district.IlceAdi,
    }));
    return districtData;
  } catch (error) {
    console.error('Hata:', error);
  }
};

// getPrayerTimes fonksiyonunu güncellendi
export const getPrayerTimes = async (locationId, currentDate) => {
  try {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    const response = await axios.get(`${BASE_URL}/vakitler/${locationId}`, {
      params: {
        year,
        month,
        day,
      },
    });

    const dailyPrayerTimes = response.data.filter((prayerTime) => {
      // API'den gelen tarih bilgisini parse ederek o günün tarihini oluştur
      const apiDate = prayerTime.MiladiTarihUzun.split('T')[0];

      const userDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

      return apiDate === userDate;
    });

    if (dailyPrayerTimes.length > 0) {
      // Eğer o gün için namaz vakitleri bulunduysa sadece ilk elemanı döndür
      return dailyPrayerTimes[0];
    } else {
      

      // Eğer o gün için vakit bulunamazsa, en yakın tarihteki namaz vakitlerini al
      const closestDate = response.data[0];
      console.log('En yakın tarih:', closestDate);

      return closestDate;
    }
  } catch (error) {
    console.error('Hata:', error);
    return null;
  }
};