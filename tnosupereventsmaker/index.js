function set_label(ui_name, pos_x, pos_y, font_size) {
    var label = document.getElementById(ui_name + "-label");
    var input = document.getElementById(ui_name + "-input");
    label.style.position = "absolute";

    label.style.left = pos_x + "px";
    label.style.top = pos_y + "px";
    label.style.fontSize = font_size + "px";
    label.innerText = input.value;
}

function set_pic(ui_name) {
    var input = document.getElementById(ui_name + "-input");
    var pic = document.getElementById(ui_name + "-pic");
    var reader = new FileReader();

    reader.onload = function() { pic.setAttribute("src", this.result); }
    reader.readAsDataURL(input.files[0]);
}

function set_input_event(ui_name, pos_x, pos_y, font_size) {
    var input = document.getElementById(ui_name + "-input");
    input.addEventListener("input", function() { set_label(ui_name, pos_x, pos_y, font_size); });
}

function set_input_value(ui_name, value) {
    var input = document.getElementById(ui_name + "-input");
    input.value = value;
    input.dispatchEvent(new Event("input"));
}

function set_pic_event(ui_name) {
    var input = document.getElementById(ui_name + "-input");
    input.addEventListener("input", function() { set_pic(ui_name); });
}

function input() {
    set_input_value("country-name");
    set_input_value("faction-name");
    set_input_value("leader-name");
    set_input_value("party-name");
    set_input_value("ideology-name");
    set_input_value("next-election");
    set_input_value("national-focus-name");
    set_input_value("news-title");
    set_input_value("news-description");
    set_input_value("news-button");
    set_input_value("super-event-title");
    set_input_value("super-event-description");
    set_input_value("super-event-button");

    document.getElementById("country-flag-pic").setAttribute("src");
    document.getElementById("country-leader-pic").setAttribute("src");
    document.getElementById("ideology-icon-pic").setAttribute("src");
    document.getElementById("national-focus-icon-pic").setAttribute("src");
    document.getElementById("news-pic").setAttribute("src");
    document.getElementById("super-event-pic").setAttribute("src");
}

window.onload = function() {
    document.getElementById("loading").addEventListener("click", input);
    set_input_event("country-name", 220, -6, 14);
    set_input_event("faction-name", 220, 13, 14);
    set_input_event("leader-name", 220, 32, 14);
    set_input_event("party-name", 235, 68, 20);
    set_input_event("ideology-name", 235, 100, 20);
    set_input_event("next-election", 235, 120, 20);
    set_input_event("national-focus-name", 234, 158, 20);
    set_input_event("news-title", 103, 295, 15);
    set_input_event("news-description", 240, 340, 10);
    set_input_event("news-button", 230, 679, 12);
    set_input_event("super-event-title", 530, 0, 20);
    set_input_event("super-event-description", 595, 360, 19);
    set_input_event("super-event-button", 720, 548, 19);
    set_pic_event("country-flag");
    set_pic_event("country-leader");
    set_pic_event("ideology-icon");
    set_pic_event("national-focus-icon");
    set_pic_event("news");
    set_pic_event("super-event");
};

function setIdeology(img) {
	var imageObject = document.getElementById("ideology-icon-pic");
	imageObject.src = "./assets/ideologies/"+img+".png";
}