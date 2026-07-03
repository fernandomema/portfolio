<script lang="ts">
    import User from '$lib/components/slides/User.svelte';
    import Jobs from '$lib/components/slides/Jobs.svelte';
    import Skills from '$lib/components/slides/Skills.svelte';
    import Projects from '$lib/components/slides/Projects.svelte';
    import { userModalOpen } from '$lib/stores/userModal.svelte';
</script>

<div class="overflow-auto h-screen overflow-hidden" id="main-container">
    <User class="snap-start">
        {#snippet floating()}
            <div class="absolute left-[60px] bg-white bottom-0 h-[70px] w-[5px] -translate-x-1/2" style="z-index: 55;"></div>
            <div class="absolute w-[80px] h-[80px] bg-white bottom-[70px] left-[60px] rounded-full -translate-x-1/2 flex justify-center items-center" style="z-index: 55;">
                <span class="icon-[tabler--briefcase] size-10 text-red-500"></span>
            </div>
        {/snippet}
    </User>

    <Jobs class="snap-start"></Jobs>

    <Skills></Skills>

    <Projects></Projects>
</div>
