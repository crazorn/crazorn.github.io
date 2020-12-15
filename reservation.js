function showBookingDialog(ev) {
    //Auch hier sollten über das eventarg oder über das frühere Ajax request der Raum typ geholt werden. Wir gehene hier einfach davon aus das diese Informationen vorliegen und im POST mit gesendet werden. 
    var modal = document.getElementById("booking_modal");
    modal.style.display = "block";
}

function getAvailabileRoomTypes(date1, date2) {
    //Holt die tatsächlich verfügbaren Räume vom Server...
    //Eignetlich sollte hier ein XMLHttpRequest erstellt werden und dann die beiden Daten übergeben. -> xhttp.open("GET", "rooms_get.asp?t=" + date1+","+date2, true); xhttp.send(); 
    //Da aber nicht das Ziel ist back-end zu implementieren, werde ich im Folgenden einfach per Zufall entscheiden welche Räume frei sind. Gleiches gilt für die Preise (Yield-Marketing)...

    var roomtypes = [{ name: "Single bedroom", price: (43 + Math.random() * 20).toFixed(2) },
    { name: "Double bedroom", price: (71 + Math.random() * 20).toFixed(2) },
    { name: "Double deluxe", price: (82 + Math.random() * 20).toFixed(2) },
    { name: "Suite", price: (96 + Math.random() * 40).toFixed(2) },
    { name: "President suite", price: (172 + Math.random() * 100).toFixed(2) }];

    var available = [];
    roomtypes.forEach(element => {
        if (Math.random() < 0.5)
            available.push(element);
    });
    return available;
}

function isValid(date1, date2) {
    // Könnte noch erweitert werden...
    return date1 < date2;
}


function confirmSelected() {
    var arrival = document.getElementById("arrival");
    var depature = document.getElementById("depature");
    var a_date = arrival.valueAsDate;
    var d_date = depature.valueAsDate;
    if (!isValid(a_date, d_date)) {
        alert("Your selected date is invalid.");
        return;
    }

    var available = getAvailabileRoomTypes(a_date, d_date);
    var available_div = document.getElementById("available");
    //Clear before
    available_div.innerHTML = "";
    if (available.length != 0) {
        var delta_days = (d_date - a_date) / (1000 * 60 * 60 * 24);

        var available_text = document.createElement("h2");
        available_text.innerText = "Availabile:";
        available_div.append(available_text);

        available.forEach(element => {
            var container = document.createElement("div");
            container.classList.add("flex-box");
            var price = (element.price * delta_days).toFixed(2);
            var text_node = document.createElement("h3");
            text_node.innerText = element.name + " for $" + price;
            text_node.classList.add("room_text");
            container.append(text_node);
            var button_node = document.createElement("input");
            button_node.type = "button";
            button_node.value = "Book now";
            button_node.id = element.name.replace(" ", "_") + "_btn";
            button_node.onclick = showBookingDialog;
            container.append(button_node);
            available_div.append(container);
        });
    } else {
        var text_node = document.createElement("h3");
        text_node.innerText = "No Rooms available for the time.";
        available_div.append(text_node);
    }
} 