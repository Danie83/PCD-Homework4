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

        this.onTagClick("edit", (model) => {
            this.navigateToUrl("/edit");
            let currentObj = items.find(item => item.id === model.id);
            localStorage.setItem('currentItem', JSON.stringify(currentObj));
        })
    }
}
