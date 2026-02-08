# Configuration du formulaire de contact

Le formulaire utilise **EmailJS** : les visiteurs envoient un message depuis le site, et tu le reçois sur **ddoussain@gmail.com** (ou l’email que tu configures).

## Étapes à suivre

### 1. Créer un compte EmailJS
- Va sur [https://www.emailjs.com/](https://www.emailjs.com/)
- Inscris-toi (gratuit).

### 2. Ajouter un « Email Service »
- Dans le dashboard : **Email Services** → **Add New Service**.
- Choisis **Gmail** (ou un autre fournisseur).
- Connecte ton compte Gmail (ddoussain@gmail.com).
- Une fois créé, note l’**Service ID** (ex. `service_xxxxx`).

### 3. Créer un modèle d’email (« Email Template »)
- **Email Templates** → **Create New Template**.
- **To Email** : `ddoussain@gmail.com` (ou ton email).
- **Subject** : par ex. `Message portfolio : {{from_name}}`.
- **Content** (corps du mail), utilise les variables envoyées par le formulaire :
  - `{{name}}` = nom du visiteur
  - `{{email}}` = son email
  - `{{message}}` = son message  

  Exemple :
  ```
  De : {{name}} ({{email}})
  Message : {{message}}
  ```
- Enregistre et note le **Template ID** (ex. `template_xxxxx`).

### 4. Récupérer la clé publique
- **Account** → **API Keys** (ou **General**).
- Copie la **Public Key**.

### 5. Configurer le projet
- À la racine du projet, copie `.env.example` en `.env` :
  ```bash
  cp .env.example .env
  ```
- Ouvre `.env` et remplace par tes vraies valeurs :
  ```
  VITE_APP_EMAILJS_SERVICE_ID=ton_service_id
  VITE_APP_EMAILJS_TEMPLATE_ID=ton_template_id
  VITE_APP_EMAILJS_PUBLIC_KEY=ta_public_key
  ```
- Redémarre le serveur de dev (`npm run dev`) pour que les variables soient prises en compte.

Après ça, quand quelqu’un envoie le formulaire, tu reçois l’email sur ddoussain@gmail.com (ou l’email défini dans le template).
