<?
echo "Test4\n";
shell_exec('/var/www/ifound-maps/update.sh', $out);
echo implode("<br />\n", $out);