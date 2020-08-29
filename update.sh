# This is being called from ../ifound-rest
cd /var/www/ifound-maps
/usr/bin/git fetch --all
/usr/bin/git checkout origin/public
npm install pkg.json
npm run build
