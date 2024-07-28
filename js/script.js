{
    const welcome = () => console.log("Hello there!");

    function formatNumber(number) {
            return number.toFixed(2).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    };

    const formatDate = (date) => {
        return date.toLocaleString(
            undefined,
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
        const date= new Date()

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

    const listenEvents = () => {
        const backgroundButton = document.querySelector(".js-backgroundButton");
        const form = document.querySelector(".js-form");

        form.addEventListener("submit", writeResult);
        backgroundButton.addEventListener("click", changeGraphics);
    };

    const init = () => {
        welcome();
        listenEvents();
        updateClock();
        setInterval(updateClock, 1000);
    };

    init();
};