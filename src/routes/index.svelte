<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<script>
  import {flip} from 'svelte/animate';
  import Card from '../components/Card.svelte';
  import { columns } from '../stores/index.js';

  let _columns;
  let newRowDescription;
  let showRowInput = false;
  let activeColumnIndex;

  columns.subscribe(value => {
    _columns = value;
  })

  const addRow = index => {
    showRowInput = true;
    activeColumnIndex = index;
  }

  const submit = () => {
    if (event.code == 'Enter') {
			event.preventDefault()
      _columns[activeColumnIndex].items.unshift(newRowDescription)
      columns.set(_columns);

      newRowDescription = ''
      showRowInput = false;
		}
  }
</script>

<div class="columns" style="margin: 10px;">
  {#each _columns as { name, items }, index}
    <div class="column">
      {#if name !== ''}
        <div class="level">
          <div class="level-left">
            <h4 class="title is-4">{name}</h4>
          </div>
          <div class="level-right">
            <button class="button is-small" on:click={() => addRow(index)}>+ Row</button>
          </div>
        </div>
        {#if showRowInput && activeColumnIndex === index}
          <input
            bind:value={newRowDescription}
            class="input"
            type="text"
            placeholder="Text input"
            on:keyup|preventDefault={submit}
            style="margin-bottom: 10px;"
          >
         {/if}
       {/if}
      {#each items as item}
        <Card description={item}/>
      {/each}
    </div>
  {/each}
</div>

