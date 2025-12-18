import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

console.log('🚀 Starting deployment process...')

try {
  // 1. Clean previous build
  console.log('🧹 Cleaning previous build...')
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true })
  }

  // 2. Install dependencies
  console.log('📦 Installing dependencies...')
  execSync('npm install', { stdio: 'inherit' })

  // 3. Build project
  console.log('🏗️  Building project...')
  execSync('npx vite build', { stdio: 'inherit' })

  // 4. Verify build
  console.log('✅ Verifying build...')
  if (!fs.existsSync('dist/index.html')) {
    throw new Error('Build failed: index.html not found in dist folder')
  }

  // 5. Deploy to GitHub Pages
  console.log('🚀 Deploying to GitHub Pages...')
  execSync('npx gh-pages -d dist', { stdio: 'inherit' })

  console.log('🎉 Deployment successful!')
  console.log('📱 Live at: https://johnkibre.github.io/portfolio-elec/')
} catch (error) {
  console.error('❌ Deployment failed:', error.message)
  process.exit(1)
}
