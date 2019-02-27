<?php
$final="il y a eu ".$_POST['err']." erreur pour l'eleve ".$_POST['nom']." en ".$_POST['time']." minutes, la blague est</br>".$_POST['joke'];
echo $final;
$file = fopen('resultat.txt', 'a+');
$f=str_replace("</br>", PHP_EOL, $final).PHP_EOL;
fputs($file, $f.PHP_EOL);

?>