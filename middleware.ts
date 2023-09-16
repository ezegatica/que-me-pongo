// export {default} from 'next-auth/middleware'

import { NextResponse } from "next/server";

// export const config = {
//     matcher: ['/app']
// };

export default function() {
    return NextResponse.next();
}