#!/bin/bash

# 🚀 Script de Déploiement Rapide - Spectacle Interlude
# Usage: ./deploy.sh [platform]
# Platforms: cloudflare, github, vercel, netlify

set -e

echo "🎭 Spectacle Interlude - Déploiement"
echo "===================================="
echo ""

# Build the app
echo "📦 Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"
echo ""

# Get platform from argument or ask
PLATFORM=${1:-}

if [ -z "$PLATFORM" ]; then
    echo "Choisissez une plateforme:"
    echo "1) Cloudflare Pages (recommandé)"
    echo "2) GitHub Pages"
    echo "3) Vercel"
    echo "4) Netlify"
    echo "5) Serveur local (test)"
    read -p "Votre choix (1-5): " choice
    
    case $choice in
        1) PLATFORM="cloudflare";;
        2) PLATFORM="github";;
        3) PLATFORM="vercel";;
        4) PLATFORM="netlify";;
        5) PLATFORM="local";;
        *) echo "❌ Choix invalide"; exit 1;;
    esac
fi

echo ""
echo "🚀 Déploiement vers $PLATFORM..."
echo ""

case $PLATFORM in
    cloudflare)
        if ! command -v wrangler &> /dev/null; then
            echo "⚠️  Wrangler CLI non installé"
            echo "📥 Installation: npm install -g wrangler"
            read -p "Installer maintenant? (y/n) " install
            if [ "$install" = "y" ]; then
                npm install -g wrangler
            else
                exit 1
            fi
        fi
        
        echo "📤 Déploiement vers Cloudflare Pages..."
        wrangler pages deploy dist --project-name=spectacle-interlude
        echo ""
        echo "✅ Déployé sur Cloudflare Pages!"
        echo "🌐 URL: https://spectacle-interlude.pages.dev"
        ;;
        
    github)
        if ! command -v gh &> /dev/null; then
            echo "⚠️  GitHub CLI non installé"
            echo "Alternative: Utilisez le dashboard GitHub Pages"
            exit 1
        fi
        
        echo "📤 Déploiement vers GitHub Pages..."
        
        # Check if gh-pages is installed
        if ! npm list -g gh-pages &> /dev/null; then
            echo "📥 Installation de gh-pages..."
            npm install --save-dev gh-pages
        fi
        
        # Add deploy script if not exists
        if ! grep -q '"deploy"' package.json; then
            echo "📝 Ajout du script deploy..."
            npm pkg set scripts.deploy="gh-pages -d dist"
        fi
        
        npm run deploy
        echo ""
        echo "✅ Déployé sur GitHub Pages!"
        echo "🌐 URL: https://masterDakill.github.io/Interlude-Apps"
        ;;
        
    vercel)
        if ! command -v vercel &> /dev/null; then
            echo "⚠️  Vercel CLI non installé"
            echo "📥 Installation: npm install -g vercel"
            read -p "Installer maintenant? (y/n) " install
            if [ "$install" = "y" ]; then
                npm install -g vercel
            else
                exit 1
            fi
        fi
        
        echo "📤 Déploiement vers Vercel..."
        vercel --prod
        echo ""
        echo "✅ Déployé sur Vercel!"
        ;;
        
    netlify)
        if ! command -v netlify &> /dev/null; then
            echo "⚠️  Netlify CLI non installé"
            echo "📥 Installation: npm install -g netlify-cli"
            read -p "Installer maintenant? (y/n) " install
            if [ "$install" = "y" ]; then
                npm install -g netlify-cli
            else
                exit 1
            fi
        fi
        
        echo "📤 Déploiement vers Netlify..."
        netlify deploy --prod --dir=dist
        echo ""
        echo "✅ Déployé sur Netlify!"
        ;;
        
    local)
        echo "🖥️  Démarrage du serveur local..."
        echo "🌐 URL: http://localhost:8080"
        echo "Press Ctrl+C to stop"
        echo ""
        cd dist && python3 -m http.server 8080
        ;;
        
    *)
        echo "❌ Plateforme inconnue: $PLATFORM"
        echo "Plateformes supportées: cloudflare, github, vercel, netlify, local"
        exit 1
        ;;
esac

echo ""
echo "🎉 Déploiement terminé!"
echo "📖 Voir DEPLOYMENT.md pour plus d'infos"
