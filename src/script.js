coinsSymbol = "ETH";
var currentCoin = "ETH";
var coinFetch;
var coinList;
var g = 0;
var wallet = {};
var walletSpent = {};
var imageList = [];
var intervalID = window.setInterval(updateHoldingsNode, 1000);


function getCoinList() {
    fetch('https://min-api.cryptocompare.com/data/top/mktcap?limit=100&tsym=USD')
        .then(
            function(response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                // Examine the text in the response
                response.json().then(function(data) {

                    //defining these global variables declared on lines 1-5
                    coinList = data.Data;
                    coinFetch = data.Data;
                    coinSymbol = "ETH";


                    //count variables 4 for loops
                    var i;
                    var j;
                    var coinArray = [];


                    for (j = 0; j < coinArray.length; j++) {
                        wallet[j] = coinArray[j];
                    }

                    for (i = 0; i < coinList.length; i++) {
                        coinArray[i] = coinList[i].CoinInfo.Name;
                    }

                    for (p = 0; p < coinArray.length; p++) {
                        imageList[i] = data.Data[p].CoinInfo.ImageUrl;

                    }
                    document.getElementById("tradingview_cac80").value = new TradingView.widget({

                        "symbol": `BINANCE:${currentCoin}BTC`,
                        "interval": "4H",
                        "timezone": "Etc/UTC",
                        "height": "400",
                        "width": "765",
                        "theme": "Light",
                        "style": "1",
                        "locale": "en",
                        "toolbar_bg": "#f1f3f6",
                        "enable_publishing": false,
                        "hide_side_toolbar": false,
                        "allow_symbol_change": true,
                        "container_id": "tradingview_cac80"
                    });
                    createWallet(coinArray, data);
                    createWalletSpent(coinArray, data);
                    console.log(wallet);
                    autocomplete(document.getElementById("myInput"), coinArray);
                });
            }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
}

function createWallet(coinArray, data) {
    coinArray.forEach(function(i) {
        wallet[i] = coinArray[i];
        setWallet(wallet, data);

    });
}

function createWalletSpent(coinArray, data) {
    coinArray.forEach(function(i) {
        walletSpent[i] = coinArray[i];
        setWalletSpent(wallet, data);
    });
    console.log(walletSpent);
}

//sets all unit counts to 0 in wallet
function setWallet(wallet, data) {
    for (i in wallet) {
        if (wallet.hasOwnProperty(i)) {
            wallet[i] = Number(0);
            wallet[i].spent = Number(0);

        }
    }
}

function setWalletSpent(wallet, data) {
    for (i in walletSpent) {
        if (walletSpent.hasOwnProperty(i)) {
            walletSpent[i] = Number(0);
            walletSpent[i].spent = Number(0);

        }
    }
}




function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    displayCoinInfo(inp.value);
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function(e) {
        closeAllLists(e.target);

    });
}
//Takes selected coin and populates the logo and price info
function displayCoinInfo(symbol) {
    fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD`)
        .then(
            function(response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                // Examine the text in the response
                response.json().then(function(data) {
                    coinSymbol = symbol;
                    currentCoin = coinSymbol;
                    updateHoldingsNode();




                    for (i = 0; i < coinFetch.length; i++) {
                        if (coinFetch[i].CoinInfo.Name === coinSymbol) {

                        }



                        document.getElementById("tradingview_cac80").value = new TradingView.widget({

                            "symbol": `BINANCE:${currentCoin}BTC`,
                            "interval": "4H",
                            "timezone": "Etc/UTC",
                            "height": "400",
                            "width": "765",
                            "theme": "Light",
                            "style": "1",
                            "locale": "en",
                            "toolbar_bg": "#f1f3f6",
                            "enable_publishing": false,
                            "hide_side_toolbar": false,
                            "allow_symbol_change": true,
                            "container_id": "tradingview_cac80"
                        });
                    }

                });




            }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
}
//workaround to determine if buy button or sell buttonw was
function buyCoin() {
    var buy = 1;
    completeTransaction(buy);
}

function sellCoin() {
    alert("No Selling, Only HODLing Brah")
    /*var buy = 0;
    completeTransaction(buy);
    */
}

function completeTransaction(buy) {
    fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coinSymbol}&tsyms=USD`)
        .then(
            function(response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                // Examine the text in the response
                response.json().then(function(data) {
                    var currentPrice = data.RAW[coinSymbol].USD.PRICE;
                    var unitCount = document.getElementById("buySellInput").value;
                    var totalPrice = currentPrice * unitCount;
                    //createCoinNode(coinSymbol, unitCount, totalPrice);
                    updateWallet(currentCoin, currentPrice, unitCount, buy);
                    updateWalletSpent(currentCoin, currentPrice, unitCount, buy);



                    updateHoldingsNode();




                    function updateWallet(currentCoin, currentPrice, unitCount, buy) {
                        if (buy === 1) {
                            wallet[currentCoin] += parseInt(unitCount);
                            console.log(wallet[currentCoin]);
                        } else {
                            wallet[currentCoin] -= parseInt(unitCount);
                            console.log(wallet[currentCoin]);
                        }
                    }

                    function updateWalletSpent(currentCoin, currentPrice, unitCount, buy) {
                        if (buy === 1) {
                            walletSpent[currentCoin] += parseInt(unitCount * currentPrice);
                            console.log(walletSpent[currentCoin]);
                        } else {
                            wallet[currentCoin] -= parseInt(unitCount);
                            console.log(wallet[currentCoin]);
                        }
                    }



                    /* buySellInput.addEventListener("input", function(){
            alert("got input");
        });
  */

                });
            }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });

}

function updateHoldingsNode() {
    fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coinSymbol}&tsyms=USD`)
        .then(
            function(response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                // Examine the text in the response
                response.json().then(function(data) {
                    let totalValue = wallet[currentCoin] * data.RAW[coinSymbol].USD.PRICE;
                    document.getElementById("holdingsNum").innerHTML = wallet[currentCoin];
                    document.getElementById("coinValueNum").innerHTML = "$" + (wallet[currentCoin] * data.RAW[coinSymbol].USD.PRICE).toFixed(2);
                    document.getElementById("spentNum").innerHTML = "$" + walletSpent[currentCoin].toFixed(2);
                    document.getElementById("profitNum").innerHTML = "$" +  (totalValue - walletSpent[currentCoin]).toFixed(2);


                    var i;

                    for (i = 0; i < coinFetch.length; i++) {
                        if (coinFetch[i].CoinInfo.Name === coinSymbol) {

                            document.getElementById("coinLogo").src = "http://www.cryptocompare.com" + coinFetch[i].CoinInfo.ImageUrl;
                            document.getElementById("coinNameText").innerHTML = coinFetch[i].CoinInfo.FullName;
                            document.getElementById("buyButton").innerHTML = "Buy " + coinFetch[i].CoinInfo.FullName;
                            document.getElementById("sellButton").innerHTML = "Sell " + coinFetch[i].CoinInfo.FullName;
                        }

                        document.getElementById("priceText").innerHTML = "Current Price: $" + data.RAW[coinSymbol].USD.PRICE;
                        document.getElementById("volumeText").innerHTML = "Daily Volume: $" + data.RAW[coinSymbol].USD.VOLUMEDAY.toFixed(2);
                        document.getElementById("dailyHighText").innerHTML = "Daily High: $" + data.RAW[coinSymbol].USD.HIGH24HOUR;
                        document.getElementById("dailyLowText").innerHTML = "Daily Low: $" + data.RAW[coinSymbol].USD.LOW24HOUR.toFixed(2);


                    }
                });
            }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });

}

function getImage(symbol) {

    for (i = 0; i < coinList.length; i++) {
        if (coinList[i].CoinInfo.Name === symbol) {
            var img = "https://www.cryptocompare.com" + coinList[i].CoinInfo.ImageUrl;
            return img;
        }
    }
}

function createCoinNode(symbol, price, count) {
    //check if coin node needs added to wallet section
    if (wallet[symbol] === 0) {

        var newCoinNode = document.createElement("div");
        newCoinNode.setAttribute("id", `newCoinNode${symbol}`);
        document.getElementById("coinListDiv").appendChild(newCoinNode);


        var listImage = document.createElement("img");
        listImage.className = "listImage";
        listImage.src = getImage(symbol);

        document.getElementById(`newCoinNode${symbol}`).appendChild(listImage);

        var newUnitCountNode = document.createElement("h6");
        var newUnitCountNum = document.createTextNode(price);
        newUnitCountNode.appendChild(newUnitCountNum);
        newCoinNode.appendChild(newUnitCountNode);


        g++;

        document.getElementById("wallet").innerHTML = wallet[currentCoin];
    } else {
        var newUnitCountNode = document.createElement("h6");
        var newUnitCountNum = document.createTextNode(price);
        newUnitCountNode.appendChild(newUnitCountNum);
        newCoinNode.appendChild(newUnitCountNode);

    }
}