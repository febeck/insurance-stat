const InsuranceStats = require('./insuranceStats');
const InsuranceEvent = require('./insuranceEvent');


describe('InsuranceStats class', () => {
    let insuranceStats = null

    beforeEach(() => {
        insuranceStats = new InsuranceStats()
    })

    it('should has an initial empty events array', () => {
        expect(insuranceStats.events.length).toBe(0)
    })

    it('should ingest a new event', () => {
        expect(insuranceStats.events.length).toBe(0)
        let newEvent = new InsuranceEvent(1, 'today', 100)
        insuranceStats.ingest(newEvent)
        expect(insuranceStats.events.length).toBe(1)
        expect(insuranceStats.events[0]).toBe(newEvent)
    })

    it('get the user sum', () => {
        let newEvent = new InsuranceEvent(1, 'today', 100)
        let newEvent2 = new InsuranceEvent(1, 'yestarday', 200)
        let newEvent3 = new InsuranceEvent(2, 'yesterday', 300)
        insuranceStats.ingest(newEvent)
        insuranceStats.ingest(newEvent2)
        insuranceStats.ingest(newEvent3)
        expect(insuranceStats.getSum(0)).toBe(null)
        expect(insuranceStats.getSum(1)).toBe(100+200)
        expect(insuranceStats.getSum(2)).toBe(300)
    })

    it('get the user max', () => {
        let newEvent = new InsuranceEvent(1, 'today', 100)
        let newEvent2 = new InsuranceEvent(1, 'yestarday', 200)
        let newEvent3 = new InsuranceEvent(1, 'yestarday', 150)
        let newEvent4 = new InsuranceEvent(2, 'yesterday', 300)
        insuranceStats.ingest(newEvent)
        insuranceStats.ingest(newEvent2)
        insuranceStats.ingest(newEvent3)
        insuranceStats.ingest(newEvent4)
        expect(insuranceStats.getMax(0)).toBe(null)
        expect(insuranceStats.getMax(1)).toBe(Math.max(100, 200, 150))
        expect(insuranceStats.getMax(2)).toBe(Math.max(300))
    })

    it('get the user mean', () => {
        let newEvent = new InsuranceEvent(1, 'today', 125)
        let newEvent2 = new InsuranceEvent(1, 'yestarday', 300)
        let newEvent3 = new InsuranceEvent(1, 'yestarday', 175)
        let newEvent4 = new InsuranceEvent(2, 'yesterday', 300)
        insuranceStats.ingest(newEvent)
        insuranceStats.ingest(newEvent2)
        insuranceStats.ingest(newEvent3)
        insuranceStats.ingest(newEvent4)
        expect(insuranceStats.getMean(0)).toBe(null)
        expect(insuranceStats.getMean(1)).toBe((125+300+175)/3)
        expect(insuranceStats.getMean(2)).toBe(300)
    })
})