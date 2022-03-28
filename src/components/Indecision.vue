<template>
  <img v-if="img" :src="img">
  <div class="bg-dark"></div>
  <div class="indecision-container">
    <input type="text" placeholder="Hazme una pregunta" v-model="question">
    <p>Recuerda terminar con signo de interrogación (?)</p>
    <div v-if="isValidQuestion">
      <h2>{{ question }}</h2>
      <h1>{{ answer }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      question: null,
      answer: null,
      img: null,
      isValidQuestion: false
    }
  },
  methods: {
    async getAnswer(){
      try{
        this.answer = "Procesando...";
        const {answer, image} = await fetch('https://yesno.wtf/api').then(r => r.json());
        this.answer = answer.toUpperCase();
        this.img = image;
      }catch(e){
        this.answer = "Fallo en al API";
        this.img = null;
      }
    }
  },
  watch: {
    question(value, oldValue){
      this.isValidQuestion = false;

      if(!value.includes('?')) return

      this.isValidQuestion = true;

      //TODO: realizar petición HTTP
      this.getAnswer()
    }
  }
}
</script>

<style>
  img, bg-dark{
    height: 100vh;
    left: 0px;
    max-height: 100%;
    max-width: 100%;
    position: fixed;
    top: 0%;
    width: 100vw;
  }

  .bg-dark{
    background-color: rgba(0, 0, 0, 0.514);
  }

  .indecision-container{
    position: relative;
    z-index: 99;
  }

  input{
    width: 250px;
    padding: 10px 15px;
    border-radius: 5px;
    border: none;
  }

  input:focus{
    outline: none;
  }

  p{
    color: white;
    font-size: 20px;
    margin-top: 0px;
  }

  h1, h2{
    color: white;
  }
</style>