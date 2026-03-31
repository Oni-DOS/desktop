#!/bin/bash
set -e

# Create symlink
ln -sf /usr/lib/github-desktop/github-desktop /usr/bin/github-desktop

# Update desktop database
update-desktop-database /usr/share/applications || true

# Update mime database
update-mime-database /usr/share/mime || true
