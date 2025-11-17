# Multi-Pôles - Site Public Frontend

Site web public de Multi-Pôles, spécialiste en PLV (Publicité sur Lieu de Vente), packaging et solutions d'affichage sur-mesure.

## 🚀 Technologies

- **Framework**: Next.js 15.5.6 (App Router)
- **UI**: React 19, TailwindCSS 4, Framer Motion
- **Forms**: React Hook Form
- **Language**: TypeScript
- **Icons**: Lucide React
- **3D**: Three.js, React Three Fiber

## 📋 Prérequis

- Node.js 18+
- Backend NestJS en cours d'exécution sur `http://localhost:3000`

## 🔧 Installation Rapide

1. **Cloner et installer**
   ```bash
   npm install
   ```

2. **Créer `.env.local`**
   ```bash
   # Créer manuellement le fichier .env.local avec :
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

3. **Lancer en développement**
   ```bash
   npm run dev
   ```

   Le site sera accessible sur `http://localhost:3001` (ou le port suivant disponible)

## 📁 Structure du Projet

```
src/
├── app/                    # Pages Next.js (App Router)
│   ├── page.tsx           # Page d'accueil (carousel, solutions, réalisations)
│   ├── blog/              # Blog avec pagination
│   │   ├── page.tsx       # Liste des articles
│   │   └── [slug]/        # Détail d'un article
│   ├── realisations/      # Portfolio des projets
│   ├── equipe/            # Page équipe
│   ├── contact/           # Formulaire de contact
│   └── devis/             # Formulaire de devis (multi-étapes)
├── components/            # Composants réutilisables
├── hooks/                 # Hooks personnalisés
│   ├── use-api.ts        # Hooks pour fetcher les données API
│   └── use-mobile.ts     # Hook pour responsive
├── lib/                   # Utilitaires
│   ├── public-api.ts     # Client API pour le backend
│   └── utils.ts          # Fonctions utilitaires
└── types/                 # Types TypeScript
    └── api.ts            # Interfaces des données API
```

## 🔌 Intégration API Backend

Le frontend se connecte au backend NestJS via les endpoints suivants :

### Content Endpoints
- `GET /api/v1/content/blog` - Articles de blog (avec pagination)
- `GET /api/v1/content/blog/:slug` - Détail d'un article
- `GET /api/v1/content/realisations` - Liste des réalisations
- `GET /api/v1/content/realisations/:id` - Détail d'une réalisation
- `GET /api/v1/content/carousel` - Slides du carousel
- `GET /api/v1/content/solutions` - Solutions/Services
- `GET /api/v1/content/team` - Membres de l'équipe

### Form Endpoints
- `POST /api/v1/forms/contact` - Soumission formulaire contact
- `POST /api/v1/forms/devis` - Soumission formulaire devis

**Note**: Si l'API ne répond pas, le frontend affiche des données de fallback statiques.

## 📄 Documentation Complète

- **[SETUP.md](./SETUP.md)** - Configuration détaillée et setup backend
- **[TESTS.md](./TESTS.md)** - Guide de tests complet avec checklist

## 🎨 Fonctionnalités Principales

### Page d'Accueil
- ✅ Carousel dynamique avec slides depuis l'API
- ✅ Section solutions/services
- ✅ Prévisualisation des réalisations
- ✅ Loading states et fallbacks

### Blog
- ✅ Liste paginée des articles
- ✅ Filtres par catégorie et recherche
- ✅ Page détail article avec contenu complet
- ✅ Tags cliquables

### Réalisations
- ✅ Galerie de projets filtrables
- ✅ Modal détail avec carousel d'images
- ✅ Informations client et spécifications

### Équipe
- ✅ Liste des membres avec photos
- ✅ Informations de contact cliquables
- ✅ Tri par ordre défini

### Formulaires
- ✅ **Contact**: Validation temps réel, soumission API
- ✅ **Devis**: Multi-étapes (4 étapes), validation par étape
- ✅ Gestion des erreurs avec messages détaillés
- ✅ États de chargement et confirmation

## 🛠️ Commandes Disponibles

```bash
# Développement
npm run dev          # Lance le serveur de dev (avec Turbopack)

# Production
npm run build        # Build de production
npm start            # Lance le serveur de production

# Qualité du code
npm run lint         # Vérifie le code avec ESLint
```

## ✅ Vérification de l'Installation

```bash
# Lancer le linter
npm run lint

# Tester le build
npm run build
```

Les deux commandes doivent se terminer sans erreur.

## 🧪 Tests

Consultez **[TESTS.md](./TESTS.md)** pour la liste complète des tests à effectuer :
- Tests des pages (Home, Blog, Réalisations, Équipe)
- Tests des formulaires (Contact, Devis)
- Tests de pagination et filtres
- Tests responsive
- Tests avec/sans API

## 🔧 Configuration Backend Requise

Pour que le frontend fonctionne, le backend doit :

1. **Activer CORS** pour `http://localhost:3001`
2. **Implémenter tous les endpoints** listés ci-dessus
3. **Respecter le format de réponse** :
   ```typescript
   {
     success: boolean;
     message: string;
     data?: T;
     errors?: Record<string, string[]>;
   }
   ```

Voir **[SETUP.md](./SETUP.md)** pour les détails complets.

## 🎯 Ce qu'il faut faire côté Backend

### 1. Activer CORS
```typescript
// main.ts
app.enableCors({
  origin: ['http://localhost:3001', 'http://localhost:3000'],
  credentials: true,
});
```

### 2. Créer les DTOs de validation
- `ContactFormDto` : firstName, lastName, email, phone, company?, message, acceptTerms
- `DevisFormDto` : firstName, lastName, email, phone, company, projectType, description, budget?, quantity?, dimensions?, desiredDeliveryDate?, acceptTerms

### 3. Implémenter les endpoints de contenu
Tous doivent supporter le paramètre `?locale=` (fr/en) et retourner des données selon les interfaces TypeScript définies dans `src/types/api.ts`

### 4. Tester les endpoints
Utilisez les exemples de requêtes dans **[TESTS.md](./TESTS.md)**

## 📦 Déploiement

1. Configurer la variable d'environnement en production :
   ```
   NEXT_PUBLIC_API_URL=https://api.votre-domaine.com
   ```

2. Build et déployer :
   ```bash
   npm run build
   npm start
   ```

## 🐛 Dépannage

### L'API ne répond pas
- Vérifiez que le backend est démarré sur le port 3000
- Vérifiez la variable `NEXT_PUBLIC_API_URL` dans `.env.local`
- Consultez la console du navigateur (F12) pour les erreurs

### Erreurs CORS
- Vérifiez la configuration CORS du backend
- L'URL du frontend doit être dans les origines autorisées

### Données statiques affichées
- C'est normal si l'API ne répond pas (mode fallback)
- Vérifiez que le backend retourne bien des données

## 📞 Support

Pour toute question :
1. Consultez **[SETUP.md](./SETUP.md)** pour la configuration
2. Consultez **[TESTS.md](./TESTS.md)** pour les tests
3. Vérifiez les types dans `src/types/api.ts`
4. Consultez le client API dans `src/lib/public-api.ts`

## 📝 License

Propriétaire - Multi-Pôles © 2024
