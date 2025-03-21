<template>
  <button
    :class="[buttonVariants({ variant, size }), className]"
    :disabled="disabled"
    :type="type"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./index";

interface Props {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
}

const props = withDefaults(defineProps<Props>(), {
  type: "button",
  disabled: false,
  className: "",
  variant: "default",
  size: "default",
});
</script>
