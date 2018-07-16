Vue.component('edit-span',{
    props:{
        value:{
            type:String,
            default:'',
        },
        canEdit:{
            type:Boolean,
            default:true,
        }
    },
    template:`<span class="edit-span"
        v-html="innerText"
        :contenteditable="canEdit"
        @focus="isLocked = true"
        @blur="isLocked = false"
        @input="changeText">
         </span>`,
    data(){
        return {
            innerText: this.value,
            isLocked: false
        }
    },  
    watch: {
        'value'(){
            if (!this.isLocked && !this.innerText) {
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