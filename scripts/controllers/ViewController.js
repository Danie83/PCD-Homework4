// const { WebcController } = WebCardinal.controllers;

// class view extends WebcController {
//   initializeModel = () => ({ cards: [] });

//   constructor(element, history) {
//     super(element, history);
//     this.setModel(this.initializeModel());
//     this.loadJsonData();
//   }

//   loadJsonData = () => {
//     const xhr = new XMLHttpRequest();
//     xhr.open('GET', 'scripts/controllers/date.json', true);
//     xhr.onreadystatechange = () => {
//       if (xhr.readyState === 4 && xhr.status === 200) {
//         const jsonData = JSON.parse(xhr.responseText);
//         console.log(jsonData);
//         this.model.cards = jsonData.cards;
//       }
//     };
//     xhr.send();
//   };
// }

// export default view;

const { WebcController } = WebCardinal.controllers;

export default class ViewController extends WebcController {
  getModel = (_) => ({
    input: {
      type: "text",
      value: "0",
      style: "border: 1px solid #333",
    },
    task_list: [
      {
        task: "Title 1",
        duration: "title--bigger",
      },
      {
        task: "Title 1",
        duration: "title--bigger",
      },
      {
        task: "Title 1",
        duration: "title--bigger",
      },
    ],
  });
  constructor(element, history) {
    super(element, history);

    this.model = this.getModel();

    Array.from(Array(this.model.task_list.length)).forEach((_, idx) => {
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
}
