document.addEventListener("DOMContentLoaded", ()=>{

/*------------------------------------------------------
					FUNCIONES COMUNES
--------------------------------------------------------*/
//  AQUI createTablesInputs crea 1 input y una tabla

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

	const createTablesInputs = () => {
		const tablesContainer = document.getElementById(IDtablesInputsContainer)

		let cantInputs = 0

		let inputValor = document.createElement("input")
		tablesContainer.appendChild(inputValor)
		cantInputs++
		inputValor.setAttribute("type","text")
		inputValor.setAttribute("inputsList", cantInputs)
		inputValor.setAttribute("id", "inputValor")
		inputValor.setAttribute("placeholder",`Valor`)
		inputValor.classList.add(`tablesInput`)
		inputValor.addEventListener("change", ()=>{
			inputValor.style.outline = "none"
		})

		inputValor.addEventListener("keyup",(event) =>{
			if (event.key == "Enter") {
				focusNextInput(inputValor.getAttribute("inputsList"))
			}
		})

		let sign = document.createElement("span")
		sign.classList.add("spanSign")
		sign.innerHTML = "-"
		tablesContainer.appendChild(sign)

		let table0 = document.createElement("table")
		tablesContainer.appendChild(table0)

		for(let r = 0; r < filasInput.value; r++){
			let row = document.createElement("tr")
			table0.appendChild(row)

			for(let c = 0; c < columnasInput.value; c++){
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
		const inputValor = document.getElementById("inputValor")

		let validInputs = 0

		inputValor.style.outline = "1px solid red"
		if (inputValor.value != ""){
				inputValor.style.outline = "none"
				validInputs++
			}

		for(let i = 0; i < table0.length; i++){
			table0[i].style.outline = "1px solid red"

			if (table0[i].value != ""){
				table0[i].style.outline = "none"
				validInputs++
			}
		}

		if (validInputs == table0.length + 1){
			replaceTableContainer(IDtableResultContainer)
			createResultTable()
		}
	}

// Modificado para calcular el valor resultante internamente
	const createResultTable = () => {
		const table0InputsArray = document.getElementsByClassName("table0")
		const table0rowsColums = searchingRowsAndColumns(table0InputsArray)

		const resultTableContainer = document.getElementById(IDtableResultContainer)
		const inputValor = document.getElementById("inputValor").value

		let table = document.createElement("table")
		resultTableContainer.appendChild(table)

		let cont = 0
		for(let i = 0; i < table0rowsColums[0]; i++){
			let row = document.createElement("tr")
			table.appendChild(row)

			for(let j = 0; j < table0rowsColums[1]; j++){
				let column = document.createElement("td")
				row.appendChild(column)

				let span = document.createElement("span")
				column.appendChild(span)
				span.innerHTML = parseFloat(table0InputsArray[cont].value) - parseFloat(inputValor)
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

	//Variables Globales
	const generarBtn = document.getElementById("generarBtn")
	generarBtn.addEventListener("click", checkInputsOrdenIsNotEmpty)

	const filasInput = document.getElementById("filasInput")
	filasInput.addEventListener("change",checkInputsOrdenIsNotEmpty)
	
	const columnasInput = document.getElementById("columnasInput")
	columnasInput.addEventListener("change",checkInputsOrdenIsNotEmpty)
	
	checkInputsOrdenIsNotEmpty()
})