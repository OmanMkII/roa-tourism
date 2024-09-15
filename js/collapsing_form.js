const suites = {"ai": "AI Revolution Master Suite", "prison": "Child Slavery Family Suite",
    "minimalist": "Minimalist Studio"};

function clearRoomData() {
    for (key in suites) {
        localStorage.removeItem(key + "-days");
    }
}

function getSelectedRoom() {
    for (key in suites) {
        value = localStorage.getItem(key + "-days");
        if (value) {
            return [key, value];
        }
    }
    // else
    return null;
}

function setBorderWidth(reference) {
    console.log("Setting border width");
    if(reference.stlye.borderWidth == "0px") {
        reference.stlye.borderWidth = "1px";
    } else {
        reference.stlye.borderWidth = "0px";
    }
}

// Expands a section of the form
window.addEventListener("load", () => {
    // assign clickable
    let tabs = document.getElementsByClassName("collapse_button");
    for(let item of tabs) {
        item.addEventListener("click", () => {
            var content = item.nextElementSibling;
            if (content.style.maxHeight !== "0px") {
                content.style.maxHeight = "0px";
                content.style.padding = "0px 22px";
                setTimeout(() => {
                    content.style.borderWidth = "0px";
                    item.style.borderRadius = "12px";
                }, 200);
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                content.style.padding = "10px 22px";
                content.style.borderWidth = "1px";
                item.style.borderRadius = "12px 12px 0 0";
            }
        });
    }

    // preset the form from the room selected (if any)
    let roomData = getSelectedRoom();
    let roomChoice = document.getElementById("room-type");
    let roomDays = document.getElementById("no-days");
    // console.log(`Got data as ${roomData}`);
    if (roomData !== null) {
        roomChoice.value = roomData[0] + "-room";
        roomDays.value = roomData[1];
    }
    let museumChoice = document.getElementById("museum-type");

    // submit textbox
    let formButton = document.getElementById("form-button");
    formButton.onclick = () => {
        let fields = {
            "set-1": ["first-name", "last-name", "phone"],
            "set-2": ["room-type", "no-days", "adults", "children"],
            "set-3": ["museum-type", "tickets", "date"]
        };
        console.debug(`Got name length as ${document.getElementById("first-name").value.length}.`);
        // apparently this is the way I'm meant to break a foreach in JS
        try {
            for (const [key, value] of Object.entries(fields)) {
                console.debug(`Got key ${key}, value ${value}`);
                if (key == "set-1" || key == "set-2") {
                    value.forEach(element => {
                        console.info(`Got value ${element} with data ${document.getElementById(element).value}.`);
                        if (document.getElementById(element).value == null ||
                                document.getElementById(element).value.length == 0) {
                            alert("Please complete Section " + (key == 'set-1' ? "1" : "2") + " before submitting.");
                            throw BreakLoop;
                        } else if (element == "room-type" && document.getElementById(element).value == "none") {
                            alert("Please Select a room type.");
                            throw BreakLoop;
                        }
                    });
                } else if (key == "set-3") {
                    let museumChoice = True;
                    console.info(`set museum choice ${museumChoice}`);
                    console.info(`Got value ${element[0]} with data ${document.getElementById(element[0]).value}.`);
                    value.forEach(element => {
                        console.info(`Got value ${element} with data ${document.getElementById(element).value}.`);
                        if (element == "museum-type" && document.getElementById(element).value == "none") {
                            if (confirm("Are you sure you don't want to visit the museum?")) {
                                // set a variable to ignore the rest of the loop
                                museumChoice = False;
                            }
                            alert('blah');
                        } else if (museumChoice && (document.getElementById(element).value == null ||
                                document.getElementById(element).value.length == 0)) {
                            alert("Please fill out Section 3 to visit the museum.");
                            throw BreakLoop;
                        }
                    });
                } else {
                    console.error(`Error: ${key} is an unexpected key in Json string.`);
                    return;
                }
            }
        } catch(BreakLoop) {
            console.debug("Caught exception to break loop");
            return;
        }

        // if (document.getElementById("first-name").value.length == 0) {
        //     alert("Please complete the form before submitting.");
        // } else {
        // }
        alert(`Hi ${document.getElementById("first-name").value}! Thanks for booking with RoA Tourism!`);
        document.getElementById("main-form").reset();
        clearRoomData();
    }
});