<?php
echo 'Test2';
shell_exec('../update.sh', $out);
echo explode("<br />\n", $out);
