const { WebcController } = WebCardinal.controllers;

export default class ViewController extends WebcController {
    constructor(element, history) {
        super(element, history);

        var items = JSON.parse(localStorage.getItem('itemData'));

        var model = {
            input: {
                type: "text",
                value: "0",
                style: "border: 1px solid #333",
            },
            task_list: items,
        };

        this.model = JSON.parse(JSON.stringify(model));

        Array.from(Array(items.length)).forEach((_, idx) => {
            this.model.addExpression(
                `task_list.${idx}.formattedInputValue`,
                () => {
                    return `Current value is: ${this.model.input.value * idx + 1}`;
                },
                "input.value"
            );
            this.model.addExpression(
                `task_list.${idx}.formattedClass`,
                () => {
                    return `class-${this.model.input.value * idx + 1}`;
                },
                "input.value"
            );
        });

        this.onTagClick("remove", (model) => {
            items = items.filter(item => item.id !== model.id);
            localStorage.setItem('itemData', JSON.stringify(items));
            var model = {
                input: {
                    type: "text",
                    value: "0",
                    style: "border: 1px solid #333",
                },
                task_list: items,
            };
    
            this.model = JSON.parse(JSON.stringify(model));
        });
    }
}
