<?php
echo "Test3\n";
shell_exec('cd /var/www/ifound-maps && /usr/bin/git fetch --all && /usr/bin/git checkout origin/master && /usr/bin/npm install pkg.json && /usr/bin/npm run build', $out);
echo implode("<br />\n", $out);
