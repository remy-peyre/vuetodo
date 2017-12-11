/**
 * Created by remypeyre on 13/11/2017.
 */
{
    "use strict";

    new Vue({
        el : '#app',

        data : {
            tasks : [
                {title : "Nourrir le chat", isDone : true},
                {title : "Nourrir le Damien", isDone : false},
                {title : "Nourrir le Nath", isDone : false},
                {title : "Nourrir le Henri", isDone : false}
            ],
            titleTask: ""
        },
        /*created: {
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            this.tasks = tasks;
        },*/
        methods: {
            deleteTask: function (index) {
                this.tasks.splice(index, 1);
            },
            addTask () {
                if(this.titleTask == "")
                    return;
                this.tasks.push({title: this.titleTask, isDone: false});
                this.titleTask = "";
                //this.$refs.taskForm.reset();
            }
        },
        computed: {

            remaining(){
                return this.tasks.filter(task => task.isDone).length;
            }
        },
        filters: {
            pluralize: function (word, nb){
                return nb > 1 ? word + "s" : word;
            }
        },
    })

}