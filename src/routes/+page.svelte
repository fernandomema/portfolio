<script>
    import IconBriefcase from '@tabler/icons-svelte/IconBriefcase.svelte';
    import IconUser from '@tabler/icons-svelte/IconUser.svelte';

    import User from '$lib/components/slides/User.svelte';
    import Jobs from '$lib/components/slides/Jobs.svelte';
    
    import { t } from '$lib/translations';
    import { onMount } from 'svelte';
    import { slideScroll } from '$lib/directives/slideScroll';
    import Skills from '$lib/components/slides/Skills.svelte';
    import Projects from '$lib/components/slides/Projects.svelte';
    
</script>

<div class="overflow-auto h-screen overflow-hidden" id="main-container">
    <User class="snap-start">
        <div class="absolute left-[60px] bg-white bottom-0 h-[70px] w-[5px] -translate-x-1/2"></div>
        <div class="absolute w-[80px] h-[80px] bg-white bottom-[70px] left-[60px] rounded-full -translate-x-1/2 flex justify-center items-center">
            <IconBriefcase stroke={2} size={40} class="stroke-red-500" />
        </div>
    </User>
    
    <Jobs class="snap-start"></Jobs>

    <Skills></Skills>

    <Projects></Projects>
</div>
