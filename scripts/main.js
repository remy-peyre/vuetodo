/**
 * Created by remypeyre on 13/11/2017.
 */
{
    "use strict";

    const task = {
        props : [ 'task', 'index' ],
        template: `
            <li class="collection-item">
                <input type="checkbox" :id="'t_'+(index+1)" v-model="task.isDone">
                <label :for="'t_'+(index+1)">{{ task.title }}</label>
                <a href="#" @click="clickGarbage(index)" class="link-delete" title="Supprimer cette tâche">
                    <i class="small material-icons">delete_forever</i>
                </a>
            </li>`,
        methods: {
            clickGarbage(index){
                this.$emit('evesuppression', index);
            }
        }
    };

    const taskform = {
        data() {
            return{
                titleTask: ""
            }
        },
        template: `
            <form class="row" @submit.prevent="addTask">
            <div class="input-field col m6 offset-m3">
                <input id="taskTitle" type="text" v-model="titleTask">
                <label for="taskTitle">Intitulé de la tâche</label>
            </div>
            <div class="col m4 offset-m5">
                <button type="submit" class="waves-effect waves-light btn">Ajouter</button>
            </div>
        </form>`,
        methods: {
            addTask : function (){
                this.$emit('ajouttask', this.titleTask);
                this.titleTask = "";
                this.$refs.taskForm.reset();
            }
        }
    };

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

        watch: {
            'tasks' : {
                deep : true,
                handler : function(newVal, oldVal){
                    localStorage.setItem('tasks', JSON.stringify(this.tasks));
                }
            }
        },

        created: function () {
            try{
                var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
                this.tasks = tasks;
            } catch(e) {
                console.warn('localstorage fail');
            }
        },

        methods: {
            deleteTask: function (index) {
                this.tasks.splice(index, 1);
            },
            addTask (titleTask) {
                if(titleTask === "")
                    return;
                this.tasks.push({title: titleTask, isDone: false});
                //this.titleTask = "";
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

        components : {
            'task' : task,
            'taskform': taskform
        }
    })

}