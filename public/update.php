<?php
echo "Test3\n";
shell_exec('/var/www/ifound-maps/update.sh', $out);
echo implode("<br />\n", $out);
