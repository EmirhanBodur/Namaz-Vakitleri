import { useState, useEffect } from 'react';

// Custom hook to get and set items from localStorage
function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            // Sayfa yüklendiğinde localStorage'dan değeri oku
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            // Değer değiştiğinde, localStorage'a kaydet
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.log(error);
        }
    }, [storedValue, key]);

    const setValue = value => {
        try {
            // Değerin fonksiyon mu yoksa değer mi olduğunu kontrol et
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
        } catch (error) {
            console.log(error);
        }
    };

    return [storedValue, setValue];
}

export default useLocalStorage;
