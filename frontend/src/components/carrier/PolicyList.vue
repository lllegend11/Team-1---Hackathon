<script setup lang="ts">
import type { BdChangeRequest } from '@/types/carrier'
import StatusBadge from './StatusBadge.vue'

defineProps<{
  policies: BdChangeRequest[]
  selectedId?: string
}>()

const emit = defineEmits<{
  select: [policy: BdChangeRequest]
}>()

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function getBrokerShortName(name: string) {
  return name.split(' ')[0]
}
</script>

<template>
  <div class="bg-white shadow-sm rounded-lg overflow-hidden">
    <div class="px-4 py-3 border-b border-gray-200 bg-gray-50">
      <h2 class="text-sm font-semibold text-gray-700 uppercase tracking-wider">
        BD Change Requests ({{ policies.length }})
      </h2>
    </div>
    <ul class="divide-y divide-gray-200 max-h-[600px] overflow-auto">
      <li
        v-for="policy in policies"
        :key="policy['transaction-id']"
        @click="emit('select', policy)"
        :class="[
          'px-4 py-4 cursor-pointer transition-colors hover:bg-gray-50',
          selectedId === policy['transaction-id'] ? 'bg-blue-50 border-l-4 border-blue-500' : ''
        ]"
      >
        <div class="flex items-center justify-between">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-3">
              <span class="text-sm font-semibold text-gray-900">
                {{ policy['policy-id'] }}
              </span>
              <StatusBadge :status="policy['current-status']" />
            </div>
            <p class="mt-1 text-sm text-gray-600">
              {{ policy['policy-details']['owner-name'] }}
            </p>
            <p class="mt-0.5 text-xs text-gray-500 truncate">
              {{ policy['policy-details']['product-name'] }}
            </p>
          </div>
          <div class="ml-4 flex-shrink-0 text-right">
            <p class="text-xs text-gray-500">
              {{ formatDate(policy['request-timestamp']) }}
            </p>
            <p class="mt-1 text-xs text-gray-400">
              {{ getBrokerShortName(policy['broker-details']['delivering-broker']['broker-name']) }} →
              {{ getBrokerShortName(policy['broker-details']['receiving-broker']['broker-name']) }}
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
