{
    let tasks = [
        {
            content: "wyprowadzić psa",
            done: false
        },
        {
            content: "zdać egzamin",
            done: true,
        },
    ];
    let hideDone = false;

    const setAllTasksDone = () => {
        tasks = tasks.map(task => ({
            ...task,
            done: true,
        }));
        render();
    };

    const listenSetAllDoneButtonEvent = () => {
        const setAllDone = document.querySelector(".js-setAllDone");

        setAllDone.addEventListener("click", setAllTasksDone);
    };

    const hideDoneTasks = () => {
        hideDone = !hideDone;
        render();
    };

    const listenHideDoneButtonEvent = () => {
        const toggleHideDone = document.querySelector(".js-toggleHideDone");

        toggleHideDone.addEventListener("click", hideDoneTasks);
    };

    const removeTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1),
        ];
        render();
    };

    const toggleDone = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            { ...tasks[index], done: !tasks[index].done },
            ...tasks.slice(index + 1),
        ];
        render();
    };

    const listenListButtonsEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-toggleDoneButton");

        toggleDoneButtons.forEach((button, index) => {
            button.addEventListener("click", () => {
                toggleDone(index);
            })
        });

        const removeButtons = document.querySelectorAll(".js-removeButton");

        removeButtons.forEach((button, index) => {
            button.addEventListener("click", () => {
                removeTask(index);
            })
        });
    };

    const renderTasks = () => {
        const tasksList = document.querySelector(".js-tasks");

        let newTasks = ""

        tasks.forEach((task) => {
            newTasks +=
                `<li class="list__item ${task.done && hideDone ? "list__item--hidden" : ""}">
                    <button class="list__button list__button--toggleDone js-toggleDoneButton"> 
                        ${task.done ? "✔" : ""} 
                    </button>
                        <span class=${task.done ? "list__item--done" : ""}>${task.content}</span>
                    <button class="list__button list__button--remove js-removeButton"> 
                        🗑 
                    </button> 
                </li>`
        });

        tasksList.innerHTML = newTasks;

        listenListButtonsEvents();
    };

    const renderFormButtons = () => {
        const buttonsContainer = document.querySelector(".js-buttonsContainer");

        if (!tasks.length) {
            buttonsContainer.innerHTML = ""
        } else {
            buttonsContainer.innerHTML =
                `<button class="js-toggleHideDone buttonsArea__button">${hideDone ? "Pokaż" : "Ukryj"} ukończone</button>
            <button ${tasks.every(({ done }) => done) ? "disabled" : ""} class="js-setAllDone buttonsArea__button">Ukończ wszystkie</button>`
            listenHideDoneButtonEvent();
            listenSetAllDoneButtonEvent();
        };
    };

    const render = () => {
        renderTasks();
        renderFormButtons();
    };
    
    const addNewTask = (newTask) => {
        tasks = [
            ...tasks,
            {
                content: newTask,
                done: false,
            },
        ];
        render();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskInput = document.querySelector(".js-input");
        const newTask = newTaskInput.value.trim();

        newTaskInput.focus();

        if (newTask === "") {
            newTaskInput.value = "";
            return;
        };

        addNewTask(newTask);
        newTaskInput.value = "";
    };

    const listenFormSubmit = () => {
        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    const init = () => {
        listenFormSubmit();
        render();
    };

    init();
};
