    <template>
    <div class="scroll-container">
        <card-detail v-show="Object.keys(curCard).length" />
        <board v-show="!Object.keys(curCard).length" />
    </div>
</template>

<script>
import CardDetail from '../components/CardDetail.vue'
import Board from '../components/Board.vue'
import { mapState} from 'vuex'

export default {
    components: {
        CardDetail,
        Board
    },
    computed: {
        ...mapState(['curCard'])
    },
    updated(){
        this.$store.dispatch('updated')
    }
}
</script>
