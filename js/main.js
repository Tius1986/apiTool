document.getElementById('get').addEventListener('click', getData)

// Fetch JSON/API e.g
// https://jsonplaceholder.typicode.com/todos
// https://www.fishwatch.gov/api/species


function showOutput(res) {
    document.getElementById('display').innerHTML = `
    <div class="col-md-12">

        <div class="card card-body mb-4">
            <h4>Status: ${res.status}</h4>
        </div>

        <div class="card mt-3">
            <div class="card-header">
                <h4>Header</h4>
            </div>
            <div class="card-body">
                <pre>${JSON.stringify(res.headers, null, 2)}</pre>  
            </div>
        </div>

        <div class="card mt-3">
            <div class="card-header">
                <h4>Data</h4>
            </div>
            <div class="card-body">
                <pre>${JSON.stringify(res.data, null, 2)}</pre>
            </div>
        </div>

        <div class="card mt-3">
            <div class="card-header">
                <h4>Config</h4>
            </div>
            <div class="card-body">
                <pre>${JSON.stringify(res.config, null, 2)}</pre>
            </div>
        </div>
    </div>
    `
}

function getData() {

    const url = document.getElementById('search')

    const selected = document.getElementById('limit-results')
    const selectedValue = selected.options[selected.selectedIndex].value

    let results = ''

    if (selectedValue != 'all') {
        results = `?_limit=${selectedValue}`
    }

    axios
        .get(url.value + results)
        .then(res => showOutput(res))
        .catch(err => {

            // Server responded with a status other than 200 range
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)

            if (err.response.status === 404) {
                alert('Error: Page not found.')

            } else if (err.request) {
                // Request was made but no response
                console.log(err.request)

            } else {
                console.log(err.message)
            }
        })
}