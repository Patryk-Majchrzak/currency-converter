{
    const welcome = () => console.log("Hello there!");

    welcome();

    const backgroundButton = document.querySelector(".js-backgroundButton");
    const form = document.querySelector(".js-form");
    const amountInput = document.querySelector(".js-amount");
    const resultText = document.querySelector(".js-result");
    const currencyFrom = document.querySelector(".js-currencyFrom");
    const currencyTo = document.querySelector(".js-currencyTo");

    const changeGraphics = () => {
        const background = document.querySelector(".js-background");
        const shadeName = document.querySelector(".js-shadeName");

        background.classList.toggle("document--dark");
        shadeName.innerText = background.classList.contains("document--dark") ? "jasny" : "ciemny";
    };

    backgroundButton.addEventListener("click", changeGraphics);

    form.addEventListener("submit", calculateResult)

    const calculateResultfromPLN = (amount, to) => {
        const PLNtoEUR = 0.2308;
        const PLNtoGBP = 0.1950;
        const PLNtoUSD = 0.2467;

        switch (to) {
            case "EUR":
                return calculation = amount * PLNtoEUR;
            case "GBP":
                return calculation = amount * PLNtoGBP;
            case "USD":
                return calculation = amount * PLNtoUSD;
        };
    };

    const calculateResultfromEUR = (amount, to) => {
        const EURtoPLN = 4.3331;
        const EURtoGBP = 0.8448;
        const EURtoUSD = 1.0692;

        switch (to) {
            case "PLN":
                return calculation = amount * EURtoPLN;
            case "GBP":
                return calculation = amount * EURtoGBP;
            case "USD":
                return calculation = amount * EURtoUSD;
        };
    };

    const calculateResultfromGBP = (amount, to) => {
        const GBPtoPLN = 5.1291;
        const GBPtoEUR = 1.1837;
        const GBPtoUSD = 1.2656;

        switch (to) {
            case "PLN":
                return calculation = amount * GBPtoPLN;
            case "EUR":
                return calculation = amount * GBPtoEUR;
            case "USD":
                return calculation = amount * GBPtoUSD;
        };
    };

    const calculateResultfromUSD = (amount, to) => {
        const USDtoPLN = 4.0527;
        const USDtoEUR = 0.9353;
        const USDtoGBP = 0.7901;

        switch (to) {
            case "PLN":
                return calculation = amount * USDtoPLN;
            case "EUR":
                return calculation = amount * USDtoEUR;
            case "USD":
                return calculation = amount * USDtoGBP;
        };
    };

    const calculateResult = (event) => {
        event.preventDefault();

        const amount = +amountInput.value;
        const from = currencyFrom.value;
        const to = currencyTo.value;

        let calculation;

        if (from === to) {
            calculation = amount
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

    resultText.innerText = `${amount.toFixed(2)} ${from} to ${calculation.toFixed(2)} ${to}`;
};