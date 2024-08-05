import { Card } from "@repo/ui/card"

export default function({transfers}: {transfers:{
    time: Date,
    amount: number,
    toUserId: number
}[]}){
    if (!transfers.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transfers">
        <div className="pt-2">
            {transfers.map(t => <div className="flex justify-between">
                <div>
                    <div className="text-sm">
                        Sent INR
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    - Rs {t.amount / 100}
                </div>
            </div>)}
        </div>
    </Card>
}