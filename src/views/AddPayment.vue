<template>
  <div class="add-payment">
    <add-payment-form
      :valueProp="value"
      :categoryProp="category"
      @addNewPayment="addDataToPaymentList"/>
  </div>
</template>

<script lang="ts">
/* eslint-disable */


import {Component, Vue} from "vue-property-decorator";
import AddPaymentForm from "@/components/AddPaymentForm.vue";
import {mapMutations} from "vuex";
import {IPayment} from "@/interfaces/payment";

@Component({
  name: 'AddPayment',
  components: {
    AddPaymentForm,
  },
  computed: {},
  methods: {
    ...mapMutations({
      addData: 'addPaymentListData',
    }),
  },
})
export default class AddPayment extends Vue {

  public addData!: (item: IPayment) => any;


  value = this.$route.query.value ? +this.$route.query.value : 0;
  category = this.$route.params.category ?? '';

  isValid(item: IPayment): boolean {
    return !!item.value && !!item.category;
  }

  addDataToPaymentList(item: IPayment): void {
    if (!this.isValid(item)) {
      return;
    }

    const date = new Date();
    const data = {...item, ...{id: date.getMilliseconds()}};
    this.addData(data);
  }
}
</script>

<style lang="scss" module>
</style>
