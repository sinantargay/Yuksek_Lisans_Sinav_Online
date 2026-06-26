# PHOTON v2.0 Güncelleme Planı

Bu dosya, yüksek lisans sınav uygulamasının profesyonel yapıya taşınması için yol haritasıdır.

## Amaç

PHOTON yalnızca soru çözdüren bir uygulama değil; fotoğraf, sanat, edebiyat, kültür ve güncel akademik haberleri takip eden yaşayan bir yüksek lisans hazırlık platformu olacaktır.

## Ana Modüller

### 1. Ana Soru Havuzu

- Tüm doğrulanmış sorular burada saklanır.
- Soru silinmez; yalnızca güncellenir veya pasife alınır.
- Her soruda şu alanlar bulunur:
  - id
  - question
  - options
  - correctIndex
  - category
  - difficulty
  - probability
  - explanation
  - source
  - verified
  - createdAt
  - updatedAt

### 2. Final Arşivi / Editör Modu

- Ana havuzdan seçilmiş sorular için ayrı çalışma alanıdır.
- Sorular ana havuzdan silinmez.
- Editör özellikleri:
  - Finale ekle
  - Finalden çıkar
  - Önem derecesi ver
  - Editör notu ekle
  - Hoca / okul etiketi ekle
  - Sadece final sorularından sınav oluştur

### 3. Güncel Soru Üretim Sistemi

Kaynak kategorileri:

- Sanat haberleri
- Fotoğraf haberleri
- Üniversite duyuruları
- Akademik makaleler
- YÖK tezleri
- Müze ve bienal haberleri
- Edebiyat, sinema ve kültür ödülleri
- Yapay zekâ ve görsel kültür çalışmaları

Kural: Doğrulanamayan bilgi soru yapılmaz.

### 4. Raporlama

- PDF çıktı
- Yanlış ve boş soruların analizi
- Konu eksikleri
- Kaynak önerisi
- Final arşivine otomatik öneri
- Başarı grafiği

### 5. Üyelik ve Oturum

- Beni hatırla
- Oturum açık kalsın
- Yönetici onayı
- Ödeme bildirimi
- Gerçek yayında veritabanı entegrasyonu

## Önerilen Dosya Yapısı

```text
PHOTON
├── index.html
├── questions.json
├── final-archive.js
├── data/
│   ├── questions-main.json
│   ├── questions-current.json
│   ├── questions-final.json
│   └── sources.json
├── js/
│   ├── exam.js
│   ├── admin.js
│   ├── report.js
│   ├── final.js
│   └── storage.js
└── css/
    └── style.css
```

## Öncelik Sırası

1. Final Arşivi bağlantısının aktif edilmesi
2. Beni hatırla sistemi
3. PDF raporun güçlendirilmesi
4. Soruların JSON dosyasına ayrılması
5. Güncel soru setlerinin düzenli eklenmesi
6. Espas Kitabevi ve fotoğraf tarihi özel bölümleri
7. Supabase/Firebase ile gerçek kullanıcı sistemi

## Soru Kalite Standardı

Her soru için minimum alanlar:

- Doğru cevap
- Zorluk derecesi
- Konu etiketi
- Kısa gerekçe
- Kaynak notu
- Doğrulama durumu
- Çıkma olasılığı

## Çıkma Olasılığı Ölçeği

- 5: Çok yüksek
- 4: Yüksek
- 3: Orta
- 2: Düşük ama faydalı
- 1: Genel kültür

## Final Arşivi Mantığı

Final arşivi ana havuzun alternatifi değildir. Ana havuzdan seçilmiş, sınav öncesi öncelikli çalışılacak soruların listesidir. Bu nedenle final arşivine eklenen soru ana havuzdan silinmez.

## Not

Mevcut tek dosyalık `index.html` korunacaktır. Yeni modüller adım adım eklenecek, sistem kırılmadan profesyonel yapıya taşınacaktır.
