const { WebcController } = WebCardinal.controllers;

var items = [];
var control = true;

export default class ViewController extends WebcController {
    constructor(element, history) {
        super(element, history);

        this.loadJsonData();

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
    }

    loadJsonData = () => {
        if (control)
        {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", "scripts/controllers/date.json", true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const jsonData = JSON.parse(xhr.responseText);
                    for (var i = 0; i < jsonData.length; i++) {
                        items.push(jsonData[i])
                    }
                }
            };
            xhr.send();
            control = false;
        }
    };
}
