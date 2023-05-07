const { WebcController } = WebCardinal.controllers;

const model = {
    task: {
        description: "Task:",
        placeholder: "Add task...",
    },
    days: {
        description: "Days for completion:",
        placeholder: "Add deadline day..."
    },
    formMessage: false,
};

if (!localStorage.getItem('itemData'))
{
    let items = [];
    localStorage.setItem('itemData', JSON.stringify(items))
}

export default class FormController extends WebcController {
    constructor(element, history) {
        super(element, history);
        this.setModel(JSON.parse(JSON.stringify(model)));
        
        var items = JSON.parse(localStorage.getItem('itemData'));

        this.onTagClick("submit", () => {
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

            let info = {
                task: taskData.value,
                days: daysData.value,
                complete: false
            };

            items.push(info);
            localStorage.setItem('itemData', JSON.stringify(items))
            console.log(items)
        });
    }
}