# Mobile-Introduction

# 🚀 Guia Rápido: Criando seu Primeiro APK com React Native e Expo

Este guia tem como objetivo apresentar uma introdução prática ao desenvolvimento mobile utilizando **React Native com Expo**, permitindo que você crie e instale seu próprio app no celular Android.

---

## ✅ Pré-requisitos

Antes de começar, certifique-se de ter os seguintes itens instalados/configurados:

### 📲 Aplicativos e Ferramentas

- [Expo Go (no celular)](https://expo.dev/go/)
- [Node.js (no computador)](https://nodejs.org/en)
- [Visual Studio Code](https://code.visualstudio.com/)

### ⚙️ Ajuste no PowerShell (Windows)

Por padrão, o PowerShell pode bloquear scripts como o `npx`. Para ajustar:

1. **Abra o PowerShell como Administrador**  
   - Pressione `Win + X` → clique em **Windows PowerShell (Admin)**  
   - Ou pesquise por "PowerShell", clique com o botão direito → **Executar como Administrador**

2. Execute o seguinte comando:

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 📚 Materiais Complementares

- [📘 Introdução ao TypeScript](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
- [⚛️ Introdução ao React](https://react.dev/learn)
- [🚀 Tutorial oficial do Expo](https://docs.expo.dev/tutorial/overview/)

---

## 🧪 Etapa 1: Iniciando o Projeto com Expo

1. Crie um novo projeto React Native com Expo:
```sh
npx create-expo-app nome-do-projeto
```

2. Acesse a pasta do projeto:
```sh
cd nome-do-projeto
```

3. Inicie o servidor local com o modo **túnel** (facilita conexão com o celular):
```sh
npx expo start --tunnel
```

> 💡 Com o QR code gerado no terminal ou navegador, escaneie com o app **Expo Go** no celular para visualizar o app rodando ao vivo.

---

## 🧱 Etapa 2: Preparando a Build do APK

### 1. Crie uma conta no EAS (Expo Application Services)
👉 Acesse: [https://expo.dev/signup](https://expo.dev/signup)

### 2. Instale a CLI de build do EAS:
```sh
npm install -g eas-cli
```

### 3. Faça login na sua conta Expo:
```sh
eas login
```

### 4. Configure o projeto para build:
```sh
eas build:configure
```

### 5. Altere o arquivo `eas.json` criado automaticamente com a seguinte configuração:

```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

### 6. Inicie a build do APK:
```sh
eas build --profile preview --platform android
```

> ⚠️ A build pode demorar alguns minutos pois usuários com conta gratuita entram em fila.

---

## 📲 Etapa 3: Instalando o APK no Celular

1. Após a finalização do processo, acesse a **URL de build** fornecida no terminal para baixar o `.apk`.

2. Envie o arquivo `.apk` para seu celular (por **Google Drive**, **WhatsApp Web**, **cabo USB**, etc).

3. No celular:
   - Ative o **modo desenvolvedor** e permita **instalação de apps desconhecidos**
   - Instale o `.apk` normalmente

---

## 🎉 Pronto!

Você agora tem seu **primeiro app React Native** rodando diretamente no seu celular como um aplicativo Android tradicional! 🙌

---
# Projetos para prática do repositório.

# 1 - Sticker Smash

Projeto adaptado de forma sucinta do reactive native, para ensino basico da criação de um app simples. 

# 2 - imc-calculation

Projeto adaptado de forma sucinta do reactive native, para ensino basico da criação de um app simples. 

# 3 - tic tac toe

Projeto adaptado de forma sucinta do reactive native, para ensino basico da criação de um app simples. 

# 4 - cv-online

Projeto adaptado de forma sucinta do reactive native, para ensino basico da criação de um app simples. 

# 5 - quiz-app

Projeto adaptado de forma sucinta do reactive native, para ensino basico da criação de um app simples. 

# 6 - tiger-game

Projeto adaptado de forma sucinta do reactive native, para ensino basico da criação de um app simples. 

# 7 - to-do-app

Projeto adaptado de forma sucinta do reactive native, para ensino basico da criação de um app simples. 
