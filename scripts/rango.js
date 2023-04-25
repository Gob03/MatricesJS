document.addEventListener("DOMContentLoaded", ()=>{

/*------------------------------------------------------
					FUNCIONES COMUNES
--------------------------------------------------------*/
//  AQUI createTablesInputs crea 2 Tablas

	const IDtablesInputsContainer = "tablesInputsContainer" 
	const IDtableResultContainer = "tableResultContainer"
	const CLASSinputs = "tablesInputs"

	const checkInputsOrdenIsNotEmpty = () => {
		const ordenInputs = [filasInput, columnasInput]

		let validityCounter = 0
		for(let i of ordenInputs){
			i.style.outline = "1px solid red"

			if(i.value != ""){
				i.style.outline = "none"
				validityCounter++
			}
		}

		if (validityCounter == ordenInputs.length){
			replaceTableContainer(IDtablesInputsContainer)
			replaceTableContainer(IDtableResultContainer)
			createTablesInputs(IDtablesInputsContainer, CLASSinputs)
			createBtn({
				IDtableContainer: IDtablesInputsContainer,
				btnValue: "Calcular",
				CLICKeventFunction: checkInputsTableValidity
			})
		}
	}

	const replaceTableContainer = ( IDtableContainer ) => {
		const newTableContainer = document.createElement( "div" )
		newTableContainer.setAttribute( "id", IDtableContainer )

		const oldTableContainer = document.getElementById( IDtableContainer )

		document.body.replaceChild( newTableContainer, oldTableContainer )
	}

	const createTablesInputs = (IDtablesInputsContainer, CLASSinputs) => {
		const tablesInputsContainer = document.getElementById(IDtablesInputsContainer)

		let cantInputs = 0
		let table = document.createElement("table")
		tablesInputsContainer.appendChild(table)

		for(let f = 0; f < filasInput.value; f++){
			let row = document.createElement("tr")
			table.appendChild(row)

			for(let c = 0; c < columnasInput.value; c++){
				let column = document.createElement("td")
				row.appendChild(column)

				let input = document.createElement("input")
				cantInputs++
				input.setAttribute("type","text")
				input.setAttribute("column",c)
				input.setAttribute("row",f)
				input.setAttribute("inputsList", cantInputs)
				input.classList.add(CLASSinputs)
				input.classList.add(`table0`)
				input.setAttribute("placeholder", `A${f+1}${c+1}`)

				input.addEventListener("change", ()=>{
					input.style.outline = "none"
				})

				input.addEventListener("keyup",(event) =>{
					if (event.key == "Enter") {
						focusNextInput(input.getAttribute("inputsList", CLASSinputs))
					}
				})

				column.appendChild(input)
			}
		}
	}

	const focusNextInput = (inputsListValue, CLASStableInputs) => {
		const tablesInputsArray = document.getElementsByClassName(CLASSinputs)

		if(tablesInputsArray[inputsListValue-1].getAttribute("inputsList") != tablesInputsArray.length){
			tablesInputsArray[inputsListValue].focus()
		}
	} 

	const createBtn = ({IDtableContainer, btnValue, CLICKeventFunction}) => {
		const tableContainer = document.getElementById(IDtableContainer)

		const btn = document.createElement("input")
		btn.setAttribute("type", "button")
		btn.setAttribute("value", btnValue)
		btn.classList.add("btns")
		btn.addEventListener("click", CLICKeventFunction)

		tableContainer.appendChild(btn)
		tableContainer.style.borderBottom = "2px solid #5863F8"
	}

	const checkInputsTableValidity = () => {
		const table0 = document.getElementsByClassName("table0")

		let validInputs = 0

		for(let i = 0; i < table0.length; i++){
			table0[i].style.outline = "1px solid red"

			if (table0[i].value != ""){
				table0[i].style.outline = "none"
				validInputs++
			}
		}

		if (validInputs == table0.length){
			replaceTableContainer(IDtableResultContainer)
			createResultTable(table0)
		}
	}

	const createResultTable = (tableInputsArray) => {
		const table0 = document.getElementsByClassName("table0")

		const tableResultContainer = document.getElementById(IDtableResultContainer)

		const result2DArray = rango(tableInputsArray)

		let table = document.createElement("table")
		tableResultContainer.appendChild(table)

		for(let i = 0; i < result2DArray.length; i++){
			let row = document.createElement("tr")
			table.appendChild(row)

			for(let j = 0 ; j < result2DArray[0].length; j++){
				let column = document.createElement("td")
				row.appendChild(column)

				let span = document.createElement("span")
				span.innerHTML = result2DArray[i][j]

				column.appendChild(span)
			}
		}

		const rangoText = document.createElement("p")
		rangoText.innerHTML = `El rango de la matriz es ${result2DArray.length}`
		rangoText.setAttribute("id", "rangoText")
		tableResultContainer.appendChild(rangoText)
	}

	const searchingRowsAndColumns = (tableInputsArray) => {
		let rowColumn = [0,0]

		for(let i = 0; i < tableInputsArray.length; i++){
			if(tableInputsArray[i].getAttribute("column") != i){
				rowColumn[1] = i
				rowColumn[0] = tableInputsArray.length / i
				break;
			}
		}

		if (rowColumn[0] == 0 && rowColumn[1] == 0){
			rowColumn[0] = 1
			rowColumn[1] = tableInputsArray.length 
		}

		//FORMATO DE SALIDA [filas, columnas]
		return rowColumn
	}

	/*-------------------------------------------------------
				FUNCIONES DE sumarMatrices.js
	--------------------------------------------------------*/
	const rango = (tableInputsArray) => {

		const convertTo2DArray = (tableInputsArray) => {
			const auxArray = []
			const tableInputsArrayRowsColumns = searchingRowsAndColumns(tableInputsArray)

			let cont = 0
			for(let i = 0; i < tableInputsArrayRowsColumns[0]; i++){
				auxArray[i] = []

				for(let j = 0; j < tableInputsArrayRowsColumns[1]; j++){
					auxArray[i][j] = tableInputsArray[cont].value
					cont++
				}
			}

			return auxArray
		}

		const deleteNullRows = (tableInputs2DArray) => {
			const auxArray = tableInputs2DArray

			let rowsCont = tableInputs2DArray.length
			let columnCont = tableInputs2DArray[0].length

			for(let i = 0; i < rowsCont; i++){
				let nullCont = 0

				for(let j = 0; j < columnCont; j++){
					if (auxArray[i][j] != "0") {
						break;
					}

					else{
						nullCont++
					}

					if(nullCont == columnCont){
						let deleted = auxArray.splice(i, 1)
						--i
						--rowsCont					}
				}
			}

			return auxArray
		}

		const pushRowsWithZeros = (tableInputs2DArray) => {
			const auxArray = tableInputs2DArray

			for( let i = 0; i < tableInputs2DArray.length; i++){

				for(let j = 0; j < tableInputs2DArray[0].length; j++){
					
					let antiLoop = 0
					while(i == j && auxArray[i][j] == 0){
						let aux = auxArray.splice(i, 1)
						auxArray.push(aux[0])
						antiLoop++

						if(antiLoop == tableInputs2DArray.length){
							break;
						}
					}
				}
			}

			return auxArray
		}

		const getIteration = (tableInputs2DArray) => {
			let iterationArray = []
			let cont = 0

			for (let i = tableInputs2DArray.length-1; i > 0; i--){
				iterationArray[cont] = i
				cont++
			}

			return iterationArray
		}

		const calcuteRango = (create2DArray) => {
			const auxArray = create2DArray
			const iteration = getIteration(create2DArray)

			for(let i = 0; i < auxArray.length-1; i++){
				for(let j = i+1, x = 0; x < iteration[i]; j++, x++){
					let multiplyRowIBy = auxArray[j][i]
					let multiplyRowJBy = auxArray[i][i]

					if(multiplyRowJBy == 0 || multiplyRowIBy == 0){
						continue
					}
					for(let x = 0; x < auxArray[0].length; x++){
						auxArray[j][x] = (parseInt(auxArray[i][x]) * parseInt(multiplyRowIBy)) - (parseInt(auxArray[j][x]) * parseInt(multiplyRowJBy))
					}
				}
			}

			return auxArray
		}

		let result2DArray = convertTo2DArray(tableInputsArray)
		result2DArray = deleteNullRows(result2DArray)
		result2DArray = pushRowsWithZeros(result2DArray)
		result2DArray = calcuteRango(result2DArray)
		result2DArray = deleteNullRows(result2DArray)

		return result2DArray
	}

	//Variables Globales

	const generarBtn = document.getElementById("generarBtn")
	generarBtn.addEventListener("click", checkInputsOrdenIsNotEmpty)

	const filasInput = document.getElementById("filasInput")
	filasInput.addEventListener("change",checkInputsOrdenIsNotEmpty)
	
	const columnasInput = document.getElementById("columnasInput")
	columnasInput.addEventListener("change",checkInputsOrdenIsNotEmpty)
	
	checkInputsOrdenIsNotEmpty()
})