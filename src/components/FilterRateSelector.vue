<template>
  <div>
    <label
      for=""
      class="m-1"
    >{{ label }}</label>
    <select
      id=""
      v-model="selectedValue"
      name=""
    >
      <option
        v-for="value in range"
        :key="value"
        class="m-1"
        :value="value"
        :selected="isSelected(value)"
      >
        {{ value }}
      </option>
    </select>
  </div>
</template>
<script>
export default {
  name: 'FilterRateSelector',
  props: {
    label: {
      type: String,
      required: true,
    },
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    step: {
      type: Number,
      required: false,
      default: 1,
    },
    default: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      selectedValue: this.default,
    };
  },
  computed: {
    range() {
      const dataset = [];
      for (let i = this.min; i <= this.max; i += this.step) {
        dataset.push(i);
      }
      return dataset;
    },
  },
  watch: {
    selectedValue(value) {
      this.$emit('rate-selected', value);
    },
  },
  methods: {
    isSelected(value) {
      return value === this.default;
    },
  },
};
</script>
<style scoped>

</style>
