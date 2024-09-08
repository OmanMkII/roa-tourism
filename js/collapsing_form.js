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
        alert(`Hi ${document.getElementById("first-name")}! Thanks for booking with RoA Tourism!`);
        document.getElementById("main-form").reset();
        clearRoomData();
    }
});