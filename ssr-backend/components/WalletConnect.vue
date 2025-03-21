<template>
  <div class="flex items-center gap-4">
    <Button
      v-if="!wallet.isConnected"
      :disabled="wallet.isConnecting"
      @click="wallet.connectWallet"
    >
      {{ wallet.isConnecting ? "Connecting..." : "Connect Wallet" }}
    </Button>
    <template v-else>
      <div class="flex items-center gap-2">
        <span class="text-sm text-muted-foreground">
          {{ wallet.shortAddress }}
        </span>
        <Button variant="outline" size="sm" @click="wallet.disconnectWallet">
          Disconnect
        </Button>
      </div>
    </template>
    <div v-if="wallet.error" class="text-sm text-destructive">
      {{ wallet.error }}
    </div>
  </div>
</template>

<script setup lang="ts">
const wallet = useWallet();
</script>
