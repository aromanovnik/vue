<template>
  <div class="form">
    <input placeholder="Value" v-model="value"/>
    <input placeholder="Category" v-model="category"/>
    <input placeholder="Date" v-model="date"/>
    <select-category v-model="category" />
    <button @click="onSave">Save</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IPayment } from '@/interfaces/payment';
import SelectCategory from '@/components/SelectCategory.vue';

@Component({
  name: 'AddPaymentForm',
  components: {
    SelectCategory,
  },
})
export default class AddPaymentForm extends Vue {
  value: IPayment['value'] = 0;

  category: IPayment['category'] = '';

  date: IPayment['date'] = '';

  // eslint-disable-next-line class-methods-use-this
  get getCurrentDate(): string {
    const today = new Date();
    const d = today.getDate();
    const m = today.getMonth() + 1;
    const y = today.getFullYear();
    return `${d}.${m}.${y}`;
  }

  onSave() {
    const data = {
      value: this.value,
      category: this.category,
      date: this.date || this.getCurrentDate,
    };
    this.$emit('addNewPayment', data);
  }
}

</script>
