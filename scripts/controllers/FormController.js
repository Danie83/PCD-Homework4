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
    formMessage: false,
};

var items = []

export default class FormController extends WebcController {
    constructor(element, history) {
        super(element, history);
        this.setModel(JSON.parse(JSON.stringify(model)));

        this.onTagClick("submit", () => {
            const todoData = this.model.toObject("todo");
            const daysData = this.model.toObject("days");

            if (todoData.value == undefined || 
                daysData.value == undefined ||
                todoData.value.length == 0 ||
                daysData.value.length == 0)
            {
                if (!this.model.formMessage)
                {
                    this.model.formMessage = true;
                }
                return;
            }
            else
            {
                if (this.model.formMessage)
                {
                    this.model.formMessage = false;
                }
            }

            let info = {
                todo: todoData.value,
                days: daysData.value
            };

            items.push(info);
            console.log(items);
        });
    }
}