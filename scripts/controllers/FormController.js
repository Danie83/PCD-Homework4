const { WebcController } = WebCardinal.controllers;

const model = {
    todo: {
        description: "Task:",
        placeholder: "Add todo...",
    },
    days: {
        description: "Days for completion:",
        placeholder: "Add deadline day..."
    },
};

var items = []

export default class FormController extends WebcController {
    constructor(element, history) {
        super(element, history);
        this.setModel(JSON.parse(JSON.stringify(model)));

        this.onTagClick("submit", () => {
            const todoData = this.model.toObject("todo");
            const daysData = this.model.toObject("days");
            let info = {
                todo: todoData.value,
                days: daysData.value
            };
            items.push(info);
            console.log(items);
            
        });
    }
    async onReady() {
        this.interval = setInterval((_) => {
            this.model.input.value++;
        }, 2000);

        this.onTagClick("set-language", (model, event) => {
            this.setLanguage(model.language);
        });
    }

    onDisconnectedCallback() {
        clearInterval(this.interval);
    }
}