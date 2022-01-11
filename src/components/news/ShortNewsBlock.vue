<template lang="pug">
  .news-def-block(
    :class="stageOfTruthByRating(rating, isConfirmed)" class="p-2 pt-3"
  )
    <i class="fas fa-thumbs-up mr-2"></i><i class="fas fa-check mr-2"></i>
    span.rating-percent(class="mr-2") {{ getNumberWithSymbol(rating) }}
    router-link(
      :to="{ name: 'article', params: { id } }"
      class="news-title"
    )
      span {{ title }}
    .news-desc(class="d-flex align-items-center justify-content-between mt-1")
      .news-date-cat
        span.news-date {{ humanDate }}
        span(class="ml-1 mr-1") /
        router-link(
          :to="{ name: 'global-news-by-category', params: { slug: categorySlug } }"
          class="news-cat"
        ) {{ category }}
        span.news-location , {{ country }}

    <slot></slot>

</template>

<script>
import cfg from '@/config/news'

export default {
  name: 'short-news-block',
  props: {
    rating: Number,
    isConfirmed: Number,
    id: Number,
    title: String,
    humanDate: String,
    category: String,
    categorySlug: String,
    country: String
  },
  data: () => ({
    minConfirmedNewsRating: cfg.minConfirmedNewsRating, // more than that number
    minWrongNewsRatingAbsValue: cfg.minWrongNewsRatingAbsValue // less than that number
  }),
  methods: {
    getNumberWithSymbol (number) {
      if (number > 0) return '+' + number
      return number
    },
    stageOfTruthByRating (rating, isConfirmed) {
      if (isConfirmed === 1) return 'confirmed-news'
      else {
        if (rating >= this.minConfirmedNewsRating) return 'true-news'
        else if (rating <= -this.minWrongNewsRatingAbsValue) return 'wrong-news'
        else return 'mid-news'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/utils/vars';
@import '@/assets/scss/utils/mixins';

.news-def-block {
  .news-title {
    .fa-thumbs-up { font-size: rem(16px) }
    .fa-check { font-size: rem(18px) }
    span {
      color: $blue-news-title;
      font-size: rem(16px);
      word-break: break-word;
    }
  }
  .news-date-cat {
    @include newsDateCat;
    font-size: 11px;
    font-weight: 600;
    color: $grey-font-light;
    .news-cat { color: $grey-font-light }
    .news-location { text-transform: capitalize }
  }
}
span.rating-percent {
  font-family: 'Montserrat';
  font-weight: 600;
  font-size: rem(14px);
  color: $blue-font-light;
  text-decoration: none;
}
.confirmed-news {
  .fa-thumbs-up { display: none }
  .fa-check { color: $success-color; }
}
.true-news {
  .fa-check { display: none  }
  .fa-thumbs-up { color: $success-color; }
}
.mid-news {
  .fa-check { display: none  }
  .fa-thumbs-up { color: $warning-color; }
}
.wrong-news {
  .fa-check { display: none  }
  .fa-thumbs-up {
    color: $error-color;
    transform: rotate(180deg);
  }
}
</style>
