<template>
  <div class="wrapper">
    <button v-for="(page, idx) in pagination"
            :key="idx"
            @click="navigateTo(page)">
      {{ page }}
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'PaymentsPagination',
})
export default class PaymentsPagination extends Vue {
  @Prop({
    required: true,
    type: Number,
    default: 0,
  })
  countItems!: number;

  @Prop({
    required: true,
    type: Number,
    default: 0,
  })
  itemsInOnePage!: number;

  pagination: number[] = [];

  created(): void {
    this.pagination = this.getPagination();
  }

  navigateTo(page: number): void {
    this.$emit('navigateTo', page);
  }

  // eslint-disable-next-line class-methods-use-this
  getPagination(): number[] {
    return [...new Array(Math.ceil(this.countItems / this.itemsInOnePage))].map((e, i) => i + 1);
  }
}

</script>

<style lang="scss" scoped>
.wrapper {
  background: #fff;
}
</style>
