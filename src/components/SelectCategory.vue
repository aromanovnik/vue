<template>
  <div>
    <select :value="value" @change="onChange($event)">
      <option v-for="(option, idx) in getCategoryList" :key="idx">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
/* eslint-disable */

import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapActions, mapGetters } from 'vuex';

@Component({
  name: 'SelectCategory',
  computed: {
    ...mapGetters({
      getCategoryList: 'getCategoryList',
    }),
  },
  methods: {
    ...mapActions({
      fetchCategoryList: 'fetchCategoryList',
    }),
  },
})
export default class SelectCategory extends Vue {
  @Prop({
    type: String,
    default: '',
  })
  value!: string;

  public getCategoryList!: string[];

  public fetchCategoryList!: () => any;

  selected = '';

  mounted(): void {
    if (!this.getCategoryList?.length) {
      this.fetchCategoryList();
    }
  }

  onChange(event: any) {
    this.$emit('input', event.target.value);
  }
}

</script>
