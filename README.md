# Yüksek Lisans Sınav Platformu - Online Hazır Sürüm

Bu sürümde sınav durum raporuna kullanıcının üyelik bilgileri eklendi:

- Ad soyad
- Telefon
- E-posta
- Üyelik numarası
- Üyelik durumu
- Ödeme bildirimi durumu
- Dekont / ödeme notu
- Üyelik başvuru tarihi
- Ödeme bildirim tarihi
- Sınav rapor tarihi

## Yerel demo kullanımı

`index.html` dosyasını açarak çalıştırabilirsiniz. Yönetici demo şifresi: `sinan2026`

## Online yayın notu

Bu tek dosyalık sürüm demo/prototip mantığındadır. Tüm kullanıcılara gerçek online sistem olarak açmak için:

1. Dosyayı Netlify veya Vercel gibi statik yayın servislerine yükleyebilirsiniz.
2. Ancak gerçek üyelik, ödeme ve yönetici onayı için kullanıcı verileri `localStorage` yerine sunucu veritabanında tutulmalıdır.
3. Ödeme doğrulaması için banka entegrasyonu, iyzico/PayTR/Shopier benzeri ödeme altyapısı veya manuel dekont onay sistemi gerekir.
4. Yönetici paneli gerçek yayında sunucu taraflı şifreleme ve yetki kontrolü ile korunmalıdır.

## Önerilen canlı mimari

- Ön yüz: HTML/CSS/JavaScript veya React
- Hosting: Netlify / Vercel
- Veritabanı ve kullanıcı sistemi: Supabase veya Firebase
- Ödeme: iyzico / PayTR / Shopier / manuel IBAN dekont onayı
- Admin panel: Sunucu tarafı yetkili kullanıcı kontrolü

© Sinan Targay. Tüm hakları saklıdır. İletişim: 0536 786 97 26
