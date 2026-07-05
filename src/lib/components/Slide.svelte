<script lang="ts">
    import { slideScroll } from "$lib/directives/slideScroll";
    import type { Snippet } from 'svelte';

    interface Props {
        enableScroll?: boolean;
        class?: string;
        content?: Snippet;
        floating?: Snippet;
    }

    let { enableScroll = true, class: className, content, floating }: Props = $props();
    const scrollAction = $derived(enableScroll ? slideScroll : () => {});
</script>

<div class={`relative w-full h-screen ${className ?? ''}`} use:scrollAction data-container="slider">
    <div class="relative z-[60] w-full h-full">
        {@render content?.()}
    </div>
    <div class="absolute top-0 left-0 bottom-0 right-0">
        {@render floating?.()}
    </div>
</div>