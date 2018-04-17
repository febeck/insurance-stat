class InsuranceStats {
    constructor() {
        this.events = []
        this.userInfo = []
    }

    ingest(event) {
        this.events = [...this.events, event]
        try {
            const { userId, amount } = event
            const { count, max, mean, sum } = this.userInfo[userId]
            this.userInfo[event.userId] = {
                count: count + 1,
                max: (amount > max) ? amount : max,
                mean: (sum + amount) / (count + 1),
                sum: sum + amount,
            }
        } catch (e) {
            this.userInfo = {
                ...this.userInfo,
                [event.userId]: {
                    count: 1,
                    max: event.amount,
                    mean: event.amount,
                    sum: event.amount
                }
            }
        }
    }

    getSum(userId) {
        try {
           return this.userInfo[userId].sum
         } catch (e) {
            return null
         }
    }

    getMax(userId) {
        try {
           return this.userInfo[userId].max
         } catch (e) {
            return null
         }
    }

    getMean(userId) {
        try {
           return this.userInfo[userId].mean
         } catch (e) {
            return null
         }
    }

}


module.exports = InsuranceStats;