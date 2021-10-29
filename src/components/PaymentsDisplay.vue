<template>
  <div class="wrapper">
    <div v-for="(item, idx) in items" :key="idx">
      {{ item }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IPayment } from '@/interfaces/payment';

@Component({
  name: 'PaymentsDisplay',
})
export default class PaymentsDisplay extends Vue {
  @Prop({
    required: true,
    type: Array,
    default: [],
  })
  items!: IPayment[];
}

</script>

<style lang="scss" scoped>
.wrapper {
  background: #fff;
}
</style>
