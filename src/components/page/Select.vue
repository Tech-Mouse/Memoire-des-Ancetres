<script setup>
import { onMounted, ref, watch } from "vue";

const props = defineProps({
  name: {
    type: String,
  },
  label: {
    type: String,
  },
  options: {
    type: Array,
    required: true,
  },
  valueKey: {
    type: String,
    default: "value",
  },
  labelKey: {
    type: String,
    default: "label",
  },
  modelValue: {
    type: String,
    default: "1",
  },
});

const emit = defineEmits(["update:modelValue"]);

const selected = ref(parseInt(props.modelValue));

onMounted(() => {
  emit("update:modelValue", parseInt(props.modelValue));
});

// Emit the selected value whenever it changes
watch(selected, (updatedValue) => {
  emit("update:modelValue", updatedValue);
});
</script>

<template>
  <div>
    <label :for="name" class="select--label">{{ label }}:</label>

    <select :name="name" :id="name" v-model="selected" class="select--selector">
      <option
        v-for="option in options"
        :key="option[valueKey]"
        :value="option[valueKey]"
        class="select--selector--option"
      >
        {{ option[labelKey] }}
      </option>
    </select>
  </div>
</template>

<style lang="scss" scoped>
.select {
  &--label {
    font-size: 1.15rem;

    @media (max-width: $mobileTreshold) {
      font-size: 1rem;
    }
  }

  &--selector {
    color: $primaryColor;
    margin: 0 0.3rem;
    padding: 0.5rem 0.5rem;
    background-color: transparent;
    border: none;
    border-bottom: 2px solid $secondaryColor;
    background-color: white;
    font-size: 1.15rem;

    @media (max-width: $mobileTreshold) {
      font-size: 1rem;
    }

    &:hover {
      cursor: pointer;
    }

    &--option {
    }
  }
}
</style>
