const { WebcController } = WebCardinal.controllers;

export default class ViewController extends WebcController {
    constructor(element, history) {
        super(element, history);

        var item = JSON.parse(localStorage.getItem('currentItem'));
        var items = JSON.parse(localStorage.getItem('itemData'));

        var model = {
            task: {
                description: "Task:",
                placeholder: item.task,
            },
            days: {
                description: "Days for completion:",
                placeholder: item.days
            },
            formMessage: false,
        }

        this.model = JSON.parse(JSON.stringify(model));

        this.onTagClick("update", (model) => {
            const taskData = this.model.toObject("task");
            const daysData = this.model.toObject("days");

            if (taskData.value == undefined || 
                daysData.value == undefined ||
                taskData.value.length == 0 ||
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

            var itemToChange = items.find(e => e.id === item.id);
            itemToChange.task = taskData.value;
            itemToChange.days = daysData.value;

            localStorage.setItem('itemData', JSON.stringify(items));
            localStorage.setItem('currentItem', JSON.stringify(itemToChange));
            item = itemToChange;

            var model = {
                task: {
                    description: "Task:",
                    placeholder: item.task,
                },
                days: {
                    description: "Days for completion:",
                    placeholder: item.days
                },
                formMessage: false,
            }
    
            this.model = JSON.parse(JSON.stringify(model));
            this.navigateToUrl("/view");
        });
    }
}
