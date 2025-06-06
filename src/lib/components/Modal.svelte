<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { fade } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import IconX from '@tabler/icons-svelte/IconX.svelte';
    
    export let isOpen = false;
    
    const dispatch = createEventDispatcher<{
        close: void;
        open: void;
    }>();
    
    function closeModal() {
        isOpen = false;
        dispatch('close');
    }

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === 'Escape') {
            closeModal();
        }
    }

    $: if (isOpen) {
        dispatch('open');
    }
</script>

<svelte:window on:keydown={handleKeydown}/>

{#if isOpen}
<div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
    <button 
        class="fixed inset-0 bg-black bg-opacity-50 cursor-pointer" 
        on:click={closeModal}
        transition:fade={{ duration: 1200, delay: 1900 }}
        aria-label="Cerrar modal"
    />
    <div 
        class="relative bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto z-50 p-6 shadow-xl"
        transition:fade={{ duration: 1300, delay: 1900 }}
        role="dialog"
        aria-modal="true"
    >
        <button 
            class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200" 
            on:click={closeModal}
            aria-label="Cerrar"
        >
            <IconX size={24} class="hover:rotate-90 transition-transform" />
        </button>
        <div class="mt-2">
            <slot></slot>
        </div>
    </div>
</div>
{/if}
