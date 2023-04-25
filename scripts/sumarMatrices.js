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
		for(let i = 0; i < 2; i++){
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
					input.classList.add(`table${i}`)

					if (i == 0) {
						input.setAttribute("placeholder", `A${f+1}${c+1}`)
					}

					else{
						input.setAttribute("placeholder", `B${f+1}${c+1}`)
					}

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

			if( i == 0){
				let sign = document.createElement("span")
				sign.classList.add("spanSign")
				sign.innerHTML = "+"
				tablesInputsContainer.appendChild(sign)
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

	const createResultTable = ( IDtableResultContainer ) => {
		const table0Array = document.getElementsByClassName("table0")
		const table1Array = document.getElementsByClassName("table1")
		const tablesRowsColums = searchingRowsAndColumns(table0Array)

		const tableResultContainer = document.getElementById(IDtableResultContainer)

		let table = document.createElement("table")
		tableResultContainer.appendChild(table)

		tableResult = sumarMatrices(table0Array, table1Array)

		let cont = 0
		for(let f = 0; f < tablesRowsColums[0]; f++){
			let row = document.createElement("tr")
			table.appendChild(row)
				
			for(let c = 0; c < tablesRowsColums[1]; c++){	
				let column = document.createElement("td")
				row.appendChild(column)

				let span = document.createElement("span")
				span.innerHTML = tableResult[cont]

				column.appendChild(span)
				cont++
			}
		}
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

	const sumarMatrices = (table0Array, table1Array) => {
		const tableResult = []

		for(let i = 0; i < table0Array.length; i++ ){
			tableResult[i] = parseFloat(table0Array[i].value) + parseFloat(table1Array[i].value)
		}

		return tableResult
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