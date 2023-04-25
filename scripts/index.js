document.addEventListener("DOMContentLoaded", ()=>{
	const linksHomePageArray = document.getElementsByClassName("linksHomePage")

	//funcion para extraer el id del elemento del href de los linksHomePage
	const extractIdofLink = ( aHTML ) => {
		let idExtracted = ""
		let hrefOfaHTML = aHTML.href

		for(let i = 0; i < hrefOfaHTML.length; i++){
			if( hrefOfaHTML[i] == "#"){
				idExtracted = hrefOfaHTML.substring(i+1, hrefOfaHTML.length)
			}
		}
		return idExtracted
	}

	for(let i = 0; i < linksHomePageArray.length; i++){
		let gridElement = document.getElementById(extractIdofLink(linksHomePageArray[i]))

		linksHomePageArray[i].addEventListener("click", ()=>{
			setTimeout(()=>{
				gridElement.style.opacity = ".7"
			}, 500)
			setTimeout(()=>{
				gridElement.style.opacity = "1"
			}, 1000)
			setTimeout(()=>{
				gridElement.style.opacity = ".7"
			}, 1500)
			setTimeout(()=>{
				gridElement.style.opacity = "1"
			}, 2000)
			setTimeout(()=>{
				gridElement.style.opacity = ".7"
			}, 2500)
			setTimeout(()=>{
				gridElement.style.opacity = "1"
			}, 3000)
		})	
	}
})