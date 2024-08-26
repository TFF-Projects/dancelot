var submit_URL_btn = document.querySelector(".submit-url-btn");
var URLinput = document.querySelector(".URL-input");

submit_URL_btn.addEventListener("click", () => {
    console.log("URL: ${URLinput.value}");
    //sendURL(URLinput.value);
})

/*function sendURL(URL) {
    // stuff
    window.location.href = "http://localhost:3000/download?URL=${URL}";

}*/