import Vue from 'vue'

Vue.$config = require(`@/configuration/${process.env.NODE_ENV}.json`)
