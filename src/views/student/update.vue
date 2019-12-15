<template> 
  <student-form :is-edit='true'></student-form>
</template>
<script>
  import studentForm from './components/studentForm'
  export default {
    name: 'updateStudent',
    components: { studentForm }
  }
</script>
<style>
</style>
