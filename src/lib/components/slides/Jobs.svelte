<script lang="ts">
    import { PortfolioData } from "$lib/PortfolioData";
    import Slide from "$lib/components/Slide.svelte";
    import { horizontalWheelScroll } from "$lib/utils/horizontalScrollWheel";
    import { t } from '$lib/translations';

    import IconBriefcase from '@tabler/icons-svelte/IconBriefcase.svelte';
    import IconUser from '@tabler/icons-svelte/IconUser.svelte';

</script>
  
<Slide class="bg-red-400 {$$restProps.class || ''}">
    <div slot="content" use:horizontalWheelScroll class="text-white overflow-x-auto flex snap-x snap-mandatory h-full" id="test">
        <div class="relative snap-start h-full max-h-screen min-w-full">
            <div class="min-w-screen h-full flex justify-center items-center text-4xl">
                {$t('previousJobs')}
            </div>
            <div class="">
                <div class="absolute left-[60px] bg-white top-0 h-[70px] w-[5px] -translate-x-1/2"></div>
                <div class="absolute w-[80px] h-[80px] bg-white top-[70px] left-[60px] rounded-full -translate-x-1/2 flex justify-center items-center">
                    <IconUser stroke={2} size={40} class="stroke-blue-500" />
                </div>
        
                <div class="absolute left-[60px] bg-white bottom-0 h-[70px] w-[5px] -translate-x-1/2"></div>
                <div class="absolute w-[80px] h-[80px] bg-white bottom-[70px] left-[60px] rounded-full -translate-x-1/2 flex justify-center items-center">
                    <IconBriefcase stroke={2} size={40} class="stroke-yellow-500" />
                </div>
            </div>
        </div>
        {#each PortfolioData.jobs as job}
            <div class="snap-start min-w-full">
                <div class="min-w-screen h-full flex justify-center items-center">
                    <span class="text-2xl">{job.name}</span> 
                    <span> &nbsp; at  &nbsp; </span> 
                    <span class="text-2xl">{job.bussiness}</span>
                </div>
            </div>
        {/each}
    </div>
    <slot slot="floating"></slot>
</Slide>