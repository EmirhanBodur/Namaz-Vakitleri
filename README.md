# Namaz Vakitleri

Bu repo React kullanarak geliştirilen bir Namaz Vakitleri web sitesi içermektedir. Kullanıcıların çeşitli şehirler için namaz vakitleri ve o vakitlere kalan dakikaların görüntülenmesi amaçlanmıştır.

## API Kaynakları

Bu uygulama, günlük namaz vakitleri bilgilerini sağlamak için [Namaz Vakitleri](https://ezanvakti.herokuapp.com) API'sini kullanmaktadır. Bu API, Türkiye ve dünya genelindeki farklı bölgeler için detaylı namaz zamanlarını sunar. Kullanıcıların seçtikleri ülke, şehir ve ilçeye göre namaz vakitlerini görüntüleyebilmelerini sağlamak için bu API'den gelen veriler dinamik olarak işlenmektedir.

## Kurulum

Bu bölüm, `Namaz Vakitleri` uygulamasını yerel bilgisayarınızda nasıl kurup çalıştırabileceğinizi adım adım gösterir. Projeyi başarıyla kurmak ve çalıştırmak için aşağıdaki adımları takip edin:

### Önkoşullar

Bu projeyi çalıştırmadan önce bilgisayarınıza Node.js ve npm yüklenmiş olmalıdır. Bunları aşağıdaki bağlantılardan indirebilir ve kurulum talimatlarını takip edebilirsiniz:

- [Node.js indir](https://nodejs.org/)
- [npm indir](https://npmjs.com/)

Node.js ve npm'in başarıyla kurulduğundan emin olduktan sonra, projeyi kurmaya ve çalıştırmaya devam edebilirsiniz.

### Projeyi Kurma

1. İlk olarak, projeyi GitHub'dan yerel bilgisayarınıza klonlayın:

```bash
git clone https://github.com/EmirhanBodur/Namaz-Vakitleri.git
cd Namaz-Vakitleri
npm install
npm start
