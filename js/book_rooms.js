document.addEventListener("readystatechange", (event) => {

    const suites = {"ai": "AI Revolution Master Suite", "prison": "Child Slavery Family Suite",
        "minimalist": "Minimalist Studio"};

    function clearRoomData() {
        for (key in suites) {
            localStorage.removeItem(key + "-days");
        }
    }

	if(event.target.readyState == "interactive") {
        // increment buttons
        let bookings = document.getElementsByClassName("booking");
        for (booking of bookings) {
            // assign incrementing
            let minus = booking.getElementsByClassName("minus")[0];
            let plus = booking.getElementsByClassName("plus")[0];
            let value = booking.getElementsByClassName("value")[0];
            minus.onclick = () => {
                if (parseInt(value.textContent) > 0) {
                    value.textContent = parseInt(value.textContent) - 1;
                }
            }
            plus.onclick = () => {
                value.textContent = parseInt(value.textContent) + 1;
            }
            // assign submission
            let button = booking.getElementsByClassName("select")[0];
            button.onclick = () => {
                // get existing data
                let k, v;
                for (key in suites) {
                    let temp = localStorage.getItem(key + "-days");
                    // console.log(`${key} has value ${temp}`);
                    if (temp !== null) {
                        k = key;
                        v = temp;
                    }
                }
                // handle cases
                if (parseInt(value.textContent) > 0) {
                    let name = button.id.split("-")[0];
                    if (localStorage.getItem(k + "-days") !== null) {
                        // check if same
                        if (k === name) {
                            if (confirm(`You've already booked this room for ${localStorage.getItem(name + "-days")} nights, do you want to change your booking to ${value.textContent} nights?`)) {
                                clearRoomData();
                                localStorage.setItem(name + "-days", value.textContent);
                                alert(`Success! You've booked the '${suites[name]}' suite for ${value.textContent} nights - you can now continue browsing or confirm the booking.`);
                            } else {
                                // console.log("rejected");
                            }
                        } else {
                            if (confirm(`You've already booked the ${suites[k]} room for ${localStorage.getItem(k + "-days")} nights, do you want to change your booking to the ${suites[name]} room for ${value.textContent} nights?`)) {
                                clearRoomData();
                                localStorage.setItem(name + "-days", value.textContent);
                                alert(`Success! You've booked the '${suites[name]}' suite for ${value.textContent} nights - you can now continue browsing or confirm the booking.`);
                            } else {
                                // console.log("rejected");
                            }
                        }
                    } else {
                        localStorage.setItem(name + "-days", value.textContent);
                        // TODO: grab this from localStorage later
                        alert(`Success! You've booked the '${suites[name]}' suite for ${value.textContent} nights - you can now continue browsing or confirm the booking.`);
                    }
                } else {
                    alert("Error! Please select a valid number of nights.");
                }
            }
        }
    }
});