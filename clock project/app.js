document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.info-btn');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const clockWrapper = button.parentElement;
            const flagInfo = clockWrapper.querySelector('.flag-info');
            flagInfo.classList.toggle('active'); 
        });
    });

    const clocks = document.querySelectorAll('.clock');

    clocks.forEach(clock => {
        const locale = clock.dataset.locale;
        updateClock(clock, locale);
        setInterval(() => updateClock(clock, locale), 1000);
    });

    function updateClock(clock, locale) {
        const options = {
            timeZone: locale,
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };
        const formattedTime = new Date().toLocaleString('en-US', options);
        clock.textContent = formattedTime;
    }

    function getCountriesData() {
        return fetch('countries.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch countries data.');
                }
                return response.json();
            });
    }

    function showCountryInfo(clockWrapper, countryInfo) {
        const flagInfo = clockWrapper.querySelector('.flag-info');
        const countryCode = getCountryCode(countryInfo.countryName);
        const flagImgUrl = `https://flagcdn.com/64x48/${countryCode.toLowerCase()}.png`;
        flagInfo.innerHTML = `
            <img src="${flagImgUrl}" class="flag-img" alt="${countryInfo.countryName} Flag">
            <p>Country: ${countryInfo.countryName}</p>
            <p>Capital: ${countryInfo.capital}</p>
            <p>Continent: ${countryInfo.continentName}</p>
        `;
        flagInfo.classList.add('active'); 
    }

    function getCountryCode(countryName) {
        switch (countryName) {
            case 'Israel': return 'IL';
            case 'United States': return 'US';
            case 'China': return 'CN';
            case 'India': return 'IN';
            default: return '';
        }
    }

    const countries = document.querySelectorAll('.clock');

    countries.forEach(country => {
        country.addEventListener('click', function () {
            const locale = this.dataset.locale;
            getCountriesData()
                .then(data => {
                    const countryData = data.find(country => country.timezone === locale);
                    if (countryData) {
                        showCountryInfo(country.parentElement, countryData);
                    } else {
                        console.error('Country information not found for timezone:', locale);
                    }
                })
                .catch(error => {
                    console.error('Error fetching countries data:', error);
                });
        });
    });
});