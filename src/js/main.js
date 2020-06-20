import Form from "./components/form";

class App {
    constructor() {
        this.init();
    }

    init() {
        new Form();
    }
}

document.addEventListener("DOMContentLoaded", () => new App());
