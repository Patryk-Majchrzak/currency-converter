{
    const welcome = () => console.log("Hello there!");

    function formatNumber(number) {
            return number.toFixed(2).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ");
    };

    const changeGraphics = () => {
        const background = document.querySelector(".js-background");
        const shadeName = document.querySelector(".js-shadeName");

        background.classList.toggle("document--dark");
        shadeName.innerText = background.classList.contains("document--dark") ? "jasny" : "ciemny";
    };

    const calculateResultfromCurrency = (ratetoPLN, ratetoEUR, ratetoGBP, ratetoUSD, amount, to) => {
        switch (to) {
            case "PLN":
                return amount * ratetoPLN;
            case "EUR":
                return amount * ratetoEUR;
            case "GBP":
                return amount * ratetoGBP;
            case "USD":
                return amount * ratetoUSD;
        };
    };

    const calculateResult = (amount, from, to) => {
        const PLNtoEUR = 0.2308;
        const PLNtoGBP = 0.1950;
        const PLNtoUSD = 0.2467;
        const EURtoPLN = 4.3331;
        const EURtoGBP = 0.8448;
        const EURtoUSD = 1.0692;
        const GBPtoPLN = 5.1291;
        const GBPtoEUR = 1.1837;
        const GBPtoUSD = 1.2656;
        const USDtoPLN = 4.0527;
        const USDtoEUR = 0.9353;
        const USDtoGBP = 0.7901;

        if (from === "PLN") {
            return calculateResultfromCurrency(1, PLNtoEUR, PLNtoGBP, PLNtoUSD, amount, to);
        }
        else if (from === "EUR") {
            return calculateResultfromCurrency(EURtoPLN, 1, EURtoGBP, EURtoUSD, amount, to);
        }
        else if (from === "GBP") {
            return calculateResultfromCurrency(GBPtoPLN, GBPtoEUR, 1, GBPtoUSD, amount, to);
        }
        else if (from === "USD") {
            return calculateResultfromCurrency(USDtoPLN, USDtoEUR, USDtoGBP, 1, amount, to);
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

        resultText.innerText = `${formattedAmount} ${from} to ${formattedCalculation} ${to}`;
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
    };

    init();
};