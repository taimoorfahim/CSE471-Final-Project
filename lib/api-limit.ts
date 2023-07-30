import { auth } from "@clerk/nextjs";

import { MAX_FREE_COUNTS } from "@/constants";

export const increaseApiLimit = async () => {
    const {userId} = auth()
    if(!userId) return;

    // const userApiLimit = await prismadb.userApiLimit.findUnique({
    //     where: {
    //         userId
    //     }
    // });
    const userApiLimit = {count:0}


    if(userApiLimit){
        // await prismadb.userApiLimit.update({
        //     where: {
        //         userId
        //     },
        //     data: {
        //         count: userApiLimit.count + 1
        //     }
        // });
    } else {
        // await prismadb.userApiLimit.create({
        //     data: {
        //         userId,
        //         count: 1
        //     }
        // });
        
    }
}

export const checkApiLimit = async () => {
    const {userId} = auth()
    if(!userId) {
        return false;
    }

    // const userApiLimit = await prismadb.userApiLimit.findUnique({
    //     where: {
    //         userId
    //     }
    // });
    const userApiLimit = {count:0}


    if(!userApiLimit|| userApiLimit.count < MAX_FREE_COUNTS){
        return true;
    } else {
        return false;
    }
}

export const getApiLimitCount = async () => {
    const {userId} = auth()
    if(!userId) {
        return 0;
    }

    // const userApiLimit = await prismadb.userApiLimit.findUnique({
    //     where: {
    //         userId
    //     }
    // });
    const userApiLimit = {count:0}

    if(!userApiLimit){
        return 0;
    } else {
        return userApiLimit.count;
    }
}