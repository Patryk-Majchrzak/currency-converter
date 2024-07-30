{
    const welcome = () => console.log("Hello there!");

    let rate = 1;

    const translations = {
        pl: {
            buttonText: "Włącz {0} motyw",
            dark: "ciemny",
            light: "jasny",
            today: "Dzisiaj jest",
            currencyCalculator: "Kalkulator walut",
            amount: "Kwota",
            amountPlaceholder: "wpisz kwotę",
            from: "Zamień z",
            to: "Zamień na",
            calculate: "Przelicz",
            result: "Wynik:",
            dataDate: "Dane liczone wg kursów z dnia"
        },
        en: {
            buttonText: "Switch to {0} theme",
            dark: "dark",
            light: "light",
            today: "Today is",
            currencyCalculator: "Currency Calculator",
            amount: "Amount",
            amountPlaceholder: "enter amount",
            from: "Change from",
            to: "Change to",
            calculate: "Calculate",
            result: "Result:",
            dataDate: "Data calculated based on exchange rates from"
        }
    };

    function formatNumber(number) {
        return number.toFixed(2).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    };

    const formatDate = (date) => {
        return date.toLocaleString(
            document.documentElement.lang,
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
            }
        )
    };

    const updateClock = () => {
        const clockElement = document.querySelector(".js-clock");
        const date = new Date()

        clockElement.innerText = formatDate(date)
    };

    const changeGraphics = () => {
        const background = document.querySelector(".js-document");
        const shadeName = document.querySelector(".js-shadeName");

        background.classList.toggle("document--dark");
        shadeName.innerText = background.classList.contains("document--dark") ? "jasny" : "ciemny";
    };

    const calculateResult = (amount) => {
        return amount * rate
    };

    const writeResult = (event) => {
        event.preventDefault();

        const amountInput = document.querySelector(".js-amount");
        const currencyFrom = document.querySelector(".js-currencyFrom");
        const currencyTo = document.querySelector(".js-currencyTo");
        const amount = +amountInput.value;
        const from = currencyFrom.value;
        const to = currencyTo.value;
        const resultText = document.querySelector(".js-result");

        const calculation = calculateResult(amount);

        const formattedCalculation = formatNumber(calculation);
        const formattedAmount = formatNumber(amount);

        resultText.innerText = `${formattedAmount} ${from} = ${formattedCalculation} ${to}`;

    };

    const updatePageContent = (language) => {
        const t = translations[language]

        const buttonText = t.buttonText.replace("{0}", document.body.classList.contains("dark") ? t.light : t.dark);
        document.querySelector(".js-backgroundButton").textContent = buttonText;
        document.querySelector(".js-today").textContent = t.today;
        document.querySelector(".js-legend").textContent = t.currencyCalculator;
        document.querySelector(".js-amountText").textContent = t.amount;
        document.querySelector(".js-amount").placeholder = t.amountPlaceholder;
        document.querySelector(".js-labelTextFrom").textContent = t.from;
        document.querySelectorAll(".js-labelTextTo").textContent = t.to;
        document.querySelector(".js-formButton").textContent = t.calculate;
        document.querySelector(".js-resultParagraph").firstChild.textContent = `${t.result} `;
        document.querySelector(".js-dateParagraph").textContent = t.dataDate;
    };

    const changeLanguage = (languageSelector) => {
        const language = languageSelector.alt
        document.documentElement.lang = language
        document.title = language === "pl" ? "Kantor walut" : "Currency converter"
        updatePageContent(language)
    };

    const listenEvents = () => {
        const backgroundButton = document.querySelector(".js-backgroundButton");
        const form = document.querySelector(".js-form");
        const languageSelectors = document.querySelectorAll(".js-flag");
        const selectFrom = document.querySelector(".js-currencyFrom");
        const selectTo = document.querySelector(".js-currencyTo");

        form.addEventListener("submit", writeResult);
        backgroundButton.addEventListener("click", changeGraphics);
        languageSelectors.forEach((languageSelector) =>
            languageSelector.addEventListener("click", () => changeLanguage(languageSelector)));
        selectFrom.addEventListener("change", updateRate)
        selectTo.addEventListener("change", updateRate)
    };

    const updateRate = () => {
        const from = document.querySelector(".js-currencyFrom").value;
        const to = document.querySelector(".js-currencyTo").value;
        fetchData(`https://v6.exchangerate-api.com/v6/67a7a303b054e72ce029ec5c/latest/${from}`, (error, data) => {
            if (!error) {
                rate = to === from ? 1 : data.conversion_rates[to];
            }
        });
    };

    const fetchData = (url, callback) => {
        fetch(url)
            .then(response => response.json())
            .then(data => callback(null, data))
            .catch(error => callback(error, null));
    };

    const updateCurrencies = (error, data) => {
        if (error) {
            form = document.querySelector(".js-from");
            form.innerHTML = document.documentElement.lang === "pl"
                ? "Wystąpił niespodziewany błąd, spróbuj ponownie później"
                : "Unexpected error occured, please try again later"
        } else {
            let currencies = Object.keys(data.conversion_rates).sort();
            rate = data.conversion_rates["EUR"]
            date = data.time_last_update_utc;

            updateCurrencySelects(currencies);
            updateDateDisplay(date);
        }
    };

    const updateCurrencySelects = (currencies) => {
        const fromSelect = document.querySelector(".js-currencyFrom");
        const toSelect = document.querySelector(".js-currencyTo");

        const optionsHTML = currencies.map((currency) =>
            `<option value="${currency}">${currency}</option>`
        ).join('');

        fromSelect.innerHTML = optionsHTML;
        toSelect.innerHTML = optionsHTML;

        fromSelect.value = "PLN";
        toSelect.value = "EUR";
    };

    const updateDateDisplay = (date) => {
        const refreshmentDate = document.querySelector(".js-refreshmentData");
        refreshmentDate.innerHTML = formatRefreshmentDate(date)
    };

    const formatRefreshmentDate = (date) => {
        return date.toLocaleString(
            document.documentElement.lang,
            {
                day: "numeric",
                month: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
            }
        )
    }

    const init = () => {
        const from = "PLN";
        welcome();
        listenEvents();
        updateClock();
        setInterval(updateClock, 1000);
        fetchData(`https://v6.exchangerate-api.com/v6/67a7a303b054e72ce029ec5c/latest/${from}`, updateCurrencies)
    };

    document.addEventListener("DOMContentLoaded", init);
};