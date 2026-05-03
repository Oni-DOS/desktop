#!/bin/bash
set -e

# Create symlink
ln -sf /usr/lib/github-desktop/github-desktop /usr/bin/github-desktop

# Update desktop database
update-desktop-database /usr/share/applications || true

# Update mime database
update-mime-database /usr/share/mime || true

# Register protocol handler
xdg-mime default github-desktop.desktop x-scheme-handler/x-github-desktop-auth || true
xdg-mime default github-desktop.desktop x-scheme-handler/x-github-desktop-dev-auth || true
xdg-mime default github-desktop.desktop x-scheme-handler/x-github-client || true
xdg-mime default github-desktop.desktop x-scheme-handler/github-linux || true
