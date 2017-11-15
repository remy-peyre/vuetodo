/**
 * Created by remypeyre on 13/11/2017.
 */
{
    "use strict";

    new Vue({
        el : '#app',

        data : {
            newTodoText: '',
            tasks : [
                {title : "Nourrir le chat", isDone : true},
                {title : "Nourrir le Damien", isDone : false},
                {title : "Nourrir le Nath", isDone : false},
                {title : "Nourrir le Henri", isDone : false}
            ],
            titleTask: ""
        },
        methods: {
            removeElement: function (index) {
                this.tasks.splice(index, 1);
            },
            addTask: function () {
                if(this.titleTask == "")
                    return;
                this.tasks.push({title: this.titleTask, isDone: false});
                this.titleTask = "";
            }
        },

        deleteTask: function (index) {
            this.tasks.splice(index,1);
        }

    })

}