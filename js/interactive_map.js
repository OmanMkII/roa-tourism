// An interactive map of events
$(document).ready(() => {
    // allocate the local variables
    var locations, map;
    map = document.getElementById("map");
    // location = map.find('.location');
    locations = document.getElementsByClassName("location");
    // for each item, assign on click functions
    for (let item of locations) {
        item.onclick = () => {
            // when clicked, expand or contract
            if (item.classList.contains('active')) {
                item.classList.remove('active');
                map.classList.remove('popup-open');

                // item.querySelector(".location_information").style.visibility = "hidden";
                item.querySelector(".location_icon").style.visibility = "visible";

                item.getElementsByClassName("location_information")[0].classList.remove('active');
            } else {
                item.classList.add('active');
                map.classList.add('popup-open');

                // item.querySelector(".location_information").style.visibility = "visible";
                item.querySelector(".location_icon").style.visibility = "hidden";

                item.getElementsByClassName("location_information")[0].classList.add('active');
            }
        }
    }
});

// TODO: deal with having more than one selected
// --> second one will open after signaling the first to close