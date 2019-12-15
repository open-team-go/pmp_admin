<template> 
  <student-form :is-edit='false'></student-form>
</template>
<script>
  import studentForm from './components/studentForm'
  export default {
    name: 'addStudent',
    components: { studentForm }
  }
</script>
<style>
</style>
