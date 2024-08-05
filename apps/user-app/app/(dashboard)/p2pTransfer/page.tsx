import prisma from "@repo/db/client";
import RecentTransactions from "../../../components/RecentTransactions"
import { SendCard } from "../../../components/SendCard"
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

async function getTransfers() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        time: t.timestamp,
        amount: t.amount,
        toUserId: t.toUserId
    }))
}

export default async function (){
    const transfers = await getTransfers();

    return <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <SendCard/>
            </div>
            <div className="pt-20 mt-7">
                <RecentTransactions transfers={transfers}/>
            </div>
    </div>
}