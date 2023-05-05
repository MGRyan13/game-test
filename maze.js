let cibleAtteinte = false;
let compteurDeplacement = 0;
let ligne_courante = 7, colonne_courante = 1;
let ligne_cible = 7, colonne_cible = 10;
let ste=true;
let i=1;
let positionActuelle=0;
let comptActuelle=0;



function deplacer(event){
	let position=document.getElementById(ligne_courante+"_"+colonne_courante);
	let score=document.createElement("h4");
	score.classList.add("scoreList");
	

	/* up arrow */
	if(event.keyCode == 38){
		if(document.getElementById((ligne_courante-1)+"_"+colonne_courante).style.borderBottomColor  != 'red'){
			ligne_courante--;
		}
	}
	
	/*down arrow*/
	else if(event.keyCode == 40){
		if(document.getElementById((ligne_courante+1)+"_"+colonne_courante).style.borderTopColor  != 'red'){
			ligne_courante++;
		}
	}

	/*left arrow*/
	else if(event.keyCode == 37){
		if(document.getElementById(ligne_courante+"_"+(colonne_courante-1)).style.borderRightColor  != 'red'){
			colonne_courante--;
		}
	}

	/*right arrow*/
	else if(event.keyCode == 39){
		if(document.getElementById(ligne_courante+"_"+(colonne_courante+1)).style.borderLeftColor  != 'red'){
			colonne_courante++;
		}
	}



	/* deplacement */
	if(cibleAtteinte != true){
		position.style.backgroundImage = "";
		position=document.getElementById(ligne_courante+"_"+colonne_courante);
		position.style.backgroundImage = "url('lapin.jpg')";
		compteurDeplacement++;
		positionActuelle=position;
		comptActuelle=compteurDeplacement;
	}
	/* le cas d'arrivé a la destination */
	if((ligne_courante == ligne_cible) && (colonne_courante == colonne_cible) && ste){
		cibleAtteinte=true;
		document.getElementById("result").innerText="";
		score.innerText=""+i+")-vous avez atteignez la destination en:[" +compteurDeplacement+ "]move";
		mes_scores.append(score);
		document.getElementById("7_10").style.backgroundImage="url('lunch.png')";
		ste= false;
		document.getElementById("alert").style.display="block";
		i++;
		
	}

	/* ALT+N */
	if (event.altKey && event.key === 'n') {
        let conf=confirm("Voulez-vous commençer une nouvelle partie ?");
		if(conf){
			cibleAtteinte = false;
			compteurDeplacement = 0;
			ligne_courante = 7, colonne_courante = 1;
			ligne_cible = 7, colonne_cible = 10;
			position.style.backgroundImage="";
			document.getElementById("7_10").style.backgroundImage="url('carotte.png')";
			document.getElementById("7_1").style.backgroundImage="url('lapin.jpg')";
			ste = true;
			document.getElementById("alert").style.display="none";
		}     
    }

}





/******************************************************************************************/
/* c'est function sont pour les cookies */
function Enregistre(){
	let score=document.getElementsByClassName("scoreList");
	let dateExpiration = new Date(Date.now() + 24*60*60*1000);
	dateExpiration = dateExpiration.toUTCString();
	
	for(let j=0;j<score.length;j++)
		document.cookie="score"+(j+1)+"="+score[j].textContent+"; path=/; expires=" + dateExpiration;
	document.cookie="position="+positionActuelle+"; path=/; expires="+dateExpiration;
	document.cookie="compteur="+comptActuelle+"; path=/; expires="+dateExpiration;

}

function recuperer(){
	let cookies = document.cookie;
	let scoreTab=[];
	let cookiesTab = cookies.split(";");

	for(let k = 0; k < cookiesTab.length; k++) {
		let unCookie = cookiesTab[k].split("=");
		if(unCookie[0].trim() == ("score"+(k+1)))
			scoreTab[k] = unCookie[1];
		else if(unCookie[0].trim() == "position")
			position = unCookie[1];
		else if(unCookie[0].trim() == "compteur")
			compteur = unCookie[1];
	}

	for(let l=0 ; l<scoreTab.length;l++)
		document.getElementById("mes_scores").innerHTML="<h4>"+scoreTab[l]+"</h4>";
	document.getElementById(ligne_courante+"_"+colonne_courante)=position;
}
/******************************************************************************************/

