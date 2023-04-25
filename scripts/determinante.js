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
				input.setAttribute("placeholder", `A${f+1}${c+1}`)
				input.classList.add(CLASSinputs)
				input.classList.add(`table0`)

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
			replaceTableContainer("tableResultContainer")
			createResultTable(IDtableResultContainer)
		}
	} 

	// Modificado para solo mostrar el texto que dice el determinante
	const createResultTable = ( IDtableResultContainer ) => {
		const table0Array = document.getElementsByClassName("table0")

		const tableResultContainer = document.getElementById(IDtableResultContainer)

		const determinanteResult = determinante(table0Array, searchingRowsAndColumns(table0Array))

		tableResultContainer.innerHTML = `El determinante de la matriz es ${determinanteResult}`

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
				FUNCIONES DE determinante.js
--------------------------------------------------------*/

	const determinante = (table0Array, table0ArrayRowsColums) => {
		const arrayAux = table0Array
		const arrayAuxRowsColumns = table0ArrayRowsColums

		let determinanteResult = 0

		for(let i = 0; i < arrayAuxRowsColumns[0]; i++){
			const subArrayAux = []
			let cont = 0

			for( let j = 0; j < arrayAux.length; j++){
				if( arrayAux[j].getAttribute("row") != arrayAux[i].getAttribute("row")
					&& arrayAux[j].getAttribute("column") != arrayAux[i].getAttribute("column")){
					subArrayAux[cont] = arrayAux[j]
					cont++
				}
			}

			if(subArrayAux.length != 4 && i % 2 == 0){
				determinanteResult += parseInt(arrayAux[i].value) * determinante(subArrayAux, [ arrayAuxRowsColumns[0]-1, arrayAuxRowsColumns[1]-1 ])	
			}

			else if(subArrayAux.length != 4 && i % 2 == 1){
				determinanteResult -= parseInt(arrayAux[i].value) * determinante(subArrayAux, [ arrayAuxRowsColumns[0]-1, arrayAuxRowsColumns[1]-1 ])
			}

			else if(subArrayAux.length == 4 && i % 2 == 0){
				determinanteResult += parseInt(arrayAux[i].value) * ( ( parseInt(subArrayAux[0].value) * parseInt(subArrayAux[3].value) ) - (parseInt( subArrayAux[2].value) * parseInt(subArrayAux[1].value)))	
			}

			else if(subArrayAux.length == 4 && i % 2 == 1){
				determinanteResult -= parseInt(arrayAux[i].value) * ( ( parseInt(subArrayAux[0].value) * parseInt(subArrayAux[3].value) ) - (parseInt(subArrayAux[2].value)*parseInt(subArrayAux[1].value)))
			}

		}
		return determinanteResult
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