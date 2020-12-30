<script>
  import { columns } from '../stores/index.js';

  let _columns;
  let showModal = false;
  let newColumnName = ''

  columns.subscribe(value => {
    _columns = value;
  });

  const add = () => {
    const emptyColumnIndex = _columns.findIndex(item => {
      return item.name === '' && item.items.length === 0;
    });

    _columns[emptyColumnIndex] = {
			name: newColumnName,
			items: []
		};

    columns.set(_columns);
    newColumnName = '';
    showModal = false;
  }
</script>

<div class={showModal ? 'modal is-active' : 'modal'}>
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Column Name</p>
      <button class="delete" aria-label="close"></button>
    </header>
    <section class="modal-card-body">
      <input bind:value={newColumnName} class="input" type="text" placeholder="Text input">
    </section>
    <footer class="modal-card-foot">
      <button class="button is-success" on:click={add}>Save changes</button>
      <button class="button" on:click={() => showModal = false}>Cancel</button>
    </footer>
  </div>
</div>

<nav class="navbar" role="navigation" aria-label="main navigation">
  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a href="/" class="navbar-item">
        Nusendra's Task
      </a>
    </div>
  </div>

  <div class="navbar-end">
    <div class="navbar-item">
      <div class="buttons">
        <button class="button is-info" on:click={() => showModal = true}>+ Add Column</button>
      </div>
    </div>
  </div>
</nav>
