<template>
  <div class="alignFilter mt-2">
    <filterRateSelector
      label="Note mini"
      :min="0"
      :max="5"
      :step="1"
      :default="0"
      @rate-selected="updateMinRate"
    />
    <filterRateSelector
      label="Note maxi"
      :min="0"
      :max="5"
      :step="1"
      :default="5"
      @rate-selected="updateMaxRate"
    />
  </div>
</template>
<script>
import filterRateSelector from './FilterRateSelector.vue';

export default {
  components: {
    filterRateSelector,
  },
  data() {
    return {
      name: '',
      address: '',
      rating: '',
    };
  },
  methods: {
    updateMinRate(minRate) {
      this.$emit('filter-min-rate', minRate);
    },
    updateMaxRate(maxRate) {
      this.$emit('filter-max-rate', maxRate);
    },
  },
};
</script>
<style scoped>
.alignFilter{
  display: flex;
}</style>
