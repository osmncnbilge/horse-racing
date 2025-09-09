# 🐎 Horse Racing Game

> Vue 3 + Vuex + TailwindCSS kullanılarak geliştirilmiş interaktif **At Yarışı Oyunu**.

---

## 🎯 Proje Amacı

- 20 farklı at üretmek ve bunları 6 turluk yarış programına dağıtmak.
- Her turda 10 farklı at yarışır, mesafeler sabit artar:
  1. 1200m
  2. 1400m
  3. 1600m
  4. 1800m
  5. 2000m
  6. 2200m
- Yarışlar tek tek başlatılır, animasyon ile atlar pistte hareket eder.
- Sonuçlar her turun sonunda **Results Table**’da görüntülenir.
- Vuex ile state yönetimi yapılır, component tabanlı tasarım benimsenmiştir.

---

## ✨ Özellikler

- 🎲 **At üretimi**: 20 at, her birinin kendine özgü rengi ve 1–100 arası kondisyon puanı.
- 📅 **Program oluşturma**: “Generate” ile 6 turluk yarış programı.
- ▶️ **Yarış başlatma**: “Start” butonu ile yarışlar sırasıyla koşar.
- 🐎 **Animasyonlu hareket**: At ikonları pistte mesafe boyunca kayar.
- 📊 **Sonuç tablosu**: Her tur bitiminde sıralı sonuç listesi.
- 🎨 **TailwindCSS ile stiller**: Responsive ve sade UI.

---

## 🛠 Kullanılan Teknolojiler

- [Vue 3](https://vuejs.org/)
- [Vuex 4](https://vuex.vuejs.org/)
- [Vite 7](https://vitejs.dev/)
- [TailwindCSS 3](https://tailwindcss.com/)
- TypeScript

---

## 🚀 Kurulum & Çalıştırma

Projeyi klonladıktan sonra:

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusu
npm run dev

# Build almak
npm run build

# Build preview
npm run preview
```

src/
├─ components/
│ ├─ HeaderBar.vue
│ ├─ HorseTable.vue
│ ├─ ProgramTable.vue
│ ├─ ResultsTable.vue
│ └─ Track.vue
├─ store/ (vuex modülleri: horses, race vs.)
├─ models.ts
├─ horses.ts
├─ race.ts
├─ main.ts
└─ App.vue
tailwind.css
style.css
