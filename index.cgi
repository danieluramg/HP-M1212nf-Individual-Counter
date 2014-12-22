#!/bin/sh
eval "`/usr/bin/proccgi`"
echo "Content-Type: text/html;"
echo ""
pasta="/partition/apache/htdocs/ideias"

url="http://192.168.10.212/SSI/info_configuration.htm" #caminho da pagina da impressora que vai ser modificada

#se for passado parametro para ver contador
if [ "$FORM_ver_contador" ]; then
	cat "$pasta/contador/contador.txt"
	
#se for passado parametro para definir contador
elif [ "$FORM_definir_contador" ]; then
	echo $FORM_CONT > "$pasta/contador/contador.txt"
	
#se nao for passado parametro	
else
echo "$(wget -O - "$url")"
	echo '<script type="text/javascript">'
		echo "$(cat "$pasta/userscripts/jquery-2.1.1.min.js")"
		echo "$(cat "$pasta/contador/script.js")"
	echo '</script>'
fi