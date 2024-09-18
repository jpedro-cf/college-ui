export interface IPerformance {
    categories: [
        {
            id: string
            title: string
            total: number
            correct: number
        }
    ]
    performance: [
        {
            incorrect: number
            correct: number
            date: string | Date
        }
    ]
}
