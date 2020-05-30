<template>
  <div id="detail">
    <div class="modal-overlay" @click.self="$router.push('/dashboard')">
      <div class="modal-inner" v-if="card">
        <h1>{{card.title}}</h1>
        <span>{{card.description}}</span>
        <button
          class="delete"
          @click="deleteCard()">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import { ls } from "../ls";

export default {
  name: 'detail',
  data: () => {
    return {
      card: null
    };
  },
  computed: {
    ...mapState({
      cards: 'cards'
    }),
    ...mapGetters({
      getCardById: 'getCardById'
    })
  },
  mounted() {
    const card = this.getCardById(this.$route.params.id);

    card ? this.card = card : this.$router.push('/dashboard');
  },
  methods: {
    ...mapMutations({
      setCards: 'setCards'
    }),
    deleteCard() {
      const cards = this.cards.filter(c => c.id !== window.Number(this.$route.params.id));

      if (cards.length) {
        this.setCards(cards);
        this.$router.push('/dashboard');
      } else {
        ls.removeItem('dashboard');
        window.location.assign('/dashboard');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin button {
  padding: 0.5rem 1rem;
  font-size: 16px;
  line-height: 16px;
  border: 1px solid lightgray;
  border-radius: 10px;
  font-family: 'Monospace';
}

.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  .modal-inner {
    max-width: 500px;
    padding: 2rem;
    margin: 3rem;
    background: white;
    border-radius: 10px;
    overflow: hidden;
    h1 {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    span {
      display: block;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .delete {
      @include button;
      margin: 1rem 0 0 0;
      background: red;
      color: white;
    }
  }
}
</style>
