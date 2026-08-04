# 🚀 Deploy BirruLabs ke Vercel - 5 Menit

## Kenapa Gak Bisa Auto-Deploy via CLI?

Vercel CLI butuh manual OAuth login via browser. Karena lo tidur, gw gak bisa klik link autentikasi.

## ✅ Solusi: Import via Dashboard (Lebih Gampang)

### Langkah 1: Login Vercel
- Buka: https://vercel.com
- Login pake GitHub account lo (tantenton)

### Langkah 2: Import Project
- Click: **"Add New..."** → **"Project"**
- Atau langsung: https://vercel.com/new

### Langkah 3: Select Repository
- Pilih: `tantenton/birrulabs-website`
- Framework: Next.js (auto-detected) ✓
- Root Directory: `./` (default) ✓

### Langkah 4: Configure (Optional)
**Environment Variables** - Skip dulu, gak wajib untuk MVP:
```
# Nanti aja kalo mau pake Supabase:
# DATABASE_URL=...
# SUPABASE_URL=...
```

### Langkah 5: Deploy!
- Click: **"Deploy"**
- Wait: 2-3 menit
- Done! ✓

### Langkah 6: Set Custom Domain (Opsional)
- Project Settings → Domains
- Add: `birrulabs.biz.id`
- Follow DNS instructions

---

## 🎯 Expected Result:

**Deployment URL:** https://birrulabs-website.vercel.app (atau similar)

**Pages yang akan live:**
- `/` - Home (redirect ke `/id`)
- `/id` - Indonesian home
- `/en` - English home  
- `/id/tentang` - About (ID)
- `/en/about` - About (EN)
- `/id/proyek` - Projects
- `/id/artikel` - Articles
- `/startup` - Startup profile

---

## 🔄 Auto-Deploy Setup (Bonus)

Setelah first deployment, Vercel auto-deploy tiap kali lo `git push`:
- Push to `main` → Auto-deploy production
- Push to branch → Auto-deploy preview

---

## ⚡ Kalo Mau Cepet via CLI (Manual Auth):

```bash
cd ~/birrulabs-website

# Step 1: Login (buka link yang muncul)
vercel login

# Step 2: Deploy
vercel --prod

# Step 3: Follow prompts
# Project name: birrulabs-website
# Framework: Next.js
```

---

**Estimated time:** 5 menit total  
**Status:** Website udah production-ready ✓  
**GitHub:** https://github.com/tantenton/birrulabs-website

**Selamat tidur! Deploy pas bangun! 😴🚀**
