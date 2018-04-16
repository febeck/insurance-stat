class InsuranceStats {
    constructor() {
        this.events = []
        this.userInfo = []
    }

    ingest(event) {
        this.events = [...this.events, event]
        if (event.userId in this.userInfo) {
            const { userId, amount } = event
            const { count, max, mean, sum } = this.userInfo[userId]
            this.userInfo[event.userId] = {
                count: count + 1,
                max: (amount > max) ? amount : max,
                mean: (sum + amount) / (count + 1),
                sum: sum + amount,
            }
        } else {
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
        return userId in this.userInfo ? this.userInfo[userId].sum : null
    }

    getMax(userId) {
        return userId in this.userInfo ? this.userInfo[userId].max : null
    }

    getMean(userId) {
        return userId in this.userInfo ? this.userInfo[userId].mean : null
    }

}


module.exports = InsuranceStats;