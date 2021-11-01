<template>
  <div class="payment">
    <div :class="[$style.wrapper]">
      <header>
        <div :class="[$style.header]">My personal costs</div>
      </header>
      <main>
        <button @click="clicked">ADD NEW COST+</button>
        <add-payment-form v-if="isShowForm" @addNewPayment="addDataToPaymentList"/>

<!--        <payments-display :items="paymentListPage"/>-->
        <payments-display :items="currentElements"/>

        <payments-pagination
          :countItems="paymentList.length"
          :itemsInOnePage="itemsInOnePage"
          :cur="page"
          @navigateTo="navigateTo"></payments-pagination>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */

import { Component, Vue } from 'vue-property-decorator';
import { mapGetters, mapMutations } from 'vuex';
import { IPayment } from '@/interfaces/payment';
import PaymentsDisplay from '@/components/PaymentsDisplay.vue';
import AddPaymentForm from '@/components/AddPaymentForm.vue';
import PaymentsPagination from '@/components/PaymentsPagination.vue';
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate',
]);

@Component({
  name: 'Payment',
  components: {
    PaymentsPagination,
    PaymentsDisplay,
    AddPaymentForm,
  },
  computed: {
    ...mapGetters({
      paymentList: 'getPaymentsList',
      category: 'getCategoryList',
    }),
  },
  methods: {
    ...mapMutations({
      myMutationName: 'setPaymentListData',
      addData: 'addPaymentListData',
    }),
  },
})
export default class Payment extends Vue {
  paymentList!: IPayment[];

  paymentListPage: IPayment[] = [];

  isShowForm = false;

  page: number = this.$route.query?.page ? +this.$route.query?.page : 1;

  itemsInOnePage = 3;

  public myMutationName!: () => any;

  public addData!: (item: IPayment) => any;

  get currentElements(): IPayment[] {
    const { itemsInOnePage, page } = this;
    return this.paymentList.slice(itemsInOnePage * (page - 1), itemsInOnePage * (page - 1) + itemsInOnePage);
  }

  get getFPV(): number {
    return this.$store.getters.getFullPaymentValue;
  }

  created(): void {
    // this.paymentList = this.fetchData();
    // this.buildArrayForPage();
    const page = this.$route.params.page || 1;
    if (page) {
      this.page = Number(page);
    }
    this.$store.dispatch('fetchData', this.page);
  }

  beforeRouteUpdate(to: any, from: any, next: any): void {
    this.page = to.query?.page ? +to.query?.page : 1;
    this.$store.dispatch('fetchData', this.page);
    // this.buildArrayForPage();
    next();
  }

  // // eslint-disable-next-line class-methods-use-this
  // fetchData(): IPayment[] {
  //   const arr = [];
  //   // eslint-disable-next-line no-plusplus
  //   for (let i = 0; i < 28; i++) {
  //     arr.push({
  //       date: '28.03.2020',
  //       category: 'Food',
  //       value: i,
  //     });
  //   }
  //
  //   return arr;
  // }

  // buildArrayForPage(): void {
  //   const startItem = this.itemsInOnePage * (this.page - 1);
  //   this.paymentListPage = this.paymentList
  //     .slice(startItem, startItem + this.itemsInOnePage);
  // }
  //
  // addDataToPaymentList(item: IPayment) {
  //   this.hideForm();
  //   this.paymentList.push(item);
  // }

  addDataToPaymentList(item: IPayment): void {
    const date = new Date();
    const data = { ...item, ...{ id: date.getMilliseconds() } };
    this.addData(data);
  }

  // eslint-disable-next-line class-methods-use-this
  navigateTo(page: number): void {
    this.$router.replace({ query: { page: page.toString() } });
  }

  hideForm(): void {
    this.isShowForm = false;
  }

  showForm(): void {
    this.isShowForm = true;
  }

  clicked(): void {
    if (this.isShowForm) {
      this.hideForm();
    } else {
      this.showForm();
    }
  }
}
</script>

<style lang="scss" module>
.wrapper {
  background: #cac7c7;
}

.header {
  color: red;
}
</style>
