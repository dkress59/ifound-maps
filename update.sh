/usr/bin/git checkout -- .
/usr/bin/git pull
yarn --pure-lockfile
yarn build
pm2 restart ecosystem.config.js --env production
