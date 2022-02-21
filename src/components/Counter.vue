<template>
  <h3>{{ defaultTitle }}</h3>
  <p>{{ counter }}</p>
  <div>
    <button @click="increase">+1</button>
    <button @click="decrease">-1</button>
  </div>
</template>

<script>
  export default {
    props: {
      "title": String,
      "start": {
        type: Number,
        default: 0,
        validator(value){
          return value <= 100;
        }
      }
    },
    data(){
      return {
        counter: this.start
      }
    },
    methods: {
      /** @method: incremente el valor en 1 */
      increase(){
        this.counter++;
      },
      /** @method: decrementa el valor en 1 solamente cuando el valor sea mayor a 0*/
      decrease(){
        if(this.counter > 0){
          this.counter--;
        }
      }
    },
    computed: {
      defaultTitle(){
        return this.title || 'Counter';
      }
    }

  }
</script>

<style>
  button{
    background-color: rgb(14, 206, 78);
    border: 1px solid white;
    border-radius: 5px;
    color: rgb(18, 32, 51);
    cursor: pointer;
    margin: 0 5px;
    padding: 5px 15px;
    transition: 0.3s ease-in-out;
  }

  button:hover{
    background-color: rgb(9, 139, 52);
  }
</style>