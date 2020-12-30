<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<script>
  import {flip} from 'svelte/animate';
  import { columns } from '../stores/index.js';

  let _columns;
  let newRowDescription;
  let showRowInput = false;
  let activeColumnIndex;
  let hoveringColumn;

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

  const dragStart = (event, columnIndex, itemIndex) => {
    console.log(event)
		const data = {columnIndex, itemIndex};
   	event.dataTransfer.setData('text/plain', JSON.stringify(data));
	}

  function drop(event, index) {
    console.log(event)
		event.preventDefault();
    const json = event.dataTransfer.getData("text/plain");
		const data = JSON.parse(json);

      console.log(data)

		const [item] = _columns[data.columnIndex].items.splice(data.itemIndex, 1);

		_columns[index].items.unshift(item);
		_columns = _columns;

		hoveringColumn = null;
	}
</script>

<div class="columns" style="margin: 10px;">
  {#each _columns as { name, items }, index (index)}
    <div
      animate:flip
      class="column"
      on:dragenter={() => hoveringColumn = name}
      on:dragleave={() => hoveringColumn = null}
      on:drop={event => drop(event, index)}
      ondragover="return false"
    >
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
      {#each items as item, itemIndex (item)}
        <div animate:flip>
          <div
            class="card"
            style="margin-bottom: 10px;"
            draggable={true}
		  		  on:dragstart={event => dragStart(event, index, itemIndex)}
          >
            <div class="card-content">
              <p class="subtitle">
                {item}
              </p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/each}
</div>

