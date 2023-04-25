document.addEventListener("DOMContentLoaded", ()=>{

/*------------------------------------------------------
					FUNCIONES COMUNES
--------------------------------------------------------*/
//  AQUI createTablesInputs crea 2 Tablas

	const IDtablesInputsContainer = "tablesInputsContainer" 
	const IDtableResultContainer = "tableResultContainer"
	const CLASSinputs = "tablesInputs"

	// Modificado para funcionar con 4 inputs en vez de 2
	const checkInputsOrdenIsNotEmpty = () => {
		const ordenInputs = [filasMatriz0, columnasMatriz0,
							 filasMatriz1, columnasMatriz1]

		let validityCounter = 0
		for(let i of ordenInputs){
			i.style.outline = "1px solid red"

			if(i.value != ""){
				i.style.outline = "none"
				validityCounter++
			}
		}

		if (validityCounter == ordenInputs.length){
			checkInputsOrdenCalculationRules()
		}
	}

	const replaceTableContainer = ( IDtableContainer ) => {
		const newTableContainer = document.createElement( "div" )
		newTableContainer.setAttribute( "id", IDtableContainer )

		const oldTableContainer = document.getElementById( IDtableContainer )

		document.body.replaceChild( newTableContainer, oldTableContainer )
	}

	const createTablesInputs = () => {
		const tablesContainer = document.getElementById(IDtablesInputsContainer)

		let cantInputs = 0

		let table0 = document.createElement("table")
		tablesContainer.appendChild(table0)
		for(let r = 0; r < filasMatriz0.value; r++){

			let row = document.createElement("tr")
			table0.appendChild(row)

			for(let c = 0; c < columnasMatriz0.value; c++){
				let column = document.createElement("td")
				row.appendChild(column)

				let input = document.createElement("input")
				column.appendChild(input)
				cantInputs++
				input.setAttribute("type","text")
				input.setAttribute("column",c)
				input.setAttribute("row",r)
				input.setAttribute("inputsList", cantInputs)
				input.classList.add(`table0`)
				input.classList.add(`tablesInput`)
				input.setAttribute("placeholder",`A${r+1}${c+1}`)

				input.addEventListener("change", ()=>{
					input.style.outline = "none"
				})

				input.addEventListener("keyup",(event) =>{
					if (event.key == "Enter") {
						focusNextInput(input.getAttribute("inputsList"))
					}
				})
			}
		}

			let sign = document.createElement("span")
			sign.classList.add("spanSign")
			sign.innerHTML = "x"
			tablesInputsContainer.appendChild(sign)

		let table1 = document.createElement("table")
		tablesContainer.appendChild(table1)
		for(let r = 0; r < filasMatriz1.value; r++){

			let row = document.createElement("tr")
			table1.appendChild(row)

			for(let c = 0; c < columnasMatriz1.value; c++){
				let column = document.createElement("td")
				row.appendChild(column)

				let input = document.createElement("input")
				column.appendChild(input)			
				cantInputs++
				input.setAttribute("type","text")
				input.setAttribute("column",c)
				input.setAttribute("row",r)
				input.setAttribute("inputsList", cantInputs)
				input.classList.add(`table1`)
				input.classList.add(`tablesInput`)
				input.setAttribute("placeholder",`B${r+1}${c+1}`)

				input.addEventListener("change", ()=>{
					input.style.outline = "none"
				})


				input.addEventListener("keydown",(event) =>{
					if (event.key == "Enter") {
						focusNextInput(input.getAttribute("inputsList"))
					}
				})
			}
		}
	}

	const focusNextInput = ( inputsListValue) => {
		const tablesInputArray = document.getElementsByClassName("tablesInput")
		if(tablesInputArray[inputsListValue-1].getAttribute("inputsList") != tablesInputArray.length){
			tablesInputArray[inputsListValue].focus()
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
		const table1 = document.getElementsByClassName("table1")

		let validInputs = 0

		for(let i = 0; i < table0.length; i++){
			table0[i].style.outline = "1px solid red"

			if (table0[i].value != ""){
				table0[i].style.outline = "none"
				validInputs++
			}
		}

		for(let i = 0; i < table1.length; i++){
			table1[i].style.outline = "1px solid red"

			if (table1[i].value != ""){
				table1[i].style.outline = "none"
				validInputs++
			}
		}

		if (validInputs == table0.length + table1.length){
			replaceTableContainer(IDtableResultContainer)
			createResultTable()
		}
	}

	const createResultTable = () => {
		const resultTableContainer = document.getElementById(IDtableResultContainer)
		const multiplyMatrizResult = multiplyMatriz()

		const rowsMatrizResult = multiplyMatrizResult[multiplyMatrizResult.length-2]
		const columnsMatrizResult = multiplyMatrizResult[multiplyMatrizResult.length-1]

		let table = document.createElement("table")
		resultTableContainer.appendChild(table)

		let cont = 0
		for(let r = 0; r < rowsMatrizResult; r++){
			let row = document.createElement("tr")
			table.appendChild(row)

			for(let c = 0; c < columnsMatrizResult; c++){
				let column = document.createElement("td")
				row.appendChild(column)

				let span = document.createElement("span")
				column.appendChild(span)
				span.innerHTML = multiplyMatrizResult[cont]
				cont++ 
			}
		}
	}

	const searchingRowsAndColumns = (tableInputsArray) => {
			const rowColumn = [0,0]

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

			return rowColumn
	}

/*-------------------------------------------------------
				FUNCIONES ESPECIFICAS DE multiplicarMatrices.js
--------------------------------------------------------*/

	const checkInputsOrdenCalculationRules = () => {
		/*Basicamente que no se puede realizar los calculos si el numero de 
		de columnas de la primera matriz no coincide con el numero de filas
		de la segunda*/
		columnasMatriz0.style.outline = "none"
		filasMatriz1.style.outline = "none"
		const tablesInputsContainer = document.getElementById(IDtablesInputsContainer)

		if (columnasMatriz0.value == filasMatriz1.value){
			replaceTableContainer(IDtablesInputsContainer)
			replaceTableContainer(IDtableResultContainer)
			createTablesInputs()
			createBtn({
				IDtableContainer: IDtablesInputsContainer,
				btnValue: "Calcular",
				CLICKeventFunction: checkInputsTableValidity})
		}

		else{
			columnasMatriz0.style.outline = "1px solid red"
			filasMatriz1.style.outline = "1px solid red"

			tablesInputsContainer.innerHTML = "EL NUMERO DE COLUMNAS DE LA PRIMERA MATRIZ DEBE COINCIDIR CON EL NUMERO DE FILAS DE LA SEGUNDA"

		}
	}

	const multiplyMatriz = () => {
		let resultMatriz = []

		const table0Inputs = document.getElementsByClassName("table0")
		const table1Inputs = document.getElementsByClassName("table1")

		//Formato de las variables: [filas, columnas]
		const table0rowColumn = searchingRowsAndColumns(table0Inputs)
		const table1rowColumn = searchingRowsAndColumns(table1Inputs)

		//El orden de la matriz resultante sera el numero de filas de la primera matriz y el numero de columnas de la segunda
		let j1 = 0
		let k1 = 0
		let valor = 0
		for(let i = 0; i < table0rowColumn[0] * table1rowColumn[1]; i++){

			for(let i1 = 0, j = j1, k = k1; i1 < table0rowColumn[1]; i1++, j++, k+=table1rowColumn[1]){
				valor += parseFloat(table0Inputs[j].value) * parseFloat(table1Inputs[k].value)

				if (k == (table0rowColumn[0] * table1rowColumn[1]) - 1 ){
					k1=-1
					j1 += table0rowColumn[1]
				}
			}
			k1++

			resultMatriz[i] = valor
			valor = 0
		}

		// Los dos ultimos elementos de resultMatriz son las filas y columnas que debe tener la matriz resultante
		resultMatriz.push(table0rowColumn[0])
		resultMatriz.push(table1rowColumn[1])
		return resultMatriz
	}

	// Variables Globales
	const filasMatriz0 = document.getElementById("filasMatriz0")
	filasMatriz0.addEventListener("change",checkInputsOrdenIsNotEmpty)

	const columnasMatriz0 = document.getElementById("columnasMatriz0")
	columnasMatriz0.addEventListener("change",checkInputsOrdenIsNotEmpty)

	const filasMatriz1 = document.getElementById("filasMatriz1")
	filasMatriz1.addEventListener("change",checkInputsOrdenIsNotEmpty)

	const columnasMatriz1 = document.getElementById("columnasMatriz1")
	columnasMatriz1.addEventListener("change",checkInputsOrdenIsNotEmpty)

	const generarBtn = document.getElementById("generarBtn")
	generarBtn.addEventListener("click", ()=>{
		checkInputsOrdenIsNotEmpty()
	})

	checkInputsOrdenIsNotEmpty()
})