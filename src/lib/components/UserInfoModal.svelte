<script lang="ts">
    import { PortfolioData } from "$lib/PortfolioData";
    import Modal from "./Modal.svelte";
    import IconMapPin from '@tabler/icons-svelte/IconMapPin.svelte';

    export let isOpen = false;
</script>

<Modal bind:isOpen>
    <h2 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Sobre mí</h2>
    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        {PortfolioData.user.bio}
    </p>
    <div class="flex flex-col gap-2 text-gray-600 dark:text-gray-400">
        <div class="flex items-center gap-2">
            <IconMapPin size={20} />
            <span>{PortfolioData.user.location}</span>
        </div>
        <div>
            {PortfolioData.user.email} · {PortfolioData.user.phone}
        </div>
    </div>
</Modal>
