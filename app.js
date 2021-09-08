window.addEventListener('load', () => {
    const searchForm = document.getElementById('search-form');
    const trackName = document.querySelector('.track-name');
    const artistName = document.querySelector('.artist-name');
    const searchResults = document.querySelector('.search-results');
    const searchResultsArtists = document.querySelector('.search-artist');
    const test = document.querySelectorAll('.test')


    searchForm.addEventListener('submit', getInput)


    function getInput(e) {

        e.preventDefault()
        const searchInput = e.target['search-lyric'].value
        const api = `https://shazam.p.rapidapi.com/search?term=${searchInput}&locale=en-US&offset=0&limit=15`
        fetch(api, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "shazam.p.rapidapi.com",
                "x-rapidapi-key": "27b75a3147msh07900745f4edceep15fcb0jsn727c84d5ae66"
            }
        })

            .then(data => {
                return data.json()
            })
            .then(res => {
                trackName.innerHTML = ''
                for (let i = 0; i < res.tracks.hits.length; i++) {
                    searchResults.textContent = `Results for "${searchInput}"`
                    const { title, subtitle, share } = res.tracks.hits[i].track
                    let a = document.createElement('a')
                    let link = share.href
                    a.href = link
                    let newTracks = document.createElement('p')
                    newTracks.classList.add('hits')
                    newTracks.textContent = `${title} -${subtitle}`
                    a.appendChild(newTracks)
                    trackName.appendChild(a)
                }
                let hits = res.artists.hits
                searchResultsArtists.textContent = `Artists for "${searchInput}"`
                artistName.innerHTML = ''
                hits.forEach(hit => {
                    let newNames = document.createElement('p')
                    newNames.classList.add('names')
                    newNames.textContent = hit.artist.name

                    artistName.appendChild(newNames)
                })
            })
            .catch(err => {
                console.log(err)
            });

    }



})

function removeChildren() {
    while (artistName.newNames) {
        artistName.firstChild.remove()
    }
    while (trackName.a) {
        trackName.firstChild.remove()
    }
}