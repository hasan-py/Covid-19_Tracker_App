const totalConfirmed = document.querySelector('#totalActive')
const totalDeath = document.querySelector('#totalDeath')
const totalRecovered = document.querySelector('#totalRecovered')
const lastUpdateDate = document.querySelector('#lastUpdateDate')
const tbody = document.querySelector('#tbody')
const search = document.querySelector('#search')

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



// Total Case

const totalApiURL = "https://covid19.mathdro.id/api"
axios.get(totalApiURL)
.then((res)=> {
	totalConfirmed.innerHTML = numberWithCommas(res.data.confirmed.value)
	totalRecovered.innerHTML = numberWithCommas(res.data.recovered.value)
	totalDeath.innerHTML = numberWithCommas(res.data.deaths.value)

	lastUpdateDate.innerHTML = `
	<p class="lead text-center lastUpdateDate">Last Update on ${res.data.lastUpdate.slice(0,10)} </p>
	`
})
.catch((e)=> {
	console.log(e)
})


// Country Based Case 

const countryBasedURL = "https://covid19.mathdro.id/api/confirmed"

axios.get(countryBasedURL)
.then(res=> {
	res.data.forEach((obj)=> {

		let tBody = tbody
		let tr = document.createElement('tr')

		let tdProvinceState = document.createElement('td')
		let tdCountry = document.createElement('td')
		let tdConfirmed = document.createElement('td')
		let tdRecovered = document.createElement('td')
		let tdDeaths = document.createElement('td')
		let tdActive = document.createElement('td')

		tdProvinceState.innerHTML = obj.provinceState
		tdCountry.innerHTML = obj.countryRegion
		tdCountry.style.color = "ghostwhite"
		tdConfirmed.innerHTML = numberWithCommas(obj.confirmed)
		tdConfirmed.style.color = 'yellow'
		tdRecovered.innerHTML = numberWithCommas(obj.recovered)
		tdRecovered.style.color = "DeepSkyBlue"
		tdDeaths.innerHTML = numberWithCommas(obj.deaths)
		tdDeaths.style.color = "OrangeRed"
		tdActive.innerHTML = numberWithCommas(obj.active)
		tdActive.style.color = "SpringGreen"

		tr.appendChild(tdCountry)
		tr.appendChild(tdConfirmed)
		tr.appendChild(tdActive)
		tr.appendChild(tdRecovered)
		tr.appendChild(tdDeaths)
		tr.appendChild(tdProvinceState)

		tBody.appendChild(tr)
	})

})



search.addEventListener('keyup',(e)=>{
	tbody.innerHTML = ''
	let value = e.target.value.toUpperCase()
	
	let arr = []

	axios.get(countryBasedURL)
	.then(res=> {
		res.data.forEach((obj)=> {
			
			let countryUpperCase = obj.countryRegion.toUpperCase()
			if ( countryUpperCase.indexOf(value) > -1 ) {

				arr.push(obj)
				
			}

		})
		
		arr.forEach((obj)=>{
			let tr =document.createElement('tr')
			tr.innerHTML = `

			<td style="color:ghostwhite;">${obj.countryRegion}</td>
			<td style="color:yellow;">${obj.confirmed}</td>
			<td style="color:SpringGreen;">${obj.active}</td>
			<td style="color:DeepSkyBlue;">${obj.recovered}</td>
			<td style="color:OrangeRed;">${obj.deaths}</td>
			<td >${obj.provinceState}</td>

			`
			tbody.appendChild(tr)
		})
	})
})


let refresh = document.querySelector('#refresh')
refresh.addEventListener('click',()=>{
	location.reload()

})