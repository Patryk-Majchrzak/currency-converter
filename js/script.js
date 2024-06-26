{
    const welcome = () => console.log("Hello there!");

    welcome();

    const backgroundButton = document.querySelector(".js-backgroundButton");
    const background = document.querySelector(".js-background");
    const shadeName = document.querySelector(".js-shadeName");
    const form = document.querySelector(".js-form");
    const amountInput = document.querySelector(".js-amount");
    const resultText = document.querySelector(".js-result");
    const currencyFrom = document.querySelector(".js-currencyFrom");
    const currencyTo = document.querySelector(".js-currencyTo");

    backgroundButton.addEventListener("click", () => {
        background.classList.toggle("document--dark");
        shadeName.innerText = background.classList.contains("document--dark") ? "jasny" : "ciemny";
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const amount = +amountInput.value;
        const from = currencyFrom.value;
        const to = currencyTo.value;

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

        let calculation;

        if (from === to) {
            calculation = amount
        }
        else if (from === "PLN") {
            switch (to) {
                case "EUR":
                    calculation = amount * PLNtoEUR;
                    break;
                case "GBP":
                    calculation = amount * PLNtoGBP;
                    break;
                case "USD":
                    calculation = amount * PLNtoUSD;
                    break;
            };
        }
        else if (from === "EUR") {
            switch (to) {
                case "PLN":
                    calculation = amount * EURtoPLN;
                    break;
                case "GBP":
                    calculation = amount * EURtoGBP;
                    break;
                case "USD":
                    calculation = amount * EURtoUSD;
                    break;
            };
        }
        else if (from === "GBP") {
            switch (to) {
                case "PLN":
                    calculation = amount * GBPtoPLN;
                    break;
                case "EUR":
                    calculation = amount * GBPtoEUR;
                    break;
                case "USD":
                    calculation = amount * GBPtoUSD;
                    break;
            };
        }
        else if (from === "USD") {
            switch (to) {
                case "PLN":
                    calculation = amount * USDtoPLN;
                    break;
                case "EUR":
                    calculation = amount * USDtoEUR;
                    break;
                case "USD":
                    calculation = amount * USDtoGBP;
                    break;
            };
        };
        resultText.innerText = `${amount.toFixed(2)} ${from} to ${calculation.toFixed(2)} ${to}`;
    });
};