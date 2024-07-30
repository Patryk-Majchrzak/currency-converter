{
    const welcome = () => console.log("Hello there!");

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
            dataDate: "Dane liczone wg kursów z dnia 21.06.2024"
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
            dataDate: "Data calculated based on exchange rates from 21.06.2024"
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
        const background = document.querySelector(".js-background");
        const shadeName = document.querySelector(".js-shadeName");

        background.classList.toggle("document--dark");
        shadeName.innerText = background.classList.contains("document--dark") ? "jasny" : "ciemny";
    };

    const calculateResultfromCurrency = (currencyObject, amount, to) => {
        switch (to) {
            case "PLN":
                return amount * currencyObject[`to${to}`];
            case "EUR":
                return amount * currencyObject[`to${to}`];
            case "GBP":
                return amount * currencyObject[`to${to}`];
            case "USD":
                return amount * currencyObject[`to${to}`];
        };
    };

    const calculateResult = (amount, from, to) => {
        const PLN = {
            toPLN: 1,
            toEUR: 0.2308,
            toGBP: 0.1958,
            toUSD: 0.2467,
        }

        const EUR = {
            toPLN: 4.3331,
            toEUR: 1,
            toGBP: 0.8448,
            toUSD: 1.0692,
        }

        const GBP = {
            toPLN: 5.1291,
            toEUR: 1.1837,
            toGBP: 1,
            toUSD: 1.2656,
        }

        const USD = {
            toPLN: 4.0527,
            toEUR: 0.9353,
            toGBP: 0.7901,
            toUSD: 1,
        }

        if (from === "PLN") {
            return calculateResultfromCurrency(PLN, amount, to);
        }
        else if (from === "EUR") {
            return calculateResultfromCurrency(EUR, amount, to);
        }
        else if (from === "GBP") {
            return calculateResultfromCurrency(GBP, amount, to);
        }
        else if (from === "USD") {
            return calculateResultfromCurrency(USD, amount, to);
        };
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

        const calculation = calculateResult(amount, from, to);

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
        document.querySelector(".js-zmountText").textContent = t.amount;
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

        form.addEventListener("submit", writeResult);
        backgroundButton.addEventListener("click", changeGraphics);
        languageSelectors.forEach((languageSelector) =>
            languageSelector.addEventListener("click", () => changeLanguage(languageSelector)))
    };

    const init = () => {
        welcome();
        listenEvents();
        updateClock();
        setInterval(updateClock, 1000);
    };

    init();
};