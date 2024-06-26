{
    const welcome = () => console.log("Hello there!");

    welcome();

    const changeGraphics = () => {
        const background = document.querySelector(".js-background");
        const shadeName = document.querySelector(".js-shadeName");

        background.classList.toggle("document--dark");
        shadeName.innerText = background.classList.contains("document--dark") ? "jasny" : "ciemny";
    };

    const calculateResultfromPLN = (amount, to) => {
        const PLNtoEUR = 0.2308;
        const PLNtoGBP = 0.1950;
        const PLNtoUSD = 0.2467;

        switch (to) {
            case "EUR":
                return amount * PLNtoEUR;
            case "GBP":
                return amount * PLNtoGBP;
            case "USD":
                return amount * PLNtoUSD;
        };
    };

    const calculateResultfromEUR = (amount, to) => {
        const EURtoPLN = 4.3331;
        const EURtoGBP = 0.8448;
        const EURtoUSD = 1.0692;

        switch (to) {
            case "PLN":
                return amount * EURtoPLN;
            case "GBP":
                return amount * EURtoGBP;
            case "USD":
                return amount * EURtoUSD;
        };
    };

    const calculateResultfromGBP = (amount, to) => {
        const GBPtoPLN = 5.1291;
        const GBPtoEUR = 1.1837;
        const GBPtoUSD = 1.2656;

        switch (to) {
            case "PLN":
                return amount * GBPtoPLN;
            case "EUR":
                return amount * GBPtoEUR;
            case "USD":
                return amount * GBPtoUSD;
        };
    };

    const calculateResultfromUSD = (amount, to) => {
        const USDtoPLN = 4.0527;
        const USDtoEUR = 0.9353;
        const USDtoGBP = 0.7901;

        switch (to) {
            case "PLN":
                return amount * USDtoPLN;
            case "EUR":
                return amount * USDtoEUR;
            case "USD":
                return amount * USDtoGBP;
        };
    };

    const calculateResult = (amount, from, to) => {

        if (from === to) {
            return amount
        }
        else if (from === "PLN") {
            return calculateResultfromPLN(amount, to);
        }
        else if (from === "EUR") {
            return calculateResultfromEUR(amount, to);
        }
        else if (from === "GBP") {
            return calculateResultfromGBP(amount, to);
        }
        else if (from === "USD") {
            return calculateResultfromUSD(amount, to)
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

        resultText.innerText = `${amount.toFixed(2)} ${from} to ${calculation.toFixed(2)} ${to}`;
    };

    const listenEvents = () => {
        const backgroundButton = document.querySelector(".js-backgroundButton");
        const form = document.querySelector(".js-form");

        form.addEventListener("submit", writeResult);
        backgroundButton.addEventListener("click", changeGraphics);
    };

    listenEvents();
};