Vue.component('edit-span',{
    props:{
        value:{
            type:String,
            default:'',
        },
        placeholder:{
            type:String,
            default:'',
        },
        canEdit:{
            type:Boolean,
            default:true,
        }
    },
    template:`<div class="edit-div"
        v-html="innerText"
        :data-placeholder="placeholder"
        :contenteditable="canEdit"
        @focus="isLocked = true"
        @blur="isLocked = false"
        @input="changeText">
         </div>`,
    data(){
        return {
            innerText: this.value,
            isLocked: false
        }
    },  
    watch: {
        'value'(){
            if (!this.isLocked) {
                this.innerText = this.value;
            }
        }
    },
    methods: {
        changeText(){
            this.$emit('input', this.$el.innerHTML);
        }
    }
});