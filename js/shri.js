/**
 * Реализация API, не изменяйте ее
 * @param {string} url
 * @param {function} callback
 */
function getData(url, callback) {
    var RESPONSES = {
        '/countries': [
            {name: 'Cameroon', continent: 'Africa'},
            {name :'Fiji Islands', continent: 'Oceania'},
            {name: 'Guatemala', continent: 'North America'},
            {name: 'Japan', continent: 'Asia'},
            {name: 'Yugoslavia', continent: 'Europe'},
            {name: 'Tanzania', continent: 'Africa'}
        ],
        '/cities': [
            {name: 'Bamenda', country: 'Cameroon'},
            {name: 'Suva', country: 'Fiji Islands'},
            {name: 'Quetzaltenango', country: 'Guatemala'},
            {name: 'Osaka', country: 'Japan'},
            {name: 'Subotica', country: 'Yugoslavia'},
            {name: 'Zanzibar', country: 'Tanzania'},
        ],
        '/populations': [
            {count: 138000, name: 'Bamenda'},
            {count: 77366, name: 'Suva'},
            {count: 90801, name: 'Quetzaltenango'},
            {count: 2595674, name: 'Osaka'},
            {count: 100386, name: 'Subotica'},
            {count: 157634, name: 'Zanzibar'}
        ]
    };

    setTimeout(function () {
        var result = RESPONSES[url];
        if (!result) {
            return callback('Unknown url');
        }

        callback(null, result);
    }, Math.round(Math.random * 1000));
}

/**
 * Ваши изменения ниже
 */
var requests = ['/countries', '/cities', '/populations'];
var getPopulation = function() {
    var responses = {};
    var place = window.prompt('Type continent, country or city.');
    if (place) {
        place = place.capitalizeFirstLetter();
        for (var i = 0; i < requests.length; i++) {
            (function() {
                var request = requests[i];
                var callback = function(error, result) {
                    //Можно и ошибки в лог выводить
                    if (error) {
                        console.log(error);
                    };
                    responses[request] = result;
                    var l = [];
                    for (var K in responses)
                        l.push(K);
                    if (l.length === requests.length) {
                        countPopulation(responses, place);
                    }
                };
                getData(request, callback);
            })();
        }
    };
}
var countPopulation = function(responses, place) {
    var continent = {
        name: '',
        countries: [],
        cities: [],
        population: 0
    };
    var country = {
        name: '',
        cities: [],
        population: 0
    };
    var city = {
        name: '',
        population: 0
    };
    //Find place in contitnents
    for (var i = 0; i < responses['/countries'].length; i++) {
        if (responses['/countries'][i].continent === place) {
            continent.countries.push(responses['/countries'][i].name);
            continent.name = place;
        }
        //Find place in countries
        if (responses['/countries'][i].name === place) {
            country.name = responses['/cities'][i].country;
        }
    }

    for (var i = 0; i < responses['/cities'].length; i++) {
        //Find continent connected cities
        for (var j = 0; j < continent.countries.length; j++) {
            if (responses['/cities'][i].country === continent.countries[j]) {
                continent.cities.push(responses['/cities'][i].name);
            }
        }
        //Find country connected cities
        if (responses['/cities'][i].country === country.name) {
            country.cities.push(responses['/cities'][i].name);
        }
        //Find place in cities
        if (responses['/cities'][i].name === place) {
            city.name = responses['/cities'][i].name;
        }

    }
    //Count population
    for (var i = 0; i < responses['/populations'].length; i++) {
        for (var j = 0; j < continent.cities.length; j++) {
            if (responses['/populations'][i].name === continent.cities[j]) {
                continent.population += responses['/populations'][i].count;
            }
        }
        for (var j = 0; j < country.cities.length; j++) {
            if (responses['/populations'][i].name === country.cities[j]) {
                country.population += responses['/populations'][i].count;
            }
        }
        if (responses['/populations'][i].name === city.name) {
            city.population += responses['/populations'][i].count;
        }
    }
    var text;
    var found = false;
    if (continent.population!==0) { text = 'Population of continent ' +continent.name+' is '+continent.population;found = true;}
    if(country.population!==0) { text = 'Population of country ' +country.name+' is '+country.population;found = true;}
    if (city.population!==0) { text = 'Population of city ' +city.name+' is '+city.population;found = true;}
    if (!found){ text = 'Sorry we can\'t find anything with name: ' + place;}
    console.log(text);
    alert(text);
}
String.prototype.capitalizeFirstLetter = function() {
    this.toLowerCase();
    return this.charAt(0).toUpperCase() + this.slice(1);
}
document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('get-population');
    button.addEventListener('click', function() {
        getPopulation();
    });
})
