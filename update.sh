# This is being called from ../ifound-rest
cd /var/www/ifound-maps
/usr/bin/git checkout -- .
/usr/bin/git pull origin public
npm install
#npm run build
