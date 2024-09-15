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
    if (roomData !== null) {
        roomChoice.value = roomData[0] + "-room";
        roomDays.value = roomData[1];
    }
    let museumChoice = document.getElementById("museum-type").value;

    // submit textbox
    let formButton = document.getElementById("form-button");
    formButton.onclick = () => {
        let fields = {
            "set-1": ["first-name", "last-name", "phone"],
            "set-2": ["room-type", "no-days", "adults", "children"],
            "set-3": ["museum-type", "tickets", "date"]
        };
        let intFields = [
            "phone", "no-days", "adults", "children", "tickets"
        ];
        console.debug(`Got name length as ${document.getElementById("first-name").value.length}.`);
        // apparently this is the way I'm meant to break a foreach in JS
        try {
            let visitMuseum = true;
            for (const [key, value] of Object.entries(fields)) {
                console.debug(`Got key '${key}', value '${value}', visitMuseum '${visitMuseum}'`);
                value.forEach(element => {
                    console.info(`Got value '${element}' with data '${document.getElementById(element).value}'.`);
                    console.info("needs int: ", intFields.includes(element));
                    console.info("regex: ", document.getElementById(element).value.match(/^\+?[\d]+$/),
                        document.getElementById(element).value.match(/^\+?[\d]+$/) == null);
                    console.info(intFields.includes(element) &&
                        document.getElementById(element).value.match(/^\+?[\d]+$/) == null);
                    if ((value == "set-3" && visitMuseum) &&
                            (document.getElementById(element).value == null ||
                            document.getElementById(element).value.length == 0)) {
                        // alert for the part of the form that's incomplete
                        alert("Please complete Section " + (key == 'set-1' ? "1" : (key == 'set-2' ? "2" : "3")) +
                            " before submitting.");
                        throw new Error("Incomplete form.");
                    } else if (element == "room-type" && document.getElementById(element).value == "none") {
                        alert("Please Select a room type.");
                        throw new Error("No room selected.");
                    } else if (element == "museum-type" && document.getElementById(element).value == "none") {
                        if (confirm("Are you sure you don't want to visit the museum?")) {
                            // set a variable to ignore the rest of the checks
                            console.info("User not visiting museum.");
                            visitMuseum = false;
                        } else {
                            console.info("User visiting museum.");
                            throw new Error("No museum selected.");
                        }
                    } else if (visitMuseum && (document.getElementById(element).value == null ||
                            document.getElementById(element).value.length == 0)) {
                        alert("Please fill out Section 3 to visit the museum.");
                        throw new Error("Section 3 incomplete.");
                    } else if (intFields.includes(element.id) && document.getElementById(element).value.match(/^\+?[\d]+$/) == null) {
                        alert(`Field ${element} needs to have an integer value.`);
                        throw new Error("Not a number.");
                    }
                });
            }
        } catch(e) {
            console.error(e);
            return;
        }

        alert(`Hi ${document.getElementById("first-name").value}! Thanks for booking with RoA Tourism!`);
        document.getElementById("main-form").reset();
        clearRoomData();
    }
});