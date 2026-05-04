/* eslint-disable no-sync */

import * as cp from 'child_process'
import * as path from 'path'
import { getProductName } from '../app/package-info'
import {
  getDistPath,
  getDistRoot,
  getDistArchitecture,
} from './dist-info'
import { writeFileSync } from 'fs'
import { join } from 'path'
import { getBundleSizes } from './dist-info'

const distPath = getDistPath()
const productName = getProductName()
const outputDir = getDistRoot()

if (process.platform === 'linux') {
  packageLinux()
} else {
  console.error(`I don't know how to package for ${process.platform} :(`)
  process.exit(1)
}

console.log('Writing bundle size info…')
writeFileSync(
  path.join(getDistRoot(), 'bundle-size.json'),
  JSON.stringify(getBundleSizes())
)

function packageLinux() {
  const debInstaller = require('electron-installer-debian')

  const options = {
    src: distPath,
    dest: outputDir,
    arch: getDistArchitecture() === 'x64' ? 'amd64' : 'arm64',
    description: 'Simple collaboration from your desktop',
    productDescription:
      'GitHub Desktop is an open source Electron-based GitHub app.',
    section: 'devel',
    priority: 'optional',
    categories: ['Development', 'RevisionControl', 'Git'],
    package: 'github-desktop',
    name: 'github-desktop',
    bin: 'github-desktop',
    icon: join(__dirname, '..', 'app', 'static', 'linux', 'icon-logo.png'),
    scripts: {
      postinst: join(
        __dirname,
        '..',
        'script',
        'resources',
        'linux',
        'postinst.sh'
      ),
      prerm: join(__dirname, '..', 'script', 'resources', 'linux', 'prerm.sh'),
    },
    mimeType: [
      'x-scheme-handler/x-github-desktop-auth',
      'x-scheme-handler/x-github-desktop-dev-auth',
      'x-scheme-handler/x-github-client',
      'x-scheme-handler/github-linux',
    ],
    maintainer: 'GitHub Desktop Team <opensource+desktop@github.com>',
    homepage: 'https://desktop.github.com/',
    depends: [
      'libsecret-1-0',
      'libcurl4',
      'libnss3',
      'libatk1.0-0',
      'libatk-bridge2.0-0',
      'libcups2',
      'libgtk-3-0',
      'libgbm1',
      'libasound2',
      'libxshmfence1',
      'libx11-xcb1',
    ],
    recommends: [
      'gnome-keyring | kwallet-secret-service',
      'libappindicator3-1',
      'libdbusmenu-glib4',
      'libdbusmenu-gtk3-4',
    ],
    desktop: {
      Name: productName,
      GenericName: 'Git Client',
      Comment: 'Simple collaboration from your desktop',
      Categories: 'Development;RevisionControl;Git;',
      Keywords: 'github;git;desktop;',
      StartupWMClass: 'github-desktop',
      Exec: 'github-desktop %u',
      MimeType:
        'x-scheme-handler/x-github-desktop-auth;x-scheme-handler/x-github-desktop-dev-auth;x-scheme-handler/x-github-client;x-scheme-handler/github-linux;',
      Terminal: false,
    },
  }

  console.log('Packaging for Linux…')
  return debInstaller(options)
    .then(() => console.log(`Debian package created in ${outputDir}`))
    .catch((err: any) => {
      console.error(`Error packaging Linux: ${err}`)
      process.exit(1)
    })
}
