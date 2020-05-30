<template>
  <div id="dashboard">
    <div class="heading">
      <h2>Dashboard</h2>
      <toggle
        :toggle.sync="enabledDraggable"
        @change:toggle="({ target }) => enabledDraggable = target.checked">
      </toggle>
    </div>
    <draggable
      class="card-container"
      v-model="cardsDraggable"
      :animation="200"
      :disabled="!enabledDraggable">
      <transition-group>
        <div
          class="card-item"
          v-for="(card, key) in cardsDraggable"
          :key="key">
          <router-link :to="`/dashboard/${card.id}`">{{card.title}}</router-link>
          <span>{{card.description}}</span>
        </div>
      </transition-group>
    </draggable>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import draggable from 'vuedraggable'
import toggle from '../components/toggle'

export default {
  name: 'dashboard',
  components: {
    draggable,
    toggle
  },
  data: () => {
    return {
      enabledDraggable: true
    }
  },
  computed: {
    ...mapState({
      cards: 'cards'
    }),
    cardsDraggable: {
      get () { return this.cards },
      set (cards) { this.setCards(cards) }
    }
  },
  mounted() {
    const cards = this.cards;

    cards ? this.setCards(cards) : this.getDefaultCards().then(cards => {
      this.setCards(cards);
    });
  },
  methods: {
    ...mapActions({
      getDefaultCards: 'getDefaultCards'
    }),
    ...mapMutations({
      setCards: 'setCards'
    })
  }
}
</script>

<style lang="scss" scoped>
.heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-container {
  span {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-auto-rows: 1fr;
    grid-gap: 1rem;
    .card-item {
      border: 1px solid lightgray;
      padding: 1rem;
      border-radius: 10px;
      overflow: hidden;
      background: white;
      a {
        display: block;
        text-decoration: none;
        text-transform: uppercase;
        font-size: 18px;
        color: blue;
        margin: 0 0 1rem;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      span {
        display: block;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
}
</style>



