var xhttp = new XMLHttpRequest();
$deja=false;
var $tab;
var $heure=["zero","un","deux","trois","quatre","cinq","six","sept","huit","neuf","dix","onze","douze","treize","quatorze","quinze","seize","dix-sept","dix-huit","dix-neuf","vingt","vingt-un","vingt-deux","vingt-trois"];
$temps=0;
$erreur=0;
$nbr_min=3;
function load(){
		
	xhttp.onreadystatechange = function() {
	if (xhttp.readyState == 4 && xhttp.status == 200) {
		$b=xhttp.responseText;
		for($i=0;$i<$b.split("\r").length;$i++){
			$b=$b.replace("\r","");
		}
		$b=$b.replace("\r","");
		$tab=$b.split("\n");
		
	}
	}
	xhttp.open("GET", "dialogue/1u.txt", true);
	xhttp.send(); // Envoi de la requête
	setTimeout('loadDoc("intro.txt","demo")', 200);
	setTimeout('fin()', 60000);
	
}
function loadDoc(a,$c) {
	
	xhttp.onreadystatechange = function() { // La fonction anonyme
	if (xhttp.readyState == 4 && xhttp.status == 200) {
		$b=xhttp.responseText;
		for($i=0;$i<$b.split("\r").length;$i++){
			$b=$b.replace("\r","");
		}
		for($i=0;$i<$b.split("\n").length;$i++){
			$b=$b.replace("\n","");
		}
		$b=$b.replace("\r","");
		$b=$b.replace("\n","");

		//document.getElementById("demo").innerHTML=$b;
	ecriture($b,$c);
}
}; // Récupérer le contenu du fichier
xhttp.open("GET", a, true);
xhttp.send(); // Envoi de la requête
}

function ecriture($a,$b){
	if(!$deja){
		$deja=true;
		test($a,$b);
	}
	else{
		setTimeout('ecriture("'+$a+'","'+$b+'")', 1000);
	}
}

function activer(){
	if(!$deja){
		document.getElementsByName("btn")[0].disabled=false;
	}else{
		setTimeout('activer()', 1000);
	}
}
function test($a,$b){
	$v=$a.substr(0,1);
	
	if($v==" "){
		$v=$a.substr(0,2);
	}
	
	$a=$a.substr($v.length,$a.length);
	
	if($v=="|"){
		setTimeout('test2("'+$a+'","'+$b+'")', 250);
	}else{
			document.getElementById($b).innerHTML +=$v
			
		if($a.length!=0){
			setTimeout('test("'+$a+'","'+$b+'")', 50); //75
		}else{
			
			$deja=false;
		}
	}
	
}
function test2($a,$b){
	$in=document.getElementById($b).innerHTML;
	
	if($in.length!=0){
		document.getElementById($b).innerHTML=$in.substr(0,$in.length-1);
		setTimeout('test2("'+$a+'","'+$b+'")', 35); //50
	}else{
		test($a,$b);
	}
	
	
}
function envoi(){
	
	$val=document.getElementsByName("lire")[0].className;
	var $phrase;
	document.getElementsByName("btn")[0].disabled=true;

	
	if($val==0){
		readopt();
		$info=$tab[3].split("||");
		$renvoi="<select name=\"lire\" class=\"1\"><option value=\""+$info[1]+"\">"+$info[2]+"<option value=\""+$info[3]+"\">"+$info[4]+"<option value=\""+$info[5]+"\">"+$info[6]+"</select>";
		
	}
	if($val==1){
		readopt();
		$info=$tab[7].split("||");
		$renvoi="<select name=\"lire\" class=\"2\"><option value=\""+$info[1]+"\">"+$info[2]+"<option value=\""+$info[3]+"\">"+$info[4]+"</select>";
		
	}
	if($val==2){
		readopt();
		$renvoi="<input name=\"lire\" class=\"3\">";
	}
	if($val==3){
		 if(readinp(11)){
			$info=$tab[12].split("||");
			$renvoi="<select name=\"lire\" class=\"4\"><option value=\""+$info[1]+"\">"+$info[2]+"<option value=\""+$info[3]+"\">"+$info[4]+"</select>";
		}
		 
	}
	if($val==4){
		readopt();
		$renvoi="<input name=\"lire\" class=\"5\">";
	}
	if($val==5){
		if(readinp(15)){
			$renvoi="<input name=\"lire\" class=\"6\">";
		}
	}
	if($val==6){
		if(readinp(16)){
			$renvoi="<input name=\"lire\" class=\"7\">";
		}
	}
	if($val==7){
		if(readinp(17)){
			$info=$tab[18].split("||");
		$renvoi="<select name=\"lire\" class=\"8\"><option value=\""+$info[1]+"\">"+$info[2]+"<option value=\""+$info[3]+"\">"+$info[4]+"<option value=\""+$info[5]+"\">"+$info[6]+"</select>";
		}
	}
	if($val==8){
		readopt();
			$renvoi="<input name=\"lire\" class=\"9\">";
		
	}
	if($val==9){
		if(readinp(22)){
			$renvoi="<input name=\"lire\" class=\"10\">";
		}
	}
	if($val==10){
		if(readinp(23)){
			$info=$tab[24].split("||");
		$renvoi="<select name=\"lire\" class=\"11\"><option value=\""+$info[1]+"\">"+$info[2]+"<option value=\""+$info[3]+"\">"+$info[4]+"<option value=\""+$info[5]+"\">"+$info[6]+"</select>";
		
		}
	}
	if($val==11){
		readopt();
		document.getElementById("final").innerHTML="<form action=\"traitement.php\" method=\"post\"><table><tr><td class=\"final\"><label>Nombre d'erreur </label></td><td class=\"final\">: <input name=\"err\" readonly=\"readonly\" value=\""+$erreur+"\"></input></td></tr><tr><td class=\"final\"><label>Temps pris </label></td><td class=\"final\">: <input name=\"time\" readonly=\"readonly\" value=\""+$temps+"\"></input></td></tr><tr><td class=\"final\"><label>Nom</label></td><td class=\"final\">: <input name=\"nom\"></input></td></tr><tr><td class=\"final\"><label>Blague</label></td><td class=\"final\">: <input name=\"joke\"></input></td></tr></table><input type=\"submit\" value=\"OK\"></form>";
		
	}
	document.getElementById("user").innerHTML=$renvoi;
	activer();
	
}

function fin(){
	
	$temps=$temps+1;
	if($temps>$nbr_min){
		alert("fin");
	}else{
		setTimeout('fin()', 60000);
	}
	
}
function readopt(){
		$val2=document.getElementsByName("lire")[0].value;
		$phrase=$tab[$val2].split("||");
		setTimeout('ecriture("'+$phrase[1].replace("\r","").replace("\n","")+'","demo2")', 300);
		setTimeout('ecriture("'+$phrase[2].replace("\r","").replace("\n","")+'","demo")', 300);
}
function readinp($num){
		$info=$tab[$num].split("||");
		$rep=document.getElementsByName("lire")[0].value
		if($info[1]=="Heure"){
			$info[1]=$heure[new Date().getHours()]	;
			$rep=$rep.toLowerCase();
		}
		setTimeout('ecriture("'+"|"+$rep+'","demo2")', 300);
		
		if($rep==$info[1]){
			setTimeout('ecriture("'+$info[2].replace("\r","").replace("\n","")+'","demo")', 300);
			return true;
		}else{
			
			setTimeout('ecriture("'+$info[3].replace("\r","").replace("\n","")+'","demo")', 300);
			$erreur=$erreur+1;
			return false;
		}
	
}