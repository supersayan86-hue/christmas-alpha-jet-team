CHRISTMAS ALPHA JET TEAM — SITE DE RECRUTEMENT

1) Créer un webhook dans le salon Discord privé staff : Modifier le salon > Intégrations > Webhooks > Nouveau webhook. Vérifier que le salon est réellement privé.
2) Ne jamais partager ni publier l'URL du webhook.
3) Sur Cloudflare : Workers & Pages > Create > Pages > Upload assets (Direct Upload).
4) IMPORTANT : les Pages Functions ne sont pas prises en charge par un simple téléversement Direct Upload du dossier. Utiliser plutôt un dépôt GitHub connecté à Cloudflare Pages (Git integration), avec ce dossier à la racine du dépôt. Framework preset: None ; Build command : laisser vide ; Build output directory : / (ou .).
5) Dans Cloudflare Pages > projet > Settings > Variables and Secrets : créer la variable secrète DISCORD_WEBHOOK_URL avec l'URL du webhook. Déployer à nouveau après la configuration.
6) Tester avec une candidature fictive. Vérifier sa réception dans #staff.
7) Publier le lien public *.pages.dev dans #candidatures sur Discord.

ATTENTION : un formulaire public sans CAPTCHA ni limitation robuste peut recevoir du spam. Avant une diffusion importante, ajouter Cloudflare Turnstile et une limitation de débit (par exemple avec un service côté serveur). Ne jamais mettre le webhook dans index.html ou dans un dépôt public.

Le site collecte un pseudo et les réponses de candidature. Informer les membres de l'usage des données, limiter l'accès au salon staff, et supprimer les candidatures qui ne sont plus nécessaires.
