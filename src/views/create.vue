<template>
  <div id="create">
    <h2>Create</h2>
    <form
      class="create-form"
      @submit.prevent="submit()">
      <div class="input">
        <input
          type="text"
          v-model="title"
          placeholder="Type title">
      </div>
      <div class="textarea">
        <textarea
          v-model="description"
          placeholder="Type description"
          rows="3">
        </textarea>
      </div>
      <div class="buttons">
        <button class="create">Create</button>
        <button
          class="cancel"
          type="button"
          @click="$router.push('/')">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'create',
  data: () => {
    return {
      title: '',
      description: ''
    }
  },
  computed: {
    ...mapState({
      cards: 'cards'
    })
  },
  methods: {
    ...mapMutations({
      setCards: 'setCards'
    }),
    submit () {
      const cards = this.cards;
      const card = {
        id: cards.length + 1,
        title: this.title,
        description: this.description
      };

      const valid = Object.values(card).every(v => Boolean(v));

      if (valid) {
        this.setCards([card].concat(cards));
        this.$router.push('/');
      } else {
        window.alert('Form is empty')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin input {
  padding: 1rem;
  font-size: 18px;
  border: 1px solid lightgray;
  border-radius: 10px;
  width: calc(100% - (2rem + 2px));
  font-family: 'Monospace';
}

@mixin button {
  padding: 0.5rem 1rem;
  font-size: 16px;
  line-height: 16px;
  border: 1px solid lightgray;
  border-radius: 10px;
  font-family: 'Monospace';
}

.create-form {
  .input {
    margin: 1rem 0;
    input {
      @include input;
    }
  }
  .textarea {
    margin: 1rem 0;
    textarea {
      @include input;
    }
  }
  .buttons {
    .create {
      @include button;
      margin: 0 1rem 0 0;
      background: blue;
      color: white;
    }
    .cancel {
      @include button;
    }
  }
}
</style>
